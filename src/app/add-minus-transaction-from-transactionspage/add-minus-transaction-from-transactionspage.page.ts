import { Component, OnInit } from '@angular/core';

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
