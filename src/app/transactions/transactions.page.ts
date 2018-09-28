import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service'
import { NavController } from '@ionic/angular';
import { DataPassing } from '../core/datapassing';
import { Transaction } from '../core/transaction';
import { PersistenceService } from '../core/persistence.service';
import { User } from '../core/user';
import { Account } from '../core/account';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {

  user: User;
  konten: Account[] = [];
  transactions: Transaction[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    public datapassing: DataPassing,
    private navCtrl: NavController,
    private persistenceService: PersistenceService
  ) {
    authService.user.subscribe((user) => {
      this.user = user;
      if (user) {
        persistenceService.getAccounts(user).subscribe((konten) => { this.konten = konten; this.getAllTransactions(this.konten); });
      }

    });
  }

  ngOnInit() {
  }
  async getAllTransactions(konten: Account[]) {
    this.transactions = [];
    for (let konto of konten) {
      this.transactions = this.transactions.concat(await this.persistenceService.getTransactions(this.user, konto).first().toPromise());
      console.log(konto + '    --   ' + this.transactions);
    }
  }

  addTransaction(value) {
    if (value == "-") {
      this.datapassing.positive = false;
    } else {
      this.datapassing.positive = true
    }

    this.navCtrl.navigateForward('/addTransaction')
  }

  openTransaction(transaction) {
    this.datapassing.transaction = transaction
    this.navCtrl.navigateForward('/transactions')
  }
}
