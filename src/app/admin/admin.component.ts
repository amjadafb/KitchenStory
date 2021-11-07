import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../products.service";
import {AuthService} from '../auth.service';

export interface products {
  id: string;
  product_name : string;
  quantity : number;
  img: string;
  description: string;
  price: number
}

export class product_class {
  id = '';
  product_name = '';
  quantity = 0;
  img = '';
  description = '';
  price = 0;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  products: products[] = [];
  products_copy : products[] = [];
  is_manage = true;
  is_create = false;
  is_settings = false;
  product_name = '';
  quantity = 0;
  img = '';
  description = '';
  price = 0;
  success = false;
  change_message = '';
  password_check_style = '';
  password_show_check = false;
  old_password = '';
  new_password = '';
  password_service = '';

  // product service with auth service are injected
  constructor(private product: ProductsService, private auth: AuthService) {
    this.product.product_list.subscribe(products => this.products = products);
    this.product.product_list_copy.subscribe(products_copy => this.products_copy = products_copy);
  }

  ngOnInit(): void {
  }

  // function to remove an item from product list
  remove(index: number)
  {
    if (index > -1) {
      this.products.splice(index, 1);
    }
  }

  // function to navigate to manage page
  manage()
  {
    this.is_manage = true;
    this.is_create = false;
    this.is_settings = false;
  }

  // function to navigate to create page
  create()
  {
    this.is_manage = false;
    this.is_create = true;
    this.is_settings = false;
  }

  // function to crate a new item and append it to the list
  create_item()
  {
    let item = new product_class();
    item.id = '100';
    item.product_name = this.product_name;
    item.description = this.description;
    item.img = this.img;
    item.price = this.price;
    item.quantity = this.quantity;
    this.products.push(item);
    this.success = true;
    setTimeout(()=>{
          this.success = false;
      }, 3000);
  }

  // function to navigate to setting page
  settings()
  {
    this.is_manage = false;
    this.is_create = false;
    this.is_settings = true;
  }

  // function to change the password of the admin user
  change_password()
  {
    this.auth.password.subscribe(password => this.password_service = password);
    if ( this.old_password == this.password_service) {
        this.auth.password.next(this.new_password);
        this.change_message = 'Password changed successfully'
        this.password_check_style = 'alert_success';
        this.password_show_check = true;
        setInterval(() =>{
          this.password_show_check = false;
          }, 5000);
    } else {
      this.change_message = 'The password does not match '
      this.password_check_style = 'alert_fail';
      this.password_show_check = true;
      setInterval(() =>{
        this.password_show_check = false;
      }, 5000);
    }
  }
}
