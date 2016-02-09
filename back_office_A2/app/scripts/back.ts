import {Component, OnInit} from 'angular2/core';
import {HeaderCmp} from './components/header/header';
import {LoginCmp} from './components/login/login';
import {HomeCmp} from './components/home/home';
import {UserService} from './services/user.service';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Location, RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'wtc-back',
  templateUrl: 'views/dashboard/main.html',
  providers: [HTTP_PROVIDERS, UserService],
  directives: [ROUTER_DIRECTIVES, HeaderCmp, LoginCmp],
  pipes: []
})
@RouteConfig([
  { path: '/login', name: 'Login', component: LoginCmp },
  { path: '/home', name:'Home', component: HomeCmp, useAsDefault: true}
])
export class WTC_Back{

  me: any;
  errorMessage: any;
  constructor(private _userService:UserService, private _router: Router){}

  getMe() {
    this._userService.getMe().subscribe(me => {
      this.me = me;
      console.log("User");
      console.log(me);
    },
                                        error =>  {this.errorMessage = <any>error;
                                        this._router.navigate( ['Login'] );
                                        });
  }

  ngOnInit(){
    this.getMe();
  }

}
