import {Component} from 'angular2/core';

import { RouteConfig, Router} from 'angular2/router';
import { Login } from './components/account/login/login';
import { Signup } from './components/account/signup/signup';
import { Main } from './components/main/main';

import {LoggedInRouterOutlet} from './LoggedInOutlet';

// Import Components
import { Header } from './components/header/header';
import {CmptFooter} from './components/cmptFooter/cmptFooter'

@Component({
  selector: 'front-office-a2-app',
  templateUrl: 'app/front-office-a2.html',
  providers: [],
  directives: [Header, CmptFooter, LoggedInRouterOutlet],
  pipes: []
})
@RouteConfig([
	// { path: '/', component: Start },
	{ path: '/', component: Main, name: 'Home'},
	{ path: '/login', component: Login, name: 'Login' },
	{ path: '/signup', component: Signup, as: 'Signup' },
])
export class FrontOfficeA2App {

	constructor(private _router: Router) {
	}
}
