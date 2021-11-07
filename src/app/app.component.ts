import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service"
import {ProductsService} from "./products.service";
import { Router} from "@angular/router";
import { Event as NavigationEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavigationStart } from '@angular/router';
import {DetailsService} from './details.service';
import {CartService} from "./cart.service";


export interface products {
  id: string;
  product_name : string;
  quantity : number;
  img: string;
  description: string;
  price: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  products: products[] = [];
  products_copy : products[] = [];
  isHome = true;
  isOthers = false;
  search_value = '';
  login_status = '';
  manage_btn_show = false;

  // calling the product list from a service
  // doing all the stuff relating to displaying and hiding when authenticating
  // doing the routing events to interact with browser's back and forward
  constructor(private _http: HttpClient, private auth: AuthService, private product: ProductsService,
              private router: Router, private details: DetailsService, private cart: CartService) {
    this.product.product_list.subscribe(products => this.products = products);
    this.product.product_list_copy.subscribe(products_copy => this.products_copy = products_copy);
    this.auth.login_status.subscribe(login => this.login_status = login);
    this.auth.manage_btn_show.subscribe(btn => this.manage_btn_show = btn);
    router.events
      .pipe(
        filter(
          ( event: NavigationEvent ) => {
            return( event instanceof NavigationStart );
          }
        )
      )
    ;
  }
  ngOnInit() {
  }

  // function to navigate to login page
  goLogin() {

    if (this.login_status == 'Login') {
      this.isHome = false;
      this.isOthers = true;
      this.router.navigate(['/login']);
    } else if (this.login_status == 'Logout') {
      this.isHome = false;
      this.isOthers = true;
      this.auth.isAuthenticated.next(false);
      this.router.navigate(['/login']);
      this.auth.login_status.next('Login');
      this.auth.manage_btn_show.next(false);
    }
  }

  // function to navigate to details page
  goDetails(data: products) {
    this.isHome = false;
    this.isOthers = true;
    this.details.description.next(data.description);
    this.details.img.next(data.img);
    this.details.product_name.next(data.product_name)
    this.details.quantity.next(data.quantity);
    this.details.price.next(data.price);
    this.router.navigate(['/details']);
  }

  // function to navigate to cart page
  goCart() {
    this.isHome = false;
    this.isOthers = true;
    this.cart.isCurrent.next(true);
    this.cart.isPayment.next(false);
    this.cart.isReceipt.next(false);
    this.router.navigate(['/cart']);
  }

  // function to navigate to home page
  goHome() {
    this.isHome = true;
    this.isOthers = false;
    this.router.navigate(['']);
  }

  // function to filter the search bar based on the input
  search()
  {
    if (this.search_value == '')
    {
      this.products = this.products_copy;
    } else {
        this.products = this.products.filter((response)=> {
        return response.product_name.toLowerCase().match(this.search_value.toLowerCase())
      })
    }
  }

  // function to navigate to admin page when logged in
  goManage() {
    this.isHome = false;
    this.isOthers = true;
    this.router.navigate(['/admin']);
  }
}
