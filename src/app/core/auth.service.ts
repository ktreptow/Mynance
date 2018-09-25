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

    //// Get auth data, then get firestore user document || null
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

  emailSignup(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((credential) => {
      this.updateUserData(credential.user);
    });
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then((credential) => {
      this.updateUserData(credential.user);
    });
  }

  async googleLogin() {
    if (this.platform.is('android')) {
      try {
        const gplusUser = await this.gp.login({
          'webClientId': '287945334174-6ob999bpcpp8c55vpbh1fglurn8q2b1f.apps.googleusercontent.com',
          'offline': true,
          'scopes': 'profile email'
        });
        return await this.afAuth.auth.signInWithCredential(auth.GoogleAuthProvider.credential(gplusUser.idToken)).then((user) => {
          this.updateUserData(user);
        });
      } catch (err) {
        console.log('Error: ', err);
      }
    } else {
      const provider = new auth.GoogleAuthProvider();
      return this.oAuthLogin(provider);
    }
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user);
      });
  }


  private updateUserData(user) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    return userRef.set(data, { merge: true });

  }


  signOut() {
    return this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}
