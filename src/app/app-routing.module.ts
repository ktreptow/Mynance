import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'plans', loadChildren: './plans/plans.module#PlansPageModule' },
  { path: 'transactions', loadChildren: './transactions/transactions.module#TransactionsPageModule' },
  { path: 'balance', loadChildren: './balance/balance.module#BalancePageModule' },
  { path: 'addAccount', loadChildren: './add-account/add-account.module#AddAccountPageModule' },
  { path: 'account', loadChildren: './account/account.module#AccountPageModule' },
  { path: 'addTransaction', loadChildren: './add-transaction/add-transaction.module#AddTransactionPageModule' },
  { path: 'transaction', loadChildren: './transaction/transaction.module#TransactionPageModule' },
  { path: 'addCategory', loadChildren: './add-category/add-category.module#AddCategoryPageModule' },
  { path: 'plansAdd', loadChildren: './plans-add/plans-add.module#PlansAddPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'addMinusTransactions', loadChildren: './add-minus-transactions/add-minus-transactions.module#AddMinusTransactionsPageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
