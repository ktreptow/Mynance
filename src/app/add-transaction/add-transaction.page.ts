import { Component, OnInit } from '@angular/core';
import { Account } from '../core/account';
import { User } from '../core/user';
import { Transaction } from '../core/transaction';
import { RepeatingTransaction } from '../core/repeating-transaction';
import { PersistenceService } from '../core/persistence.service';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.page.html',
  styleUrls: ['./add-transaction.page.scss'],
})
export class AddTransactionPage implements OnInit {

  heute: boolean = true;
  dauerauftrag: boolean = false;

  user: User;
  account: Account;

  purpose?: string;
  uid?: string;
  amount: number;
  creationDate: Date;
  executionDate: Date;
  category: string;
  accountUid: string;
  execdate: Date;

  transactionUids?: string[];
  startDate: Date;
  endDate: Date;

  today: Date;

  constructor(private persistenceService: PersistenceService, private authService: AuthService) {
    authService.user.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit() {
  }

  addTransaction() {

    this.amount = Math.abs(this.amount)

    if (this.heute) {
      this.executionDate = this.today;
    } else {
      this.executionDate = this.execdate;
    }


    if (this.dauerauftrag) {
      this.persistenceService.addTransaction(this.user,
        {
          amount: this.amount, creationDate: this.today,
          executionDate: this.executionDate, category: this.category, accountUid: this.accountUid
        })
    } else {
      this.persistenceService.addRepeatingTransaction(this.user, 
        {purpose: this.purpose, startDate: this.startDate, endDate: this.endDate, 
          amount: this.amount, category: this.category, accountUid: this.accountUid })
    }
  }
}
