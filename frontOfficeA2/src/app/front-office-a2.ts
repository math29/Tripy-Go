import {Component} from 'angular2/core';

import { RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import { Login } from './components/account/login/login';
import { Main } from './components/main/main';

import {LoggedInRouterOutlet} from './LoggedInOutlet';

import { Header } from './components/header/header';
import {CmptFooter} from './components/cmptFooter/cmptFooter'

@Component({
  selector: 'front-office-a2-app',
  providers: [],
  templateUrl: 'app/front-office-a2.html',
  directives: [ROUTER_DIRECTIVES, Header, CmptFooter],
  pipes: []
})
@RouteConfig([
	// { path: '/', component: Start },
	{ path: '/', component: Main, name: 'Home'},
	{ path: '/login', component: Login, name: 'Login' },
	// { path: '/signup', component: Signup, as: 'Signup' }
])
export class FrontOfficeA2App {

}
