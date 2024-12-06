import { Injectable, signal } from '@angular/core';
import { Expense, ExpenseCategory } from '../models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private expenses = signal<Expense[]>([]);
  private monthlyBudget = signal<number>(1000); // Default budget

  readonly categories: ExpenseCategory[] = [
    'Food',
    'Transport',
    'Entertainment',
    'Shopping',
    'Bills',
    'Other'
  ];

  addExpense(expense: Omit<Expense, 'id'>) {
    const newExpense = {
      ...expense,
      id: Date.now(),
    };
    this.expenses.update(expenses => [...expenses, newExpense]);
  }

  deleteExpense(id: number) {
    this.expenses.update(expenses => expenses.filter(e => e.id !== id));
  }

  getExpenses() {
    return this.expenses;
  }

  getTotalExpenses() {
    return this.expenses().reduce((total, expense) => total + expense.amount, 0);
  }

  setBudget(amount: number) {
    this.monthlyBudget.set(amount);
  }

  getBudget() {
    return this.monthlyBudget;
  }

  getRemainingBudget() {
    return this.monthlyBudget() - this.getTotalExpenses();
  }

  getBudgetProgress() {
    return (this.getTotalExpenses() / this.monthlyBudget()) * 100;
  }
}