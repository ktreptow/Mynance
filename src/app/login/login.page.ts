import {AuthService} from '../core/auth.service';
import {Component, NgZone} from '@angular/core';
import {NavController} from '@ionic/angular';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  providers: [AuthService]
})
export class LoginPage {

  outputMessage = '';
  currentUser = '';
  inputForm = new FormGroup({
    providers: new FormControl({value: 'google', disabled: false}),
    email: new FormControl({value: '', disabled: false}),
    password: new FormControl({value: '', disabled: false})
  });
  user;

  constructor(public navCtrl: NavController, private ngZone: NgZone, private authService: AuthService) {
    authService.user.subscribe((user) => this.user = user);
  }

  login() {
    console.log(this.user);
    if (this.user) {
      this.outputMessage = 'Already logged in.';
      return;
    }
    switch (this.inputForm.value['providers']) {
      case ('google'): this.signInWithGoogle();
        break;
      case ('email'): this.signInWithEmail();
        break;
      default: break;
    }
  }

  signInWithEmail() {
    const email = this.inputForm.value['email'];
    const password = this.inputForm.value['password'];

    if (email !== '' && password !== '') {
      this.authService.emailLogin(email, password).then(() => this.ngZone.run(() => {
        this.outputMessage = 'Logged in.';
      })).catch((error: firebase.FirebaseError) => this.ngZone.run(() => {
        if (error.code === 'auth/wrong-password') {
          this.outputMessage = 'Login failed';
        }
      }));
    } else {
      this.outputMessage = 'Please enter username and password';
    }
  }

  register() {
    const email = this.inputForm.value['email'];
    const password = this.inputForm.value['password'];

    if (email !== '' && password !== '') {
      this.authService.emailSignup(email, password).then(() => this.ngZone.run(() => {
        this.outputMessage = 'Registered with email ' + email;
      })).catch((error: firebase.FirebaseError) => this.ngZone.run(() => {
        if (error.code === 'auth/email-already-in-use') {
          this.outputMessage = 'An account with this email address already exists.';
        }
      }));
    } else {
      this.outputMessage = 'Please enter username and password';
    }
  }

  signInWithGoogle() {
    this.authService.googleLogin()
      .then(() => this.ngZone.run(() => {
        this.outputMessage = 'Logged in.';
      })
      );
  }

  signOut() {
    if (!this.user) {
      this.outputMessage = 'Not logged in.';
      return;
    }
    this.authService.signOut().then(
      res => this.ngZone.run(() => {
        this.outputMessage = 'Logged out.';
      })
    );
  }
}
