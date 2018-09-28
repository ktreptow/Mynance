import { Component, OnInit } from '@angular/core';
import { Account } from '../core/account';
import { User } from '../core/user';
import { PersistenceService } from '../core/persistence.service';
import { AuthService } from '../core/auth.service';
import { NavController } from '@ionic/angular';
import { DataPassing } from '../core/datapassing';
import { Transaction } from '../core/transaction';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  user: User;
  account: Account
  transactions: Transaction[] = [];

  constructor(private persistenceService: PersistenceService, private authService: AuthService, public datapassing: DataPassing, private navCtrl: NavController) {
    authService.user.subscribe((user) => {
      this.user = user;
      if (this.user) {
        this.persistenceService.getAccount(this.user, this.account.uid).subscribe((account) => { this.account = account });
        this.persistenceService.getTransactions(this.user, this.account).subscribe((transactions) => { this.transactions = transactions })
      }
    });
    this.account = this.datapassing.account

    console.log(this.account)
  }

  ngOnInit() {

  }

  openTransaction(transaction) {
    this.datapassing.transaction = transaction
    this.navCtrl.navigateForward('/transaction')
  }

  addTransaction(value) {
    if (value == "-") {
      this.datapassing.positive = false;
    } else {
      this.datapassing.positive = true
    }

    this.datapassing.account = this.account;

    this.navCtrl.navigateForward('/addTransaction')
  }
}
