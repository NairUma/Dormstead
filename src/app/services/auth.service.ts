import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from './user.model'
import * as firebase from 'firebase';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`Users/${user.uid}`).valueChanges();
        } else {
          //user not defined
          return of(null);
        }
      })
    );
  }

  async login() {
    const credential = await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
    return this.updateUserData(credential.user);
  }

  async logout() {
    await this.afAuth.signOut();
    return this.router.navigate(['/']);
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`Users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      diplayName: user.displayName,
      photoURL: user.photoURL
    };

    return userRef.set(data, { merge: true });
  }

}


