import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { HomePage } from '../home/home.page';
import { BalancePage } from '../balance/balance.page';
import { TransactionsPage } from '../transactions/transactions.page';
import { PlansPage } from '../plans/plans.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/(home:home)',
        pathMatch: 'full',
      },
      {
        path: 'home',
        outlet: 'home',
        component: HomePage
      },
      {
        path: 'balance',
        outlet: 'balance',
        component: BalancePage
      },
      {
        path: 'transactions',
        outlet: 'transactions',
        component: TransactionsPage
      },
      {
        path: 'plans',
        outlet: 'plans',
        component: PlansPage
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/(home:home)',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
