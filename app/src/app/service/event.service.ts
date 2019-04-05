import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const API = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private _http: HttpClient) { }

  getEvents(){
    return this._http.get(API + 'events')
  }

  getSpecialEvents(){
    return this._http.get(API + 'special')
  }
}
