import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'plans', loadChildren: './plans/plans.module#PlansPageModule' },
  { path: 'transactions', loadChildren: './transactions/transactions.module#TransactionsPageModule' },
  { path: 'balance', loadChildren: './balance/balance.module#BalancePageModule' },
<<<<<<< HEAD
  { path: 'add_account', loadChildren: './add-account/add-account.module#AddAccountPageModule' },
  { path: 'add_savingsplan', loadChildren: './add-savingsplan/add-savingsplan.module#AddSavingsplanPageModule' },
  { path: 'account', loadChildren: './account/account.module#AccountPageModule' },
  { path: 'add_transaction', loadChildren: './add-transaction/add-transaction.module#AddTransactionPageModule' },
  { path: 'transaction', loadChildren: './transaction/transaction.module#TransactionPageModule' },
  { path: 'add_category', loadChildren: './add-category/add-category.module#AddCategoryPageModule' },
=======
  { path: 'plansAdd', loadChildren: './plans-add/plans-add.module#PlansAddPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' }
>>>>>>> master
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
