import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataPassing } from '../core/datapassing';
import { Transaction } from '../core/transaction';

/** Detailansicht einer Transaktion. Hier wird über den datapassing Provider eine Transaktion 
   übermittelt, die im HTML dieser Seite angezeigt werden kann. 
*/
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
