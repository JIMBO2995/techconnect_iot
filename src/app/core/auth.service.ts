import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app'
import { AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore'
import {Observable,of } from 'rxjs';
import  { switchMap,  } from'rxjs/operators';
import  { Md5 } from'ts-md5/dist/md5';

interface User {
  uid: string ;
  email: string ;
  photoURL?: string ;
  displayName?: string
}

@Injectable()
export class AuthService {

  user: Observable<User>; 
  authState: any = null ;

  constructor( private afAuth: AngularFireAuth,
               private afs: AngularFirestore,
               private router: Router
              ) {
                
                  this.user = this.afAuth.authState
                  .pipe(
                  switchMap(user => {
                    if (user) {
                      return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
                    } else {
                      return of(null);
                    }
                  }));
                  this.afAuth.authState.subscribe(data=>this.authState = data)
                }

       get authenticated():boolean {
            return this.authState !== null; 
       }

       get currentUserId(): string {
         return this.authenticated ? this.authState.uid : null ;
       }
      emailSignIn( email: string, password: string){
       return this.afAuth.auth.signInWithEmailAndPassword( email, password)
              .then( () => {
                console.log(" you have successfully logged in");
                
              })
              .catch( error => console.log(  error.message ))
               }

      emailSignUp( email: string, password: string){
        return this.afAuth.auth
                .createUserWithEmailAndPassword( email, password)
                .then( data => this.updateUserData(data.user)
                .then( () => console.log(" Welcome to NG Fire")) )
                .then(() => {this.afAuth.auth.currentUser
                .sendEmailVerification()
                .then(() => console.log("We sent you an email verification"))
                .catch(error => console.log(error.message));
                })
                .catch(error => console.log(error.message));
      }

      resetPassword(email: string){
        return firebase.auth().sendPasswordResetEmail(email)
        .then( () => console.log(" password reset sent "))
        .catch( error => console.log(error.message))
      }

       private updateUserData(user:User){
               const userRef: AngularFirestoreDocument<User> = 
               this.afs.doc(`users/${user.uid}`)
               const data: User = {
                 uid: user.uid, 
                 email: user.email || null,
                 displayName: user.displayName,
                 photoURL: user.photoURL || "http://www.gravatar.com/avatar/" + Md5.hashStr(user.uid) + '?d=identicon'
                 }
                 return userRef.set( data, { merge: true})  
       }

       socialLogin(provider){
         return this.afAuth.auth.signInWithRedirect(provider)
                .then( () => {
                  return this.afAuth.auth.getRedirectResult()
                  .then( result => {
                  //let token = result.credential.accessToken;
                  let user = result.user;
                  console.log(user);
                })
                .catch( error => { console.log( error.message )})
              })
            }

        signOut(){
          return this.afAuth.auth.signOut()
                 .then( () => {this.router.navigate(['/'])})
        }
        
        googleLogin(){
          const provider = new firebase.auth.GoogleAuthProvider();
          return this.socialLogin(provider); 
        }

        
        
}
