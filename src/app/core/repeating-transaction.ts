export interface RepeatingTransaction {
  uid?: string;
  purpose: string;
  transactionUids?: string[];
  startDate: Date;
  endDate: Date;
  amount: number;
  category: string;
  accountUid: string;
}
