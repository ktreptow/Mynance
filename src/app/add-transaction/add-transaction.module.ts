import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PersistenceService } from '../core/persistence.service';
import { AuthService } from '../core/auth.service'
import { IonicModule } from '@ionic/angular';
import { DataPassing } from '../core/datapassing';


import { AddTransactionPage } from './add-transaction.page';

const routes: Routes = [
  {
    path: '',
    component: AddTransactionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddTransactionPage],
  providers: [PersistenceService, AuthService]

})
export class AddTransactionPageModule { }
