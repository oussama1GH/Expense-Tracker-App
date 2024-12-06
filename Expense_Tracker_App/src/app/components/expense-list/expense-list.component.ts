import { Component, inject } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CurrencyPipe, DatePipe],
  template: `
    <div class="expense-list">
      <h3>Expenses</h3>
      @if (expenses().length === 0) {
        <p>No expenses added yet.</p>
      } @else {
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            @for (expense of expenses(); track expense.id) {
              <tr>
                <td>{{expense.date | date:'shortDate'}}</td>
                <td>{{expense.description}}</td>
                <td>{{expense.category}}</td>
                <td>{{expense.amount | currency}}</td>
                <td>
                  <button (click)="deleteExpense(expense.id)" class="delete-btn">
                    Delete
                  </button>
                </td>
              </tr>
            }
          </tbody>
        </table>
      }
    </div>
  `,
  styles: [`
    .expense-list {
      margin-top: 1rem;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1rem;
    }
    th, td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    th {
      background-color: #f8f9fa;
    }
    .delete-btn {
      padding: 0.25rem 0.5rem;
      background: #dc3545;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .delete-btn:hover {
      background: #c82333;
    }
  `]
})
export class ExpenseListComponent {
  private expenseService = inject(ExpenseService);
  expenses = this.expenseService.getExpenses();

  deleteExpense(id: number) {
    this.expenseService.deleteExpense(id);
  }
}