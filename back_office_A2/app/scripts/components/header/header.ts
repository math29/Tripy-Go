import {Component} from 'angular2/core';
import {HeaderNotificationCmp} from './header_notification';
import {SidebarCmp} from '../sidebar/sidebar';
import {Location, RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'header',
  templateUrl: 'views/components/header/main.html',
  providers: [],
  directives: [ROUTER_DIRECTIVES, HeaderNotificationCmp, SidebarCmp],
  pipes: [],
  inputs: ['user']
})
export class HeaderCmp{
  public user: any;


}
