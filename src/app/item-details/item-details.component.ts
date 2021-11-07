import { Component, OnInit } from '@angular/core';
import {DetailsService} from '../details.service';
import {CartService} from '../cart.service';

export interface cartProduct {
  product_name: string;
  quantity: number;
  total_product_price: number;
}

export class cartItem {
  product_name = '';
  quantity = 0;
  total_product_price = 0;
}

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  product_name = '';
  quantity = 0;
  img = '';
  description = '';
  price = 0;
  selected_quantity = '';
  alert = '';
  cart_list: cartProduct[] = []
  alert_style = '';

  // all related data are pulled from the injected details service and cart service
  constructor(private details: DetailsService, private cart: CartService) {
    this.details.product_name.subscribe(product => this.product_name = product);
    this.details.quantity.subscribe(quantity => this.quantity = quantity);
    this.details.img.subscribe(img => this.img = img);
    this.details.description.subscribe(description => this.description = description);
    this.details.price.subscribe(price => this.price = price);
    this.cart.list_cart.subscribe(cart => this.cart_list = cart);
  }

  ngOnInit(): void {
  }

  // function to add items to cart
  AddCart(){
    if (Number(this.selected_quantity) > this.quantity || this.selected_quantity == '') {
      this.alert = 'the desired quintity is empty or more than avaliable';
      this.alert_style = 'alert_fail';

    } else {
      let item = new cartItem()
      item.product_name = this.product_name;
      item.quantity = Number(this.selected_quantity);
      item.total_product_price = Number(this.selected_quantity) * this.price;
      this.cart_list.push(item)
      this.cart.list_cart.next(this.cart_list);
      this.alert = 'item(s) have been added successfully';
      this.alert_style = 'alert_success';
    }
  }
}
