import React, { useEffect, useState } from 'react';
import { Model } from '../types/contracts';
import { getContract } from '../utils/contract';
import { formatEther } from 'ethers';

const ModelList: React.FC = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const contract = await getContract();
        const fetchedModels = await contract.methods.getModels().call();
        setModels(fetchedModels);
      } catch (err) {
        setError('Failed to fetch models');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  const handlePurchase = async (model: Model) => {
    try {
      const contract = await getContract();
      const accounts = await window.ethereum?.request({ method: 'eth_requestAccounts' });
      
      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts available');
      }

      await contract.methods.purchaseModel(model.id).send({
        from: accounts[0],
        value: model.price,
        gas: 3000000
      });

      // Refresh the models list
      const updatedModels = await contract.methods.getModels().call();
      setModels(updatedModels);
    } catch (err) {
      console.error('Failed to purchase model:', err);
      alert('Failed to purchase model. Please try again.');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading models...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {models.map((model) => (
        <div
          key={model.id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-semibold mb-2">{model.name}</h3>
          <p className="text-gray-600 mb-4">{model.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">
              {formatEther(model.price)} ETH
            </span>
            <button
              onClick={() => handlePurchase(model)}
              disabled={model.isSold}
              className={`px-4 py-2 rounded ${
                model.isSold
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {model.isSold ? 'Sold' : 'Purchase'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModelList; 