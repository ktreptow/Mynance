import { Component, OnInit } from '@angular/core';
import { Account } from '../core/account';
import { User } from '../core/user';
import { Transaction } from '../core/transaction';
import { PersistenceService } from '../core/persistence.service';
import { AuthService } from '../core/auth.service';
@Component({
  selector: 'app-add-transaction-from-transactionspage',
  templateUrl: './add-transaction-from-transactionspage.page.html',
  styleUrls: ['./add-transaction-from-transactionspage.page.scss'],
})
export class AddTransactionFromTransactionspagePage implements OnInit {

  constructor() { }

  heute: boolean = true;
  dauerauftrag: boolean = false;

  ngOnInit() {
  }

}
