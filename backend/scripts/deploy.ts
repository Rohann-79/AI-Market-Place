import { Web3 } from 'web3';
import { TruffleContract } from '@truffle/contract';
import Marketplace from '../build/contracts/Marketplace.json';
import dotenv from 'dotenv';

dotenv.config();

async function deploy() {
  try {
    // Initialize Web3
    const web3 = new Web3(process.env.BLOCKCHAIN_URL || 'http://127.0.0.1:7545');
    
    // Get accounts
    const accounts = await web3.eth.getAccounts();
    console.log('Deploying from account:', accounts[0]);
    
    // Create contract instance
    const MarketplaceContract = TruffleContract(Marketplace);
    MarketplaceContract.setProvider(web3.currentProvider);
    
    // Deploy contract
    console.log('Deploying Marketplace contract...');
    const marketplace = await MarketplaceContract.new({ from: accounts[0] });
    
    console.log('Marketplace deployed at:', marketplace.address);
    console.log('Transaction hash:', marketplace.transactionHash);
    
    // Update .env file with new contract address
    const fs = require('fs');
    const envPath = '.env';
    let envContent = fs.readFileSync(envPath, 'utf8');
    envContent = envContent.replace(
      /CONTRACT_ADDRESS=.*/,
      `CONTRACT_ADDRESS=${marketplace.address}`
    );
    fs.writeFileSync(envPath, envContent);
    console.log('Updated .env file with new contract address');
    
  } catch (error) {
    console.error('Deployment failed:', error);
    process.exit(1);
  }
}

deploy(); 