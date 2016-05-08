import {Component, Input} from 'angular2/core';
import {HeaderNotificationCmp} from './header_notification';
import {SidebarCmp} from '../sidebar/sidebar';
import {Location, RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {AuthService} from '../../tripy-lib/services/auth.service';

@Component({
  selector: 'header',
  templateUrl: 'views/components/header/main.html',
  providers: [],
  directives: [HeaderNotificationCmp, SidebarCmp],
  pipes: []
})
export class HeaderCmp{
  @Input() user: any;

  constructor(private _authService: AuthService){}

  

}
