export interface Transaction {
  fromWallet: string;
  toWallet: string;
  value: string;
}

export interface BlockEthereum {
  jsonrpc: string;
  id: number;
  result: {
    transactions: Transaction[];
  };
}

export interface LastBlockEthereum {
  jsonrpc: string;
  id: number;
  result: string;
}
