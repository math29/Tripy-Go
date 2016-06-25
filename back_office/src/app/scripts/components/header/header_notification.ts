import {Component} from '@angular/core';
import {AuthService} from '../../tripy-lib/index';
import { RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

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

  constructor(private _authService: AuthService){}


    logout(){
      this._authService.logout();
    }
}
