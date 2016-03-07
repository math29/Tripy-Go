import {Component, OnInit} from 'angular2/core';
import {HeaderCmp} from './components/header/header';
import {LoginCmp} from './components/login/login';
import {HomeCmp} from './components/home/home';
import {MongoCmp} from './components/mongo/mongo';
import {TimelinesCmp} from './components/timelines/timelines';
import {LogCmp} from './components/log/log';
import {CountryCmp} from './components/country/country';
import {LanguageCmp} from './components/language/language';
import {AuthService} from './services/auth.service';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Location, RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {UserSingleton} from './singletons/user.singleton';

@Component({
  selector: 'wtc-back',
  templateUrl: 'views/dashboard/main.html',
  providers: [HTTP_PROVIDERS, AuthService],
  directives: [ROUTER_DIRECTIVES, HeaderCmp, LoginCmp, MongoCmp, LogCmp, TimelinesCmp, CountryCmp],
  pipes: []
})
@RouteConfig([
  { path: '/login', name: 'Login', component: LoginCmp },
  { path: '/home', name:'Home', component: HomeCmp, useAsDefault: true},
  { path: '/mongo', name: 'Mongo', component: MongoCmp},
  { path: '/countries', name: 'Countries', component: CountryCmp},
  { path: '/langues', name: 'Langues', component: LanguageCmp},
  { path: '/logs', name: 'Logs', component: LogCmp},
  { path: '/timelines', name: 'Timelines', component: TimelinesCmp}
])
export class WTC_Back{
  lastRoute: string = 'home';
  me: any;
  errorMessage: any;
  userSingleton: UserSingleton;

  constructor(private _authService:AuthService, private _router: Router){
    this.userSingleton = UserSingleton.getInstance();
    _router.subscribe((val) => {
      if(this.lastRoute == 'login'){
      }
      this.lastRoute = val;
    })
    if(!this.me){
        this._router.navigate( ['Login'] );
    }
  }

  ngOnInit(){
    this.userSingleton.userObservable$.subscribe(updateUser => {this.me = updateUser;});
  }

}
