import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PersistenceService } from '../core/persistence.service';
import { AuthService } from '../core/auth.service'
import { IonicModule } from '@ionic/angular';

import { AddTransactionFromTransactionspagePage } from './add-transaction-from-transactionspage.page';

const routes: Routes = [
  {
    path: '',
    component: AddTransactionFromTransactionspagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddTransactionFromTransactionspagePage],
  providers: [PersistenceService, AuthService]

})
export class AddTransactionFromTransactionspagePageModule { }
