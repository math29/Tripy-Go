import {Component, OnInit} from '@angular/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import {RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {AuthService} from './../../tripy-lib/services/auth.service';


@Component({
  selector: 'login',
  templateUrl: 'views/pages/login.html',
  providers: [],
  directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES, CORE_DIRECTIVES, RouterLink],
  pipes: []
})
export class LoginCmp{
  public errors: any;
  public user: any = {email:"", password:""};
  response: any;

  constructor(private _authService:AuthService, private _router: Router){
    this._authService.checkJWTValid();
    if(this._authService.getMe()){
      this._router.navigate( ['Home'] );
    }
  }

  /**
   * Used to login the user
   */
  login(){
    this._authService.login(this.user);
  }

}
