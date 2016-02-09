import {Component} from 'angular2/core';
import {UserService} from '../../services/user.service';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Location, RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'login',
  templateUrl: 'views/pages/login.html',
  providers: [UserService],
  directives: [ROUTER_DIRECTIVES],
  pipes: []
})
export class LoginCmp{
  public errors: any;
  public user: any = {email:"", password:""};
  response: any;

  constructor(private _userService:UserService, private _router: Router){}

  showData(){
    this._userService.login(this.user)
      .subscribe(response => {
        this.response = response;
        if(this.response.status == 200){
          Cookie.setCookie('token',JSON.parse(this.response._body).token);
          let cookie = Cookie.getCookie('token');
          this._router.navigate( ['Home'] );
        }
      }, errors => this.errors = <any>errors);
  }
}
