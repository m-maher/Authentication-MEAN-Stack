import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

const API = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient, private _router: Router) { }

  register(data):Observable<any>{
    return this._http.post(API  + 'register', data)
  }

  login(data):Observable<any>{
    return this._http.post(API + 'login' , data)
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }

  logoutUser(){
    localStorage.removeItem('token')
    this._router.navigate(['/login'])
  }

  getToken(){
    return localStorage.getItem('token')
  }
}
