import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service'
import { NavController } from '@ionic/angular';
import { DataPassing } from '../core/datapassing';
import { Transaction } from '../core/transaction';
import { PersistenceService } from '../core/persistence.service';
import { User } from '../core/user';
import { Account } from '../core/account';

/** Startseite der Anwendung. Hier werden die letzten eigenen Transaktionen angezeigt.*/
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [AuthService]
})

export class HomePage {

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

  signOut() {
    this.authService.signOut();
    this.router.navigateByUrl('/login');
  }

  /** Diese Methode fragt alle Konten und dessen Transaktionen einer besitmmten Users ab. 
      Diese werden dann in einer Liste auf der Startseite dargestellt.  

      @param konten: Account[]
  */
  async getAllTransactions(konten: Account[]) {
    this.transactions = [];
    for (let konto of konten) {
      this.transactions = this.transactions.concat(await this.persistenceService.getTransactions(this.user, konto).first().toPromise());
      console.log(konto + '    --   ' + this.transactions);
    }
  }

  /** Diese Methode wird aufgerufen, wenn einer der Buttons zum hinzufügen einer Transaction
   angeklickt wird. Je nachdem, ob auf den '-' oder '+' Button geklickt wurde, wird ein boolean 
   Wert an die 'addTransaction'-Maske weitergegeben, der einen Plus bzw Minuswert der Transaktionssumme angibt.
  
  @param value: Wert zum Ermitteln von Plus- oder Minus-Transaktionen.  Der Wert muss entweder '-' oder '+' sein
   */
  addTransaction(value) {
    if (value == "-") {
      this.datapassing.positive = false;
    } else {
      this.datapassing.positive = true
    }

    this.navCtrl.navigateForward('/addTransaction')
  }

  /** Diese Methode wird mit Klick auf eine der Transaktionen geöffnet und gibt die
   ausgewählte Transaktion per datapassing an die neue Seite weiter und ruft diese auf. 

   @param transaction: Transaktion, die geöffnet werden soll.
  */
  openTransaction(transaction) {
    this.datapassing.transaction = transaction
    this.navCtrl.navigateForward('/transaction')
  }
}
