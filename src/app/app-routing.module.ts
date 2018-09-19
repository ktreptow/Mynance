import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'plans', loadChildren: './plans/plans.module#PlansPageModule' },
  { path: 'transactions', loadChildren: './transactions/transactions.module#TransactionsPageModule' },
  { path: 'balance', loadChildren: './balance/balance.module#BalancePageModule' },
  { path: 'plansAdd', loadChildren: './plans-add/plans-add.module#PlansAddPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
