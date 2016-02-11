import {Component, OnInit} from 'angular2/core';
import {HeaderCmp} from './components/header/header';
import {LoginCmp} from './components/login/login';
import {HomeCmp} from './components/home/home';
import {MongoCmp} from './components/mongo/mongo';
import {UserService} from './services/user.service';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Location, RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'wtc-back',
  templateUrl: 'views/dashboard/main.html',
  providers: [HTTP_PROVIDERS, UserService],
  directives: [ROUTER_DIRECTIVES, HeaderCmp, LoginCmp, MongoCmp],
  pipes: []
})
@RouteConfig([
  { path: '/login', name: 'Login', component: LoginCmp },
  { path: '/home', name:'Home', component: HomeCmp, useAsDefault: true},
  { path: '/mongo', name: 'Mongo', component: MongoCmp},
  { path: '/countries', name: 'Countries', component: HomeCmp},
  { path: '/langues', name: 'Langues', component: HomeCmp},
  { path: '/logs', name: 'Logs', component: HomeCmp},
  { path: '/timelines', name: 'Timelines', component: HomeCmp}
])
export class WTC_Back{
  lastRoute: string = 'home';
  me: any;
  errorMessage: any;
  constructor(private _userService:UserService, private _router: Router){
    _router.subscribe((val) => {
      if(this.lastRoute == 'login'){
        this.getMe();
      }
      this.lastRoute = val;
    })
  }

  getMe() {
    this._userService.getMe().subscribe(me => {
      this.me = me;
      this.me= JSON.parse(this.me._body);
    },
                                        error =>  {this.errorMessage = <any>error;
                                        this._router.navigate( ['Login'] );
                                        });
  }

  ngOnInit(){
    this.getMe();
  }

}
