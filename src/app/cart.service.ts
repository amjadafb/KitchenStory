import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

export interface cartProduct {
  product_name: string;
  quantity: number;
  total_product_price: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  list_cart = new BehaviorSubject<cartProduct[]>([]);
  isCurrent = new BehaviorSubject<boolean>(true);
  isPayment = new BehaviorSubject<boolean>(false);
  isReceipt = new BehaviorSubject<boolean>(false);

  constructor() { }
}
