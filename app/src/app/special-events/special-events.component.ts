import { Component, OnInit } from '@angular/core';
import { EventService } from '../service/event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent implements OnInit {

  specialEvents:any = []

  constructor(private _event: EventService, private _router: Router) { }

  getSpecialEvents(){
    return this._event.getSpecialEvents().subscribe(
      (res)=>{
        this.specialEvents = res
      },
      (err)=>{
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this._router.navigate(['/login'])
          }
        }
      }
    )
  }

  ngOnInit() {
    this.getSpecialEvents()
  }

}
