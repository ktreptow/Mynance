import { Component, OnInit } from '@angular/core';
import { Account } from '../core/account';
import { User } from '../core/user';
import { Transaction } from '../core/transaction';
import { RepeatingTransaction } from '../core/repeating-transaction';
import { PersistenceService } from '../core/persistence.service';
import { AuthService } from '../core/auth.service';
import { DataPassing } from '../core/datapassing';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

/** Komponente zum Hinzufügen von Transaktionen. Erreichbar über die '+' und '-' Buttons über den HOME-Tab
   sowie über eine Kontodetailansicht.
*/
@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.page.html',
  styleUrls: ['./add-transaction.page.scss'],
})
export class AddTransactionPage implements OnInit {

  positive: boolean;
  heute: boolean = true;
  dauerauftrag: boolean = false;
  fromAccount: boolean = false;

  user: User;
  account: Account;
  konten: Account[] = [];

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

  today: Date = new Date();
  selectedAccount: Account;

  /** Konstruktor der Klasse. Hier wird der aktuelle User ermittelt und seine Konten geladen
     Es geschieht eine Abfrage, ob die Seite von einem Konto oder von der HOME Seite aufgerufen wird.
     Im ersten Fall ist das Konto bereits bekannt und wird über den selbst geschriebenen Provider 
     datapassing von der Kontoseite mitgegeben.  

     @param router: Router zum Navigieren auf die nächste Seite
     @param persistenceService: Service zum Aufrufen der Datenbankservices
     @param authService: Service zur Nutzererkennung
     @param datapassing: Provider zur Weitergabe von Daten zwischen den Seiten
     @package navCtrl: Navigationscontroller zur Kontrolle der Navigation
  */
  constructor(private router: Router, private persistenceService: PersistenceService, private authService: AuthService, public datapassing: DataPassing, private navCtrl: NavController) {
    authService.user.subscribe((user) => {
      this.user = user;
      if (this.user) {
        persistenceService.getAccounts(this.user).subscribe((konten) => { this.konten = konten });
      }
    });
    this.positive = this.datapassing.positive
    if (this.datapassing.account) {
      this.account = this.datapassing.account
      this.fromAccount = true;
    } else {
      this.fromAccount = false;
      this.account = this.selectedAccount
    }

  }

  ngOnInit() {
  }

  /** Diese Methode wird über (click) im HTML aufgerufen und ruft einen Service auf, 
   der eine Transaktion mit den eingegebenen Parametern in der Datenbank anlegt.

   Vorher wird abgefragt, wann das Ausführungsdatum ist (heute oder terminiert) und ob es 
   sich um einen Dauerauftrag handelt. Diese Werte kommen per Binding aus dem HTML.
*/
  addTransaction() {
    this.category = 'TestKategorie'
    if (this.positive) {
      this.amount = Math.abs(this.amount)
    } else {
      this.amount = -Math.abs(this.amount)
    }

    if (this.heute) {
      this.executionDate = this.today;
    } else {
      this.executionDate = this.execdate;
    }

    if (!this.dauerauftrag) {
      this.persistenceService.setTransaction(this.user,
        {
          amount: this.amount, creationDate: this.today,
          executionDate: this.executionDate, category: this.category, accountUid: this.account.uid
        })
      if (this.executionDate === this.today) {
        this.account.balance += this.amount;
        this.persistenceService.setAccount(this.user, this.account);
      }
    } else {
      this.persistenceService.setRepeatingTransaction(this.user,
        {
          purpose: this.purpose, startDate: this.startDate, endDate: this.endDate,
          amount: this.amount, category: this.category, accountUid: this.account.uid
        })
    }
    this.router.navigateByUrl('/balance');

  }
}
