import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PersistenceService } from '../core/persistence.service';
import { IonicModule } from '@ionic/angular';
import { PlansAddPage } from './plans-add.page';

const routes: Routes = [
  {
    path: '',
    component: PlansAddPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PlansAddPage],
  providers: [PersistenceService]
})
export class PlansAddPageModule { }
