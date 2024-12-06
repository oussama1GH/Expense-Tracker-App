import { Component } from '@angular/core';
import { BudgetSettingsComponent } from './components/budget-settings/budget-settings.component';
import { BudgetProgressComponent } from './components/budget-progress/budget-progress.component';
import { ExpenseFormComponent } from './components/expense-form/expense-form.component';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    BudgetSettingsComponent,
    BudgetProgressComponent,
    ExpenseFormComponent,
    ExpenseListComponent
  ],
  template: `
    <div class="container">
      <h1>Expense Tracker</h1>
      <app-budget-settings />
      <app-budget-progress />
      <app-expense-form />
      <app-expense-list />
    </div>
  `,
  styles: [`
    .container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 0 1rem;
    }
    h1 {
      text-align: center;
      color: #333;
      margin-bottom: 2rem;
    }
  `]
})
export class AppComponent {}