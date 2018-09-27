import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [AuthService]
})

export class HomePage {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    console.log(this.router.url);
  }

  signOut() {
    this.authService.signOut();
    this.router.navigateByUrl('/login');
  }
}
