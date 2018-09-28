import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service'
import { NavController } from '@ionic/angular';
import { DataPassing } from '../core/datapassing';
import { Transaction } from '../core/transaction';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [AuthService]
})

export class HomePage {

  constructor(
    private router: Router,
    private authService: AuthService,
    public datapassing: DataPassing,
    private navCtrl: NavController
  ) { }

  signOut() {
    this.authService.signOut();
    this.router.navigateByUrl('/login');
  }

  addTransaction(value) {
    if (value == "-") {
      this.datapassing.positive = false;
    } else {
      this.datapassing.positive = true
    }

    this.navCtrl.navigateForward('/addTransaction')
  }
}
