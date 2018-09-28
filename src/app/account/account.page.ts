import { Component, OnInit } from '@angular/core';
import { Account } from '../core/account';
import { User } from '../core/user';
import { PersistenceService } from '../core/persistence.service';
import { AuthService } from '../core/auth.service';
import { NavController } from '@ionic/angular';
import { DataPassing } from '../core/datapassing';
import { Transaction } from '../core/transaction';

/** Komponente zum Anzeigen einer Konto-Detailansicht. Hier finden sich die 
   Transaktionen sowie die Möglichkeit zum Anlegen einer neuen. 
*/
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

  /** Methode zum Öffnen einer Transaktion aus der Kontoansicht heraus. 
   Über den datapassing Provider wird die gewählte Transaktion zwischengespeichert
   und danach auf die Transaktionsdetailseite geleitet.

   @param transaction: Transaktion, die geöffnet werden soll
  */
  openTransaction(transaction) {
    this.datapassing.transaction = transaction
    this.navCtrl.navigateForward('/transaction')
  }

  /** Diese Methode wird aufgerufen, wenn einer der Buttons zum hinzufügen einer Transaction
   angeklickt wird. Je nachdem, ob auf den '-' oder '+' Button geklickt wurde, wird ein boolean 
   Wert an die 'addTransaction'-Maske weitergegeben, der einen Plus bzw Minuswert der Transaktionssumme angibt.  
   Ebenfalls wird das aktuelle Konto mitgegeben. 

  
   @param value: Wert zum Ermitteln von Plus- oder Minus-Transaktionen.  Der Wert muss entweder '-' oder '+' sein
  */
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
