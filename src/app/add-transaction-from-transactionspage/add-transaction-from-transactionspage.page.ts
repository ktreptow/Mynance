import { Component, OnInit } from '@angular/core';

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
