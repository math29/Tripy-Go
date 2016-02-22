import {Component} from 'angular2/core';

import { RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import { Login } from './components/account/login/login';
import { Main } from './components/main/main';

import {LoggedInRouterOutlet} from './LoggedInOutlet';

@Component({
  selector: 'front-office-a2-app',
  providers: [],
  templateUrl: 'app/front-office-a2.html',
  directives: [ROUTER_DIRECTIVES],
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
