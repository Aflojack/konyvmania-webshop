import { Injectable } from '@angular/core';
import { Review } from '../models/review';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CommentDatabaseService {
  collectionName:string="Review";

  constructor(private database:AngularFirestore) { }


  create(review:Review){
    return this.database.collection<Review>(this.collectionName).doc(review.felhasznalonev).set(review);
  }

  getAll() {
    return this.database.collection<Review>(this.collectionName).valueChanges();
  }
}
