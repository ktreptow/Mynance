import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BalancePage } from './balance.page';
import { PersistenceService } from '../core/persistence.service';
import { AuthService } from '../core/auth.service';

const routes: Routes = [
  {
    path: '',
    component: BalancePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BalancePage],
  providers: [PersistenceService, AuthService]
})
export class BalancePageModule { }
