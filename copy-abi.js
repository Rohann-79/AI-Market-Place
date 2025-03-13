const fs = require('fs');
const path = require('path');

// Paths
const contractBuildPath = path.join(__dirname, 'backend/build/contracts/Marketplace.json');
const frontendPath = path.join(__dirname, 'frontend/src/contracts');

// Create the contracts directory if it doesn't exist
if (!fs.existsSync(frontendPath)) {
  fs.mkdirSync(frontendPath, { recursive: true });
}

// Copy the contract ABI
try {
  const contractJson = fs.readFileSync(contractBuildPath, 'utf8');
  fs.writeFileSync(
    path.join(frontendPath, 'Marketplace.json'),
    contractJson
  );
  console.log('Contract ABI copied successfully to frontend/src/contracts/');
} catch (error) {
  console.error('Error copying contract ABI:', error);
} 