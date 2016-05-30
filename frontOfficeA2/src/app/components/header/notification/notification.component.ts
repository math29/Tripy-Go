import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'notification',
    templateUrl: 'app/components/header/notification/notification.component.html',
    directives: [],
    providers: [],
    styleUrls: [],
    pipes: []
})

export class NotificationCmp implements OnInit, OnDestroy {
  @Input() notification: any;

  constructor() {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
