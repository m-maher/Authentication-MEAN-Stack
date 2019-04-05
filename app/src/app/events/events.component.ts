import { Component, OnInit } from '@angular/core';
import { EventService } from '../service/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events:any = []

  constructor(private _event: EventService) { }

  getEvents(){
    return this._event.getEvents().subscribe(
      (res)=>{
        this.events = res
      },
      (err)=>{
        console.log(err)
      }
    )
  }

  ngOnInit() {
    this.getEvents()
  }

}
