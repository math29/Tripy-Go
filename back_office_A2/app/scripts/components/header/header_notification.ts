import {Component} from 'angular2/core';
import {AuthService} from '../../services/auth.service';
import {Location, RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'header-notification',
  templateUrl: 'views/components/header/header-notification.html',
  providers: [AuthService],
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
