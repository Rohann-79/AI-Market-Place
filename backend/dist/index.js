"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const web3_1 = __importDefault(require("web3"));
const Marketplace_json_1 = __importDefault(require("../build/contracts/Marketplace.json"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Initialize Web3 and contract
const web3 = new web3_1.default(process.env.BLOCKCHAIN_URL || 'http://127.0.0.1:7545');
const contractAddress = process.env.CONTRACT_ADDRESS;
const marketplace = new web3.eth.Contract(Marketplace_json_1.default.abi, contractAddress);
// Error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
};
// Input validation middleware
const validateModelInput = (req, res, next) => {
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
// Routes
app.get('/models', async (req, res, next) => {
    try {
        const models = await marketplace.methods.getModels().call();
        res.json(models);
    }
    catch (error) {
        next(error);
    }
});
app.post('/models', validateModelInput, async (req, res, next) => {
    try {
        const { name, description, price } = req.body;
        const accounts = await web3.eth.getAccounts();
        await marketplace.methods.createModel(name, description, price)
            .send({ from: accounts[0] });
        res.status(201).json({ message: 'Model created successfully' });
    }
    catch (error) {
        next(error);
    }
});
app.post('/models/:id/purchase', async (req, res, next) => {
    try {
        const { id } = req.params;
        const accounts = await web3.eth.getAccounts();
        // Get model price
        const models = await marketplace.methods.getModels().call();
        const model = models.find((m) => m.id === id);
        if (!model) {
            return res.status(404).json({ error: 'Model not found' });
        }
        if (model.isSold) {
            return res.status(400).json({ error: 'Model is already sold' });
        }
        await marketplace.methods.purchaseModel(id)
            .send({
            from: accounts[0],
            value: model.price
        });
        res.json({ message: 'Model purchased successfully' });
    }
    catch (error) {
        next(error);
    }
});
// Apply error handling middleware
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Connected to blockchain at ${process.env.BLOCKCHAIN_URL}`);
    console.log(`Contract address: ${contractAddress}`);
});
