import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CubeIcon, 
  DocumentTextIcon, 
  CurrencyDollarIcon,
  TagIcon,
  CloudArrowUpIcon
} from '@heroicons/react/24/outline';
import getWeb3 from '../web3';
import getContract from '../contract';

const FormField = ({ icon: Icon, label, type = "text", placeholder, value, onChange }) => (
  <div className="mb-6">
    <label className="flex items-center space-x-2 text-blue-200 mb-2">
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </label>
    {type === "textarea" ? (
      <textarea
        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="4"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    ) : (
      <input
        type={type}
        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    )}
  </div>
);

const SellModel = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });
  const [account, setAccount] = useState('');
  const [loading, setLoading] = useState(false);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [error, setError] = useState(null);

  // Handle form field changes
  const handleChange = useCallback((field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  }, []);

  // Handle account changes
  const handleAccountsChanged = useCallback((accounts) => {
    if (accounts.length > 0) {
      setAccount(accounts[0]);
      setError(null);
    } else {
      setAccount('');
      setError("Please connect to MetaMask to sell models.");
    }
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!web3 || !contract || !account) {
      alert("Please connect to MetaMask to sell models.");
      return;
    }
    
    if (!formData.name || !formData.description || !formData.price) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      
      // Convert price to wei
      const priceInWei = web3.utils.toWei(formData.price, 'ether');
      
      // Create model
      await contract.createModel(
        formData.name,
        formData.description,
        priceInWei,
        { from: account }
      );
      
      setLoading(false);
      alert("Model listed successfully!");
      navigate('/models');
    } catch (err) {
      console.error("Error creating model:", err);
      setLoading(false);
      if (err.message && err.message.includes("User denied")) {
        alert("Transaction was rejected in MetaMask.");
      } else {
        alert("Failed to list model. Please try again.");
      }
    }
  }, [web3, contract, account, formData, navigate]);

  // Initialize web3 and contract
  useEffect(() => {
    const init = async () => {
      try {
        // Get web3 instance
        console.log("Initializing web3 for SellModel page...");
        const web3Instance = await getWeb3();
        setWeb3(web3Instance);
        
        // Get user's Ethereum account
        const accounts = await web3Instance.eth.getAccounts();
        if (accounts.length > 0) {
          console.log("Connected with account:", accounts[0]);
          setAccount(accounts[0]);
        } else {
          console.warn("No accounts found in SellModel page");
          setError("Please connect to MetaMask to sell models. Click the MetaMask icon and connect your account.");
        }

        // Get contract instance
        try {
          console.log("Getting contract instance for SellModel page...");
          const { instance } = await getContract();
          console.log("Contract instance obtained successfully");
          setContract(instance);
        } catch (contractError) {
          console.error("Error getting contract instance:", contractError);
          setError(`Contract connection error: ${contractError.message || "Unknown error"}. Please make sure you're connected to the correct network.`);
        }
      } catch (err) {
        console.error("Error initializing web3:", err);
        setError(`Web3 connection error: ${err.message || "Unknown error"}. Please make sure MetaMask is installed and connected.`);
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
  }, [handleAccountsChanged]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block p-2 rounded-full bg-white/10 backdrop-blur-lg mb-4">
            <CubeIcon className="h-12 w-12 text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
            Sell Your AI Model
          </h1>
          <p className="text-xl text-blue-200">
            Share your innovation with the world
          </p>
          {account ? (
            <p className="text-sm text-blue-300 mt-2">
              Connected Account: {account.substring(0, 6)}...{account.substring(account.length - 4)}
            </p>
          ) : (
            <p className="text-sm text-red-300 mt-2">
              {error || "Please connect to MetaMask to sell models."}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-xl border border-white/10">
          <FormField
            icon={CubeIcon}
            label="Model Name"
            placeholder="Enter your model name"
            value={formData.name}
            onChange={handleChange('name')}
          />

          <FormField
            icon={DocumentTextIcon}
            label="Description"
            type="textarea"
            placeholder="Describe your model's capabilities and use cases"
            value={formData.description}
            onChange={handleChange('description')}
          />

          <FormField
            icon={CurrencyDollarIcon}
            label="Price (ETH)"
            type="number"
            placeholder="Set your price in ETH"
            value={formData.price}
            onChange={handleChange('price')}
          />

          <FormField
            icon={TagIcon}
            label="Category"
            placeholder="e.g., Language Processing, Computer Vision"
            value={formData.category}
            onChange={handleChange('category')}
          />

          <div className="mb-8">
            <label className="flex items-center justify-center w-full h-32 px-4 transition bg-white/5 border-2 border-white/10 border-dashed rounded-xl appearance-none cursor-pointer hover:border-blue-400/60 focus:outline-none">
              <span className="flex items-center space-x-2">
                <CloudArrowUpIcon className="w-6 h-6 text-blue-400" />
                <span className="text-blue-200">Upload model files or drop them here</span>
              </span>
              <input type="file" name="file_upload" className="hidden" />
            </label>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading || !account}
              className={`px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${(loading || !account) ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Processing...' : 'List Your Model'}
            </button>
          </div>
        </form>
      </div>

      {/* Background Animation */}
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

export default SellModel;