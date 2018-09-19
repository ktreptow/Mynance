export interface SavingsPlan {
  uid?: string;
  purpose: string;
  transactionUids?: string[];
  startDate: Date;
  endDate: Date;
  amount: number;
  accountUid: string;
}
