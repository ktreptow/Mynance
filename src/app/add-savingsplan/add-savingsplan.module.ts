import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddSavingsplanPage } from './add-savingsplan.page';

const routes: Routes = [
  {
    path: '',
    component: AddSavingsplanPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddSavingsplanPage]
})
export class AddSavingsplanPageModule {}
