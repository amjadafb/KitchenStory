import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  product_name = new BehaviorSubject<string>('');
  quantity = new BehaviorSubject<number>(0);
  img = new BehaviorSubject<string>('');
  description = new BehaviorSubject<string>('');
  price = new BehaviorSubject<number>(0);
  constructor() { }
}
