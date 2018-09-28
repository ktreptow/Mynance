import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from './user';

@Injectable()
export class AuthService {

  user: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private gp: GooglePlus,
    private platform: Platform,
    private router: Router
  ) {

    // Wenn ein Nutzer angemeldet ist, wird user ein Observable dieses Nutzer-Objekts, ansonsten ein Observable von null
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  /**
   * Mit Email und Passwort registrieren
   * @param email
   *    Nutzer-Email
   * @param password
   *    Nutzer-Passwort
   */
  emailSignup(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((credential) => {
      this.updateUserData(credential.user);
    });
  }

  /**
   * Login mit Email und Passwort
   * @param email
   *    Nutzer-Email
   * @param password
   *    Nutzer-Passwort
   */
  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
  
  /**
   * Aktualisiert die in Firebase gespeicherten Nutzerdaten
   * @param user
   *    Nutzer-Objekt
   */
  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    return userRef.set(data, { merge: true });

  }


  /**
   * Momentan angemeldeter Nutzer wird ausgeloggt.
   */
  signOut() {
    return this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}
