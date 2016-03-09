import {Component, OnInit} from 'angular2/core';
import {AuthService} from '../../services/auth.service';
import {UserSingleton} from '../../singletons/user.singleton';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Location, RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'login',
  templateUrl: 'views/pages/login.html',
  providers: [AuthService],
  directives: [ROUTER_DIRECTIVES],
  pipes: []
})
export class LoginCmp{
  public errors: any;
  public user: any = {email:"", password:""};
  response: any;

  constructor(private _authService:AuthService, private _router: Router){}

  showData(){
    this._authService.login(this.user)
      .subscribe(response => {
        this.response = response;
        if(this.response.status == 200){
          Cookie.setCookie('token',JSON.parse(this.response._body).token);
          let cookie = Cookie.getCookie('token');
          this._authService.getMe();
          this._router.navigate( ['Home'] );
        }
      }, errors => this.errors = <any>errors);
  }

   ngOnInit(){
      this._authService.userObservable$
        .subscribe(updateUser => {this.user = updateUser;
        UserSingleton.getInstance().setUser(this.user);});
    }
}
