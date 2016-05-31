import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { TravelService } from '../../travelPage/services/travel.service';

@Component({
    selector: 'notification',
    templateUrl: 'app/components/header/notification/notification.component.html',
    directives: [],
    providers: [ TravelService],
    styleUrls: [],
    pipes: []
})

export class NotificationCmp implements OnInit, OnDestroy {
  @Input() notification: any;

  constructor(private travelService: TravelService) {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  acceptTravel(travel_id : string) : void{
    this.travelService.replyTravel(true, travel_id)
      .subscribe(success => {

      }, error => {

      });
  }

  rejectTravel(travel_id : string) {
    this.travelService.replyTravel(false, travel_id)
      .subscribe(success => {

      }, error => {

      });
  }
}
