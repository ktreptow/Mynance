import { Component, OnInit } from '@angular/core';
import { Account } from '../core/account';
import { User } from '../core/user';
import { Transaction } from '../core/transaction';
import { PersistenceService } from '../core/persistence.service';
import { AuthService } from '../core/auth.service';
@Component({
  selector: 'app-add-minus-transactions',
  templateUrl: './add-minus-transactions.page.html',
  styleUrls: ['./add-minus-transactions.page.scss'],
})
export class AddMinusTransactionsPage implements OnInit {

  constructor() { }

  heute: boolean = true;
  dauerauftrag: boolean = false;

  ngOnInit() {
  }

}
