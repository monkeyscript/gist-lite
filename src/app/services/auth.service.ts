import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";

// User interface 
export interface User {
    uid: string;
    email: string;
    emailVerified: boolean;
 }

@Injectable({
  providedIn: 'root'
})

export class AuthService {
    userState: any;

    constructor(
      public afs: AngularFirestore,
      public afAuth: AngularFireAuth,
      public router: Router,
      public ngZone: NgZone
    ) {

      // Get current auth state 
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.userState = user;
          localStorage.setItem('user', JSON.stringify(this.userState));
          JSON.parse(<string>localStorage.getItem('user'));
        }
      })

    }
  
    //
    // Sign in function 
    //
    SignIn(email:string, password:string) {
      return this.afAuth.signInWithEmailAndPassword(email, password)
        .then((result) => {
          this.ngZone.run(() => {
            this.router.navigate(['home']);
          });
          this.SetUserData(result.user);
        }).catch((error) => {
          window.alert(error.message)
        })
    }
  
    //
    // Sign up function 
    //
    SignUp(email:string, password:string) {
      return this.afAuth.createUserWithEmailAndPassword(email, password)
        .then((result) => {
          this.SendVerificationMail();
          this.SetUserData(result.user);
        }).catch((error) => {
          window.alert(error.message)
        })
    }

    // 
    // Function to trigger email verification 
    //
    SendVerificationMail() {
        return this.afAuth.currentUser.then(u => u!.sendEmailVerification())
        .then(() => {
          this.router.navigate(['email-verification']);
        })
    }    
  
    //
    // Funtion to reset password
    //
    ForgotPassword(passwordResetEmail:string) {
      return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error)
      })
    }
  
    //
    // Check if logged in or not
    //
    get isLoggedIn(): boolean {
      const user = JSON.parse(<string>localStorage.getItem('user'));
      return (user !== null && user.emailVerified !== false) ? true : false;
    }
  
  
    //
    // Set auth data
    //
    SetUserData(user:any) {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
      const userState: User = {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified
      }
      return userRef.set(userState, {
        merge: true
      })
    }
   
    //
    // Sign out function
    //
    SignOut() {
      return this.afAuth.signOut().then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['sign-in']);
      })
    }  
}