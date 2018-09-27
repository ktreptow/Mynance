import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/tabs/(home:home)', pathMatch: 'full' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard] },
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
  { path: 'addMinusTransactions', loadChildren: './add-minus-transactions/add-minus-transactions.module#AddMinusTransactionsPageModule' },
  { path: 'addTransactionFromTransactionspage', loadChildren: './add-transaction-from-transactionspage/add-transaction-from-transactionspage.module#AddTransactionFromTransactionspagePageModule' },
  { path: 'addMinusTransactionFromTransactionspage', loadChildren: './add-minus-transaction-from-transactionspage/add-minus-transaction-from-transactionspage.module#AddMinusTransactionFromTransactionspagePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'calendar', loadChildren: './calendar/calendar.module#CalendarPageModule' }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
