export interface Transaction {
  uid?: string;
  purpose?: string;
  amount: number;
  creationDate: Date;
  executionDate: Date;
  category: string;
  accountUid: string;
}
