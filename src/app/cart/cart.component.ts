import { Component, OnInit } from '@angular/core';
import {CartService} from '../cart.service';

export interface cartProduct {
  product_name: string;
  quantity: number;
  total_product_price: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart_list: cartProduct[] = []
  total_price = 0;
  current_cart = true;
  payment = false;
  receipt = false;

  // data are pulled from cart service and total price is calculated
  constructor(private cart: CartService) {
    this.cart.list_cart.subscribe(cart => this.cart_list = cart);
    this.cart_list.forEach((counter)=>{
      this.total_price = this.total_price + counter.total_product_price;
    })
    this.cart.isCurrent.subscribe(current => this.current_cart = current);
    this.cart.isPayment.subscribe(payment => this.payment = payment);
    this.cart.isReceipt.subscribe(receipt => this.receipt = receipt);
  }

  ngOnInit(): void {
  }

  // function to navigate to payment
  goPayment()
  {
      this.current_cart = false;
      this.payment = true;
      this.receipt = false;
  }

  // function to navigate to receipt
  goRecipt()
  {
    this.current_cart = false;
    this.payment = false;
    this.receipt = true;
  }

  // function to clear the cart from values
  clear_cart()
  {
    this.cart_list = [];
    this.total_price = 0;
    this.cart.list_cart.next([]);
  }

  // function to get the current date
  getDate()
  {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    return  dd + '/' + mm + '/' + yyyy;
  }

  // function to get the total price with VAT included
  getVAT()
  {
    let VAT = (this.total_price / 100) * 15;
    let total_vat = this.total_price + VAT
    return total_vat.toString()
  }

  // function to get the VAT only without the total price
  getVAT_only ()
  {
    let VAT = (this.total_price / 100) * 15;
    return VAT.toString()
  }

}
