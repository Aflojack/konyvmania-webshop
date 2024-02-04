import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserDatabaseService {
  collectionName="Users";

  constructor(private database:AngularFirestore) { }

  create(user:User){
    return this.database.collection<User>(this.collectionName).doc(user.email).set(user);
  }

  getUser(email:string){
    return this.database.collection<User>(this.collectionName).doc(email).valueChanges();
  }
}
