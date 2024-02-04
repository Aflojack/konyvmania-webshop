import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private auth:AngularFireAuth) { }

  loginWithEmailAndPassword(email: string, password:string){
    return this.auth.signInWithEmailAndPassword(email,password);
  }

  isUserLoggedIn() {
    return this.auth.user;
  }

  logout() {
    return this.auth.signOut();
  }
}
