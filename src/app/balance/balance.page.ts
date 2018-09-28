import { Component, OnInit } from '@angular/core';
import { Account } from '../core/account';
import { User } from '../core/user';
import { PersistenceService } from '../core/persistence.service';
import { AuthService } from '../core/auth.service';
import { DataPassing } from '../core/datapassing';
import { NavController } from '@ionic/angular';


/** Komponente zur Übersicht der vorhandenen Konten. 
 Es ist möglich, sich ein Konto im Detail anzeigen zu lassen, sowie ein neues Konto zu erstellen.
*/
@Component({
  selector: 'app-balance',
  templateUrl: './balance.page.html',
  styleUrls: ['./balance.page.scss'],
})
export class BalancePage implements OnInit {

  konten: Account[] = [];
  user: User;
  chosenAccount: Account

  constructor(public datapassing: DataPassing, private persistenceService: PersistenceService, private authService: AuthService, private navCtrl: NavController
  ) {
    authService.user.subscribe((user) => {
      this.user = user;
      if (user) {
        persistenceService.getAccounts(user).subscribe((konten) => { this.konten = konten });
      }
    });
  }

  ngOnInit() {
  }

  /**  Methode zum Aufrufen der Konto-Detailansicht. Hier wird das gewählte Konto per Provider 
   zwischengespeichert und danach auf die Account-Detailsansicht geroutet, wo dieses dann wieder
   abgefragt werden kann.

   @param konto: Konto, das geöffnet werden soll
  */
  openAccount(konto) {
    this.datapassing.account = konto
    this.navCtrl.navigateForward('/account')
  }
}
