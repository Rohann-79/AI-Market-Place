import { Contract } from 'web3-eth-contract';

export interface RawModel {
  0: string;  // id
  1: string;  // name
  2: string;  // description
  3: string;  // price
  4: string;  // seller
  5: boolean; // isSold
}

export interface Model {
  id: string;
  name: string;
  description: string;
  price: string;
  seller: string;
  isSold: boolean;
}

export interface TransactionResult {
  transactionHash: string;
  blockHash: string;
  blockNumber: number;
  from: string;
  to: string;
  gasUsed: number;
}

export interface SendOptions {
  from: string;
  gas?: number;
  value?: string;
}

export interface MarketplaceContract extends Contract {
  methods: {
    getModels(): { 
      call(): Promise<RawModel[]>;
    };
    createModel(name: string, description: string, price: string): { 
      send(options: SendOptions): Promise<TransactionResult>;
    };
    purchaseModel(id: string): {
      send(options: SendOptions): Promise<TransactionResult>;
    };
  };
} 