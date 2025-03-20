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

export interface ContractInstance {
  methods: {
    getModels(): { 
      call(): Promise<Model[]>;
    };
    createModel(name: string, description: string, price: string): { 
      send(options: SendOptions): Promise<TransactionResult>;
    };
    purchaseModel(id: string): {
      send(options: SendOptions): Promise<TransactionResult>;
    };
  };
} 