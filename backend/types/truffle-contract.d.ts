import { Contract } from 'web3-eth-contract';

export interface ContractJSON {
  abi: any[];
  networks: {
    [key: string]: {
      address: string;
      transactionHash: string;
    };
  };
}

export interface ContractInstance extends Contract {
  address: string;
  transactionHash?: string;
}

export interface ContractClass {
  new(): ContractInstance;
  deploy(options: { from: string }): Promise<ContractInstance>;
  setProvider(provider: any): void;
}

export function TruffleContract(contractJSON: ContractJSON): ContractClass; 