import { Component, OnInit } from '@angular/core';
import { Account } from '../core/account';
import { User } from '../core/user';
import { PersistenceService } from '../core/persistence.service';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';

/** Komponente zum Hinzufügen eines neuen Kontos. */
@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.page.html',
  styleUrls: ['./add-account.page.scss'],
})
export class AddAccountPage implements OnInit {

  user: User;
  account: Account;
  balance: number;
  name: string;

  constructor(private persistenceService: PersistenceService, private router: Router, private authService: AuthService) {
    authService.user.subscribe((user) => {
      this.user = user;
    });
  }
  ngOnInit() {
  }

  /**  Methode zum Aufruf des Services, der ein Konto mit den mitgegebenen Parametern in der Datenbank erstellt.
      Danach wird der Benutzer zurück auf die Kontoübersicht geleitet.
  */
  addAccount() {
    this.persistenceService.setAccount(this.user, { name: this.name, balance: this.balance })
    this.router.navigateByUrl("/tabs/(balance:balance)");
  }
}
