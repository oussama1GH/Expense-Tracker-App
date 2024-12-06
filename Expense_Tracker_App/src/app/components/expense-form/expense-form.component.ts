import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExpenseService } from '../../services/expense.service';
import { ExpenseCategory } from '../../models/expense.model';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()" class="expense-form">
      <div class="form-group">
        <input
          type="text"
          [(ngModel)]="description"
          name="description"
          placeholder="Description"
          required
        />
      </div>
      <div class="form-group">
        <input
          type="number"
          [(ngModel)]="amount"
          name="amount"
          placeholder="Amount"
          required
        />
      </div>
      <div class="form-group">
        <select [(ngModel)]="category" name="category" required>
          <option value="">Select Category</option>
          @for (cat of categories; track cat) {
            <option [value]="cat">{{cat}}</option>
          }
        </select>
      </div>
      <button type="submit" class="btn">Add Expense</button>
    </form>
  `,
  styles: [`
    .expense-form {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 8px;
    }
    .form-group {
      flex: 1;
    }
    input, select {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .btn {
      padding: 0.5rem 1rem;
      background: #28a745;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .btn:hover {
      background: #218838;
    }
  `]
})
export class ExpenseFormComponent {
  private expenseService = inject(ExpenseService);
  
  description: string = '';
  amount: number = 0;
  category: ExpenseCategory | '' = '';
  categories = this.expenseService.categories;

  onSubmit() {
    if (this.description && this.amount && this.category) {
      this.expenseService.addExpense({
        description: this.description,
        amount: this.amount,
        category: this.category as ExpenseCategory,
        date: new Date()
      });
      this.description = '';
      this.amount = 0;
      this.category = '';
    }
  }
}