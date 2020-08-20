import {first, switchMap} from 'rxjs/operators'
import { Injectable } from '@angular/core';

import {AngularFireAuth} from '@angular/fire/auth';
//import {User} from 'firebase';
import {User} from '../Modelos/Usuario';

import {RoleValidator} from '../Modelos/RoleValidatos';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthSerService extends RoleValidator {
// user:User;
 public user$: Observable<User>;
  constructor(public afAuth:AngularFireAuth) { 
    super();
    /*
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`clientes/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );*/
  }
  async login(email:string,pass:string){
    try {
      const { user } =await this.afAuth.auth.signInWithEmailAndPassword(email,pass);
    return user;
    } catch (error) {
      console.log(error);
    }
    
  }
  async sendVerificationEmail(): Promise<void> {
    return (await this.afAuth.auth.currentUser).sendEmailVerification();
  }

  async register(email:string,pass:string){
    try {
      const {user}=await this.afAuth.auth.createUserWithEmailAndPassword(email,pass);
      return user;
    } catch (error) {
      console.log(error);
    }
   
  }
  async logout(){
    try {
      await this.afAuth.auth.signOut();
    } catch (error) {
      console.log(error);
    }
    
  }
  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.auth.sendPasswordResetEmail(email);
      
    } catch (error) {
      console.log(error);
    }
  }
  async eliminarUsuario(email: string): Promise<void> {
    try {
      //return this.afAuth.auth.deleteUser('');
      
    } catch (error) {
      console.log(error);
    }
  }
  getCurrentUser(){
    return this.afAuth.authState.pipe(first()).toPromise();
  }
  
}
