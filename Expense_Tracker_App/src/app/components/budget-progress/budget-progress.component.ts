import { Component, computed, effect, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-budget-progress',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <div class="budget-progress">
      <div class="budget-info">
        <div>Monthly Budget: {{budget() | currency}}</div>
        <div>Remaining: {{remaining() | currency}}</div>
      </div>
      <div class="progress-bar">
        <div
          class="progress"
          [style.width.%]="progress()"
          [class.warning]="progress() > 80"
          [class.danger]="progress() > 100"
        ></div>
      </div>
      @if (progress() > 100) {
        <div class="alert">
          Warning: You have exceeded your monthly budget!
        </div>
      }
    </div>
  `,
  styles: [`
    .budget-progress {
      margin: 1rem 0;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 8px;
    }
    .budget-info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }
    .progress-bar {
      height: 20px;
      background: #e9ecef;
      border-radius: 10px;
      overflow: hidden;
    }
    .progress {
      height: 100%;
      background: #28a745;
      transition: width 0.3s ease;
    }
    .progress.warning {
      background: #ffc107;
    }
    .progress.danger {
      background: #dc3545;
    }
    .alert {
      margin-top: 0.5rem;
      padding: 0.5rem;
      color: white;
      background: #dc3545;
      border-radius: 4px;
      text-align: center;
    }
  `]
})
export class BudgetProgressComponent {
  private expenseService = inject(ExpenseService);
  
  budget = this.expenseService.getBudget();
  remaining = computed(() => this.expenseService.getRemainingBudget());
  progress = computed(() => this.expenseService.getBudgetProgress());
}