import getWeb3 from './web3';
import TruffleContract from '@truffle/contract';
import MarketplaceJSON from './contracts/Marketplace.json';

// Create a function to get the contract instance
const getContract = async () => {
  try {
    // Get web3 instance
    const web3 = await getWeb3();
    
    if (!web3) {
      throw new Error("Failed to initialize Web3. Please check your MetaMask connection.");
    }
    
    // Create contract abstraction
    const MarketplaceContract = TruffleContract(MarketplaceJSON);
    
    if (!MarketplaceContract) {
      throw new Error("Failed to create contract abstraction. Contract JSON may be invalid.");
    }
    
    // Check if contract is deployed on any networks
    if (!MarketplaceJSON.networks || Object.keys(MarketplaceJSON.networks).length === 0) {
      throw new Error("Contract is not deployed on any network. Please deploy the contract first.");
    }
    
    // Check specifically for Ganache network (5777)
    if (!MarketplaceJSON.networks['5777']) {
      console.warn("Contract is not deployed on Ganache network (5777). This may cause issues.");
    }
    
    // Set provider
    try {
      MarketplaceContract.setProvider(web3.currentProvider);
    } catch (providerError) {
      console.error("Provider error:", providerError);
      throw new Error("Failed to set provider. Your wallet may not be properly connected.");
    }
    
    // Get deployed contract
    try {
      const networkId = await web3.eth.net.getId();
      console.log("Connected to network ID:", networkId);
      
      // Check if contract is deployed on current network
      if (!MarketplaceJSON.networks[networkId.toString()]) {
        throw new Error(`Contract is not deployed on the current network (ID: ${networkId}). Please switch to the correct network.`);
      }
      
      const instance = await MarketplaceContract.deployed();
      return { web3, instance };
    } catch (deploymentError) {
      console.error("Deployment error:", deploymentError);
      throw new Error("Failed to get deployed contract. The contract may not be deployed on this network.");
    }
  } catch (error) {
    console.error("Error getting contract instance:", error);
    throw error;
  }
};

export default getContract; 