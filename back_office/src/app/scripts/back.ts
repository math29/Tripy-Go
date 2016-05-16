import {Component, OnInit} from 'angular2/core';
import {HeaderCmp} from './components/header/header';
import {LoginCmp} from './+login/index';
import {HomeCmp} from './+home/components/home.component';
import {MongoCmp} from './components/mongo/mongo';
import {TimelinesCmp} from './components/timelines/timelines';
import {LogCmp} from './components/log/log';
import {CountryCmp} from './components/country/country';
import {LanguageCmp} from './components/language/language';
import {UsersCmp} from './components/users/user';
import {AuthService} from './tripy-lib/services/auth.service';
import {TransportTypeCmp} from './components/transportType/transportType';
import {TransportCmp} from './components/transports/transport';
import {CompanyCmp} from './components/company/company';
import {TransportComparatorCmp} from './components/transportComparators/transportComparator';
import {PromoCmp} from './+promo/index';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Location, RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {UserSingleton} from './singletons/user.singleton';

import {LoggedInRouterOutlet} from './LoggedInOutlet';


@Component({
  selector: 'wtc-back',
  templateUrl: 'views/dashboard/main.html',
  providers: [HTTP_PROVIDERS],
  directives: [HeaderCmp, LoginCmp, MongoCmp, LogCmp, TimelinesCmp, CountryCmp, LoggedInRouterOutlet],
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
  { path: '/users', name:'Users', component: UsersCmp}
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
