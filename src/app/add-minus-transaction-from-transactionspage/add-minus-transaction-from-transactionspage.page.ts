import { Component, OnInit } from '@angular/core';
import { Account } from '../core/account';
import { User } from '../core/user';
import { Transaction } from '../core/transaction';
import { PersistenceService } from '../core/persistence.service';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-add-minus-transaction-from-transactionspage',
  templateUrl: './add-minus-transaction-from-transactionspage.page.html',
  styleUrls: ['./add-minus-transaction-from-transactionspage.page.scss'],
})
export class AddMinusTransactionFromTransactionspagePage implements OnInit {

  constructor() { }

  heute: boolean = true;
  dauerauftrag: boolean = false;

  ngOnInit() {
  }

}
