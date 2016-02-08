import {Component} from 'angular2/core';
import {Location, RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'header-notification',
  templateUrl: 'views/components/header/header-notification.html',
  providers: [],
  directives: [ROUTER_DIRECTIVES],
  pipes: [],
  inputs: ["user"]
})
export class HeaderNotificationCmp{
  public user:any;
}
