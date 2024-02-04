import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent {
  show:boolean=true;

  showCart(cartEmpty:boolean){
    this.show=!cartEmpty;
  }
}
