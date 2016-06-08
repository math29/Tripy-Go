import {Component, OnInit} from '@angular/core';
import {AuthService} from './tripy-lib/services/auth.service';
import { HeaderCmp , LoginCmp , HomeCmp, MongoCmp ,
  TimelinesCmp, LogCmp, CountryCmp, LanguageCmp, UsersCmp, TransportTypeCmp, TransportCmp, CompanyCmp,
  TransportComparatorCmp, PromoCmp, MailCmp} from './components.barrell';
import {HTTP_PROVIDERS} from '@angular/http';
import {RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {UserSingleton} from './singletons/user.singleton';

import {LoggedInRouterOutlet} from './LoggedInOutlet';


@Component({
  selector: 'wtc-back',
  templateUrl: 'views/dashboard/main.html',
  providers: [HTTP_PROVIDERS],
  directives: [HeaderCmp, LoginCmp, MongoCmp, LogCmp, TimelinesCmp, CountryCmp, MailCmp, LoggedInRouterOutlet],
  pipes: []
})
@RouteConfig([
  { path: '/login', name: 'Login', component: LoginCmp,useAsDefault: true},
  { path: '/home', name:'Home', component: HomeCmp },
  { path: '/mongo', name: 'Mongo', component: MongoCmp},
  { path: '/countries', name: 'Countries', component: CountryCmp},
  { path: '/company', name: 'Company', component: CompanyCmp},
  { path: '/langues', name: 'Langues', component: LanguageCmp},
  { path: '/logs', name: 'Logs', component: LogCmp},
  { path: '/timelines', name: 'Timelines', component: TimelinesCmp},
  { path: '/transportTypes', name: 'TransportTypes', component: TransportTypeCmp},
  { path: '/transports', name: 'Transports', component: TransportCmp},
  { path: '/transports/comparators', name: 'TransportComparator', component: TransportComparatorCmp},
  { path: '/promos', name: 'Promos', component: PromoCmp},
  { path: '/users', name:'Users', component: UsersCmp},
  { path: '/mailer', name:'Mailer', component: MailCmp}
])
export class Tripy_Back{
  me: any;
  errorMessage: any;

  constructor(private _authService:AuthService, private _router: Router){
    localStorage.setItem('env', 'dev');
  }

  ngOnInit(){
    this._authService.checkJWTValid();
    this._authService.userObservable$.subscribe(updateUser => this.me = updateUser);

  }

}
