const express = require('express');
const cors = require('cors');
const Web3 = require('web3');
const Marketplace = require('../build/contracts/Marketplace.json');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const web3 = new Web3(process.env.BLOCKCHAIN_URL);
const contractAddress = process.env.CONTRACT_ADDRESS;
const marketplace = new web3.eth.Contract(Marketplace.abi, contractAddress);

app.get('/models', async (req, res) => {
  try {
    const models = await marketplace.methods.getModels().call();
    res.json(models);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/models', async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const accounts = await web3.eth.getAccounts();
    await marketplace.methods.createModel(name, description, price).send({ from: accounts[0] });
    res.status(201).json({ message: 'Model created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));