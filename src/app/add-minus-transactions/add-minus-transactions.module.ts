import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddMinusTransactionsPage } from './add-minus-transactions.page';

const routes: Routes = [
  {
    path: '',
    component: AddMinusTransactionsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddMinusTransactionsPage]
})
export class AddMinusTransactionsPageModule {}
