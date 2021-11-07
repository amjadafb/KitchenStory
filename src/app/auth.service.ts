import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";


export interface  Users {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  isAuthenticated = new BehaviorSubject<boolean>(false);
  username = new BehaviorSubject<string>('');
  password = new BehaviorSubject<string>('');
  login_status = new BehaviorSubject<string>('Login');
  manage_btn_show = new BehaviorSubject<boolean>(false);

  constructor(private _http: HttpClient) {
    this._http.get<Users>('../assets/data/users.json').toPromise().then((data) => {
      this.username.next(data.username);
      this.password.next(data.password);
    })
  }
}
