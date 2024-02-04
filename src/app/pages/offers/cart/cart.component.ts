import { Component, EventEmitter, OnChanges, Output } from '@angular/core';

import { OrderDatabaseService } from './../../../shared/services/order-database.service';
import { BookDatabaseService } from './../../../shared/services/book-database.service';

import { Order } from '../../../shared/models/order';
import { Book } from '../../../shared/models/book';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnChanges{
  @Output() isOrderEmpty:EventEmitter<boolean>=new EventEmitter();
  orderID=new FormControl('',[Validators.required]);
  orders?:Array<Order>;
  books?:Array<Book>;

  constructor(private orderDatabase:OrderDatabaseService, private bookDatabase:BookDatabaseService){
    this.loadArray();
  }

  ngOnChanges(){
    this.loadArray();
  }

  loadArray(){
    const email=JSON.parse(localStorage.getItem("user") as string).email;
    this.orderDatabase.sameUserOrderSearch(email).subscribe((data:Array<Order>)=>{
      this.orders=data;
      if(this.orders.length===0){
        this.isOrderEmpty.emit(true);
      }else{
        this.isOrderEmpty.emit(false);
      }
      this.bookDatabase.getAll().subscribe(data=>{
        this.books=data;
      },error=>{
        console.error(error);
      })
    },error=>{
      console.error(error);
    });
  }

  getBook(isbn:number){
    try{
      for (let i of this.books!) {
        if(i.isbn===isbn){
          return i;
        }
      }
    }catch(e){

    }
   return null;
  }

  deleteOrder(){
    if(this.orderID.valid){
      this.orderDatabase.delete(this.orderID.value!+"").then(_=>{
        this.loadArray();
      }).catch(error=>{
        console.error(error);
      })
    }
  }
}
