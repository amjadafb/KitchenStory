import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {ItemDetailsComponent} from './item-details/item-details.component';
import {CartComponent} from './cart/cart.component';
import {AppComponent} from "./app.component";
import {AdminComponent} from './admin/admin.component';
import {AdminGuard} from "./admin.guard";

const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'login', component: LoginComponent},
  {path: 'details', component: ItemDetailsComponent},
  {path: 'cart', component: CartComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    enableTracing: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
