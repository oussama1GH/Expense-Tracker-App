export interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: Date;
}

export type ExpenseCategory = 'Food' | 'Transport' | 'Entertainment' | 'Shopping' | 'Bills' | 'Other';