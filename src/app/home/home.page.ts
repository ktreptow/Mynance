import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../core/auth.service'
import {PersistenceService} from '../core/persistence.service';
import {User} from '../core/user';
import {Account} from '../core/account';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [AuthService]
})

export class HomePage {

  private accounts: Account[] = [];
  private user: User;

  constructor(
    private router: Router,
    private authService: AuthService,
    private persistenceService: PersistenceService
  ) {
    console.log(this.router.url);

    const dummyAcc: Account = {
      name: 'Test-Konto',
      balance: 123
    };

    authService.user.subscribe((user: User) => {
      this.user = user;
      if (user !== undefined && user !== null) {
        persistenceService.addAccount(this.user, dummyAcc);
        persistenceService.getAccounts(this.user).subscribe((accounts) => {this.accounts = accounts;});
      }
    });

  }

  signOut() {
    this.authService.signOut();
    this.router.navigateByUrl('/login');
  }
}
