import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookDatabaseService {
  collectionName:string="Books";

  constructor(private database:AngularFirestore) { }

  getAll(){
    return this.database.collection<Book>(this.collectionName).valueChanges();
  }

  get(isbn:number){
    return this.database.collection<Book>(this.collectionName).doc(isbn+"").valueChanges();
  }
}
