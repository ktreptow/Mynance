import { Component, OnInit } from '@angular/core';

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
