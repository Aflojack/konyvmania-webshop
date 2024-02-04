import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderDatabaseService {
  collectionName="Orders";

  constructor(private database:AngularFirestore) { }

  create(order:Order){
    return this.database.collection<Order>(this.collectionName).doc(order.orderID+"").set(order);
  }

  get(email:string){
    return this.database.collection<Order>(this.collectionName).get()
  }

  sameUserOrderSearch(email:string){
    return this.database.collection<Order>(this.collectionName,ref=>ref.where('email','==',email)).valueChanges();
  }

  delete(orderID:string){
    return this.database.collection<Order>(this.collectionName).doc(orderID).delete();
  }
}
