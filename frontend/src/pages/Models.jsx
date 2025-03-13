import React, { useState, useEffect, useCallback } from 'react';
import { 
  CpuChipIcon, 
  StarIcon, 
  CurrencyDollarIcon,
  ArrowTopRightOnSquareIcon 
} from '@heroicons/react/24/outline';
import getWeb3 from '../web3';
import getContract from '../contract';

const ModelCard = ({ name, description, price, rating, category, id, onBuy, web3Instance }) => {
  // Format price to ETH
  const formatPrice = () => {
    if (web3Instance) {
      try {
        return `${web3Instance.utils.fromWei(price.toString(), 'ether')} ETH`;
      } catch (error) {
        return `${parseInt(price) / 1e18} ETH`;
      }
    }
    // Fallback if web3 is not available
    return `${parseInt(price) / 1e18} ETH`;
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-xl hover:transform hover:scale-105 transition-all duration-300 border border-white/10">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <CpuChipIcon className="h-8 w-8 text-blue-400" />
          <div>
            <h2 className="text-xl font-semibold text-white">{name}</h2>
            <span className="text-sm text-blue-300">{category || 'AI Model'}</span>
          </div>
        </div>
        <div className="flex items-center text-yellow-400">
          <StarIcon className="h-5 w-5" />
          <span className="ml-1 text-sm">{rating || '4.5'}</span>
        </div>
      </div>
      <p className="mt-4 text-gray-300">{description}</p>
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center text-green-400">
          <CurrencyDollarIcon className="h-6 w-6" />
          <span className="text-xl font-bold">{formatPrice()}</span>
        </div>
        <button 
          onClick={() => onBuy(id, price)}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <span>Buy Now</span>
          <ArrowTopRightOnSquareIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

const Models = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [account, setAccount] = useState('');
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  // Get random category
  const getRandomCategory = useCallback(() => {
    const categories = [
      "Language Processing", 
      "Computer Vision", 
      "Recommendation", 
      "Audio Processing",
      "Generative AI",
      "Predictive Analytics"
    ];
    return categories[Math.floor(Math.random() * categories.length)];
  }, []);

  // Handle buying a model
  const handleBuyModel = useCallback(async (id, price) => {
    if (!web3 || !contract || !account) {
      alert("Please connect to MetaMask to purchase models.");
      return;
    }

    try {
      await contract.purchaseModel(id, { 
        from: account, 
        value: price 
      });
      alert("Purchase successful!");
      
      // Refresh models
      setModels(prevModels => {
        const updatedModels = [...prevModels];
        const modelIndex = updatedModels.findIndex(model => model.id === id);
        if (modelIndex !== -1) {
          updatedModels[modelIndex].isSold = true;
        }
        return updatedModels;
      });
    } catch (err) {
      console.error("Error purchasing model:", err);
      if (err.message && err.message.includes("User denied")) {
        alert("Transaction was rejected in MetaMask.");
      } else {
        alert("Failed to purchase model. Please try again.");
      }
    }
  }, [web3, contract, account]);

  // Handle account changes
  const handleAccountsChanged = useCallback((accounts) => {
    if (accounts.length > 0) {
      setAccount(accounts[0]);
    } else {
      setAccount('');
    }
  }, []);

  // Initialize web3 and contract
  useEffect(() => {
    const init = async () => {
      try {
        // Get web3 instance
        const web3Instance = await getWeb3();
        setWeb3(web3Instance);
        
        // Get user's Ethereum account
        const accounts = await web3Instance.eth.getAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          console.warn("No accounts found. Using fallback display mode.");
          setLoading(false);
          return;
        }

        // Get contract instance
        try {
          const { instance } = await getContract();
          setContract(instance);
          
          // Get models from contract
          try {
            console.log("Fetching models from contract...");
            const modelsList = await instance.getModels();
            console.log("Models fetched successfully:", modelsList.length);
            
            // Format models data
            const formattedModels = modelsList.map((model) => ({
              id: model.id.toNumber(),
              name: model.name,
              description: model.description,
              price: model.price,
              seller: model.seller,
              isSold: model.isSold,
              rating: (4 + Math.random()).toFixed(1), // Random rating between 4.0-5.0
              category: getRandomCategory()
            }));
            
            setModels(formattedModels);
          } catch (contractError) {
            console.error("Error fetching models:", contractError);
            console.log("Using sample models as fallback");
            // We'll show sample models as fallback
          }
        } catch (contractError) {
          console.error("Error getting contract instance:", contractError);
          setError(`Contract connection error: ${contractError.message || "Unknown error"}. Please make sure you're connected to the correct network.`);
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error loading web3:", err);
        setError(`Web3 connection error: ${err.message || "Unknown error"}. Please make sure MetaMask is installed and connected.`);
        setLoading(false);
      }
    };

    init();

    // Setup MetaMask account change listener
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return () => {
      // Cleanup MetaMask listeners
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, [getRandomCategory, handleAccountsChanged]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 py-20 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <div className="text-white text-xl">Loading models...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 py-20 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <div className="text-white text-xl">{error}</div>
      </div>
    );
  }

  // If no models are available yet, show sample models
  const displayModels = models.length > 0 ? models : [
    {
      id: 1,
      name: "GPT-4 Fine-tuned",
      description: "Advanced language model fine-tuned for specialized tasks with enhanced performance and accuracy.",
      price: web3 ? web3.utils.toWei('0.5', 'ether') : '500000000000000000',
      rating: "4.9",
      category: "Language Processing"
    },
    {
      id: 2,
      name: "Vision Transformer Pro",
      description: "State-of-the-art computer vision model for image recognition and object detection.",
      price: web3 ? web3.utils.toWei('0.4', 'ether') : '400000000000000000',
      rating: "4.8",
      category: "Computer Vision"
    },
    {
      id: 3,
      name: "Neural Audio Generator",
      description: "Advanced audio synthesis model capable of generating realistic sound effects and music.",
      price: web3 ? web3.utils.toWei('0.3', 'ether') : '300000000000000000',
      rating: "4.7",
      category: "Audio Processing"
    },
    {
      id: 4,
      name: "Recommendation Engine",
      description: "Powerful recommendation system trained on large-scale user interaction data.",
      price: web3 ? web3.utils.toWei('0.6', 'ether') : '600000000000000000',
      rating: "4.9",
      category: "Recommendation Systems"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
            Available AI Models
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Discover cutting-edge AI models trained by experts and ready for deployment
          </p>
          {account ? (
            <p className="text-sm text-blue-300 mt-2">
              Connected Account: {account.substring(0, 6)}...{account.substring(account.length - 4)}
            </p>
          ) : (
            <p className="text-sm text-yellow-300 mt-2">
              Please connect to MetaMask to purchase models
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayModels.map((model, index) => (
            <ModelCard 
              key={index} 
              {...model} 
              onBuy={handleBuyModel}
              web3Instance={web3}
            />
          ))}
        </div>
      </div>

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-30">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <style jsx="true">{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Models;