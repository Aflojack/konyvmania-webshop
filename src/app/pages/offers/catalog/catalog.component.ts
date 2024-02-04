import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Book } from '../../../shared/models/book';
import { Order } from '../../..//shared/models/order';

import { ImageService } from '../../../shared/services/image.service';
import { OrderDatabaseService } from '../../../shared/services/order-database.service';
import { BookDatabaseService } from '../../../shared/services/book-database.service';
import { UserDatabaseService } from '../../../shared/services/user-database.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit{
  @Output() isOrderEmpty:EventEmitter<boolean>=new EventEmitter();
  books?:Array<Book>;
  actual?:Book;
  index:number;
  loadedImage?:string;

  constructor(private database:BookDatabaseService, private image:ImageService, private orderDatabase:OrderDatabaseService, private userDatabase:UserDatabaseService){
    this.index=0;
  }

  ngOnInit(){
    this.loadArray();
  }

  loadArray(){
    this.database.getAll().subscribe((data:Array<Book>)=>{
      this.books=data;
      this.actual=this.books[0];
      this.loadActual();
    },error=>{
      console.error(error);
    });
  }

  loadImage(){
    this.image.loadImage(this.actual?.isbn+".jpg").subscribe(data=>{
      this.loadedImage=data;
    },error=>{
      console.error(error);
    });
  }

  loadActual(){
    this.actual=this.books![this.index];
    this.loadImage();
  }

  back(){
    if(this.index===0){
      this.index=this.books?.length!-1;
    }else{
      this.index--;
    }
    this.loadActual();
  }

  order(){
    const userEmail=JSON.parse(localStorage.getItem("user") as string).email;
    this.userDatabase.getUser(userEmail).subscribe(data=>{
      const user=data;
      const newOrder:Order={
        orderID:Math.floor((Math.random() * 99999999) + 900000000),
        vezeteknev: user?.vezeteknev!,
        keresztnev:user?.keresztnev!,
        email:user?.email!,
        levelezesiCim:user?.iranyitoszam+" "+user?.varos+" "+user?.utcaEsHazszam!,
        isbn:this.actual?.isbn!,
        ar:this.actual?.ar!
      }
      this.orderDatabase.create(newOrder).then(_=>{
        this.isOrderEmpty.emit(false);
      }).catch(error=>{
        console.error(error);
      })
    },error=>{
      console.error(error);
    });
  }

  next(){
    if(this.index===this.books?.length!-1){
      this.index=0;
    }else{
      this.index++;
    }
    this.loadActual();
  }
}
