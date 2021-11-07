import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import { Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  username_service = '';
  password_service = '';
  error = false;

  // auth service with routing are injected
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
  }

  // function to login to the system.
  login(){

    this.auth.username.subscribe(username => this.username_service = username);
    this.auth.password.subscribe(password => this.password_service = password);

    if (this.username == this.username_service && this.password == this.password_service) {
          this.auth.isAuthenticated.next(true);
          this.router.navigate(['admin']);
          this.error = false;
          this.auth.login_status.next('Logout');
          this.auth.manage_btn_show.next(true);
    } else {
        this.auth.isAuthenticated.next(false);
        this.error = true;
      }
  }

}
