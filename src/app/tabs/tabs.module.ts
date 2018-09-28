import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { HomePageModule } from '../home/home.module';
import { BalancePageModule } from '../balance/balance.module';
import { PlansPageModule } from '../plans/plans.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    HomePageModule,
    BalancePageModule,
    PlansPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule { }
