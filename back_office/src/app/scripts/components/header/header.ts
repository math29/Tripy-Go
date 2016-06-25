import {Component, Input} from '@angular/core';
import {HeaderNotificationCmp} from './header_notification';
import {SidebarCmp} from '../sidebar/sidebar';
import { RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {AuthService} from '../../tripy-lib/index';

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
