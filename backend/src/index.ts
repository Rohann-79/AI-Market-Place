import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import Web3 from 'web3';
import { MarketplaceContract, RawModel, Model } from '../types/contracts';
import marketplaceAbi from '../build/contracts/Marketplace.json';
import dotenv from 'dotenv';
import { AbiItem } from 'web3-utils';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Web3 and contract
const web3 = new Web3(process.env.BLOCKCHAIN_URL || 'http://localhost:7545');
const contractAddress = process.env.CONTRACT_ADDRESS;

if (!contractAddress) {
  throw new Error('CONTRACT_ADDRESS not set in environment variables');
}

const contract = new web3.eth.Contract(
  marketplaceAbi.abi as AbiItem[],
  contractAddress
) as unknown as MarketplaceContract;

// Error handling middleware
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};

// Input validation middleware
const validateModelInput = (req: Request, res: Response, next: NextFunction) => {
  const { name, description, price } = req.body;
  
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Name is required and must be a string' });
  }
  
  if (!description || typeof description !== 'string') {
    return res.status(400).json({ error: 'Description is required and must be a string' });
  }
  
  if (!price || isNaN(Number(price)) || Number(price) <= 0) {
    return res.status(400).json({ error: 'Price is required and must be a positive number' });
  }
  
  next();
};

// Format model data
function formatModel(rawModel: RawModel): Model {
  return {
    id: rawModel[0],
    name: rawModel[1],
    description: rawModel[2],
    price: rawModel[3],
    seller: rawModel[4],
    isSold: rawModel[5]
  };
}

// Routes
app.get('/models', async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Fetching models from contract...');
    const rawModels = await contract.methods.getModels().call();
    console.log('Raw models:', rawModels);
    
    const formattedModels = rawModels.map(formatModel);
    console.log('Formatted models:', formattedModels);
    
    res.json(formattedModels);
  } catch (error) {
    console.error('Error fetching models:', error);
    res.status(500).json({ error: 'Failed to fetch models' });
  }
});

app.post('/models', validateModelInput, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, price } = req.body;
    
    if (!name || !description || !price) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const accounts = await web3.eth.getAccounts();
    if (!accounts || accounts.length === 0) {
      return res.status(500).json({ error: 'No accounts available' });
    }

    const result = await contract.methods
      .createModel(name, description, web3.utils.toWei(price, 'ether'))
      .send({
        from: accounts[0],
        gas: 3000000
      });

    res.json({
      message: 'Model created successfully',
      transactionHash: result.transactionHash
    });
  } catch (error) {
    console.error('Error creating model:', error);
    res.status(500).json({ error: 'Failed to create model' });
  }
});

app.post('/models/:id/purchase', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    console.log('Purchasing model:', id);
    
    const accounts = await web3.eth.getAccounts();
    if (!accounts || accounts.length === 0) {
      throw new Error('No accounts found');
    }
    
    // Get model price
    const rawModels = await contract.methods.getModels().call();
    const models = rawModels.map(formatModel);
    const model = models.find(m => m.id === id);
    
    if (!model) {
      return res.status(404).json({ error: 'Model not found' });
    }
    
    if (model.isSold) {
      return res.status(400).json({ error: 'Model is already sold' });
    }
    
    const result = await contract.methods
      .purchaseModel(id)
      .send({ 
        from: accounts[0],
        value: model.price,
        gas: 3000000
      });
      
    console.log('Model purchased:', result);
    res.json({ 
      message: 'Model purchased successfully',
      transactionHash: result.transactionHash
    });
  } catch (error) {
    console.error('Error purchasing model:', error);
    next(error);
  }
});

// Apply error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Connected to blockchain at ${process.env.BLOCKCHAIN_URL}`);
  console.log(`Contract address: ${contractAddress}`);
}); 