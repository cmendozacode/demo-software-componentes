import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirestoreAuthService {
  userData: any; // Save logged in user data

  constructor(public afs: AngularFirestore,public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // Sign in with email/password
  public signIn() {
    return this.afAuth.signInWithEmailAndPassword(environment.emailFirestore, environment.passFirestore);
  }

  public setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: any = {
      uid: user.uid,
      email: user.email
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  public isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Sign out
  public signOut() {
    return this.afAuth.signOut().then(() =>localStorage.removeItem('user'))
  }
}
