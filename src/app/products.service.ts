import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

export interface products {
  id: string;
  product_name : string;
  quantity : number;
  img: string;
  description: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  product_list = new BehaviorSubject<products[]>([]);
  product_list_copy = new BehaviorSubject<products[]>([]);

  constructor(private _http: HttpClient) {
    this._http.get<products[]>('../assets/data/products.json').toPromise().then((data) => {
      this.product_list.next(data);
      this.product_list_copy.next(data);
    })
  }

}
