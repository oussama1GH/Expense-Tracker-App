import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-budget-settings',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="budget-settings">
      <h3>Monthly Budget Settings</h3>
      <div class="input-group">
        <input
          type="number"
          [(ngModel)]="newBudget"
          placeholder="Enter monthly budget"
          class="budget-input"
        />
        <button (click)="updateBudget()" class="btn">Update Budget</button>
      </div>
    </div>
  `,
  styles: [`
    .budget-settings {
      padding: 1rem;
      background: #f5f5f5;
      border-radius: 8px;
      margin-bottom: 1rem;
    }
    .input-group {
      display: flex;
      gap: 1rem;
    }
    .budget-input {
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      flex: 1;
    }
    .btn {
      padding: 0.5rem 1rem;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .btn:hover {
      background: #0056b3;
    }
  `]
})
export class BudgetSettingsComponent {
  private expenseService = inject(ExpenseService);
  newBudget: number = this.expenseService.getBudget()();

  updateBudget() {
    if (this.newBudget > 0) {
      this.expenseService.setBudget(this.newBudget);
    }
  }
}