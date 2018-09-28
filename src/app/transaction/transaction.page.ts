import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataPassing } from '../core/datapassing';
import { Transaction } from '../core/transaction';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {

  transaction: Transaction;

  constructor(public datapassing: DataPassing) {
    this.transaction = this.datapassing.transaction
  }

  ngOnInit() {
  }

}
