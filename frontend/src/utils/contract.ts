import Web3 from 'web3';
import { ContractInstance } from '../types/contracts';
import marketplaceAbi from '../contracts/Marketplace.json';

const BLOCKCHAIN_URL = process.env.REACT_APP_BLOCKCHAIN_URL || 'http://localhost:7545';
const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS || '0x3F2e28eAf710b19e7472195CE825ca4277a9803C';

let web3: Web3 | null = null;
let contract: ContractInstance | null = null;

export const getWeb3 = async (): Promise<Web3> => {
  if (!web3) {
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } catch (error) {
        console.error('User denied account access');
      }
    } else {
      web3 = new Web3(new Web3.providers.HttpProvider(BLOCKCHAIN_URL));
    }
  }
  return web3;
};

export const getContract = async (): Promise<ContractInstance> => {
  if (!contract) {
    const web3Instance = await getWeb3();
    contract = new web3Instance.eth.Contract(
      marketplaceAbi.abi,
      CONTRACT_ADDRESS
    ) as unknown as ContractInstance;
  }
  return contract;
}; 