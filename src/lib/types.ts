export type Bill = {
  person: string;
  amount: number;
  detail: string;
};

export type DataToSplit = {
  people: string[];
  bills: Bill[];
};

export type SplitBill = {
  transactions: {
    from: string;
    to: string;
    amount: number;
  }[];
  totalAmountSpent: number;
  equalShare: number;
};
