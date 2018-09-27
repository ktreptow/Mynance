import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddMinusTransactionFromTransactionspagePage } from './add-minus-transaction-from-transactionspage.page';

const routes: Routes = [
  {
    path: '',
    component: AddMinusTransactionFromTransactionspagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddMinusTransactionFromTransactionspagePage]
})
export class AddMinusTransactionFromTransactionspagePageModule {}
