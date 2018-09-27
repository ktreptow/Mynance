<<<<<<< HEAD
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../core/auth.service'
import {PersistenceService} from '../core/persistence.service';
=======
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service'
>>>>>>> master

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [AuthService]
})

export class HomePage {

<<<<<<< HEAD
  private accounts: Account[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private persistenceService: PersistenceService
  ) {
  

  }
=======
  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }
>>>>>>> master

  signOut() {
    this.authService.signOut();
    this.router.navigateByUrl('/login');
  }
}
