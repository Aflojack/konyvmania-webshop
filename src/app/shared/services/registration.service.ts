import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private regist:AngularFireAuth) { }

  registWithEmailAndPassword(email:string, password:string){
    return this.regist.createUserWithEmailAndPassword(email,password);
  }
}
