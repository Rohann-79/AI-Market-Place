import Web3 from 'web3';

// Initialize web3 with a provider
const getWeb3 = () => {
  return new Promise((resolve, reject) => {
    console.log("Initializing Web3...");
    
    // Wait for window to load
    window.addEventListener('load', async () => {
      // Modern dapp browsers
      if (window.ethereum) {
        console.log("Modern Ethereum provider detected (window.ethereum)");
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access
          console.log("Requesting account access...");
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          console.log("Account access granted");
          
          // Check if connected to the correct network
          const networkId = await web3.eth.net.getId();
          console.log("Connected to network ID:", networkId);
          
          // Check if we're connected to Ganache (network ID 5777)
          if (networkId !== 5777) {
            console.warn(`Connected to network ${networkId}, but Ganache network (5777) is required`);
            // We'll continue anyway, but log a warning
          }
          
          // Check if we have accounts
          const accounts = await web3.eth.getAccounts();
          console.log("Connected accounts:", accounts.length > 0 ? accounts : "No accounts found");
          
          if (accounts.length === 0) {
            reject(new Error("No accounts found. Please unlock your MetaMask and refresh."));
            return;
          }
          
          resolve(web3);
        } catch (error) {
          console.error("Error connecting to MetaMask:", error);
          reject(new Error("User denied account access or connection failed"));
        }
      }
      // Legacy dapp browsers
      else if (window.web3) {
        console.log("Legacy Web3 provider detected (window.web3)");
        const web3 = new Web3(window.web3.currentProvider);
        resolve(web3);
      }
      // Fallback to local provider
      else {
        console.log("No Web3 provider detected, falling back to local provider");
        try {
          const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
          const web3 = new Web3(provider);
          
          // Check if we can connect to the local provider
          await web3.eth.net.isListening();
          console.log("Successfully connected to local provider");
          
          // Verify we're connected to Ganache
          const networkId = await web3.eth.net.getId();
          console.log("Local provider network ID:", networkId);
          
          if (networkId !== 5777) {
            console.warn("Connected to local provider, but it's not Ganache (network ID 5777)");
          }
          
          resolve(web3);
        } catch (error) {
          console.error("Failed to connect to local provider:", error);
          reject(new Error("No Web3 provider detected and local fallback failed. Please install MetaMask."));
        }
      }
    });
  });
};

export default getWeb3; 