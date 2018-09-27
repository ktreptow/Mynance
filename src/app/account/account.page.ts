import { Component, OnInit } from '@angular/core';
import { Account } from '../core/account';
import { User } from '../core/user';
import { PersistenceService } from '../core/persistence.service';
import { AuthService } from '../core/auth.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  accounts: Account[] = [];
  user: User;
  account: Account

  constructor(private persistenceService: PersistenceService, private authService: AuthService) {
    authService.user.subscribe((user) => {
      this.user = user;
      // if (user) {
      //   persistenceService.getAccounts(user).subscribe((accounts) => { this.accounts = accounts });
      // }
    });
  }

  ngOnInit() {
  }

}
