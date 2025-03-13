# NexusAI Marketplace

A decentralized marketplace for buying and selling AI models using blockchain technology.

## Prerequisites

- Node.js (v14+)
- npm or yarn
- Ganache (for local blockchain)
- MetaMask browser extension

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd AI\ Marketplace
```

### 2. Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Start Ganache (if not already running)
# Make sure Ganache is running on port 7545

# Compile and deploy smart contracts
truffle compile
truffle migrate --network development
```

### 3. Copy Contract ABI to Frontend

```bash
# From the root directory
node copy-abi.js
```

### 4. Frontend Setup

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

### 5. Connect MetaMask to Ganache

1. Install MetaMask browser extension if you don't have it already
2. Open MetaMask and create or import a wallet
3. Add a new network with the following details:
   - Network Name: Ganache
   - New RPC URL: http://127.0.0.1:7545
   - Chain ID: 1337
   - Currency Symbol: ETH
4. Import an account from Ganache:
   - In Ganache, click on the key icon next to an account to view its private key
   - In MetaMask, click on your account icon > Import Account
   - Paste the private key and click Import

### 6. Troubleshooting MetaMask Connection

If you encounter issues with MetaMask:

1. **Reset Account**: In MetaMask, go to Settings > Advanced > Reset Account
2. **Clear Browser Cache**: Clear your browser cache and restart
3. **Network Configuration**: Double-check your network configuration in MetaMask
4. **Ganache Running**: Ensure Ganache is running on port 7545
5. **Account Balance**: Make sure your Ganache account has sufficient ETH

## Usage

1. **Browse Models**: Visit the Models page to see available AI models
2. **Buy Models**: Connect your MetaMask wallet and purchase models with ETH
3. **Sell Models**: List your own AI models for sale by filling out the form on the Sell page

## Features

- Modern UI with glassmorphic design
- Blockchain-based transactions
- User authentication with Firebase
- Responsive design for all devices
- MetaMask integration for Ethereum transactions

## Technologies Used

- React.js
- Tailwind CSS
- Web3.js
- Truffle
- Solidity
- Firebase Authentication
- MetaMask 