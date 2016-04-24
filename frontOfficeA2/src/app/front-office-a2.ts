import {Component, OnInit} from 'angular2/core';

import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';

import {LoggedInRouterOutlet} from './LoggedInOutlet';
import { AuthService } from './tripy_go_lib/services/auth.service';

// Import Components
import { Header } from './components/header/header';
import { CmptFooter } from './components/cmptFooter/cmptFooter';
import { Login } from './components/account/login/login';
import { Signup } from './components/account/signup/signup';
import { Main } from './components/main/main';
import { AboutUs } from './components/team/about-us/about-us';
import { Contact } from './components/team/contact/contact';
import { Profile } from './components/account/profile/profile';
import { ListingPropositions } from './components/steps/transport/listingPropositions/listingPropositions';
import { Research } from './components/steps/transport/research/research';

@Component({
  selector: 'front-office-a2-app',
  templateUrl: 'app/front-office-a2.html',
  providers: [HTTP_PROVIDERS],
  directives: [Header, CmptFooter, LoggedInRouterOutlet, ROUTER_DIRECTIVES],
  pipes: []
})
@RouteConfig([
	// { path: '/', component: Start },
	{ path: '/', component: Main, name: 'Home'},
	{ path: '/about-us', component: AboutUs, name: 'AboutUs' },
	{ path: '/contact', component: Contact, name: 'Contact' },
	{ path: '/login', component: Login, name: 'Login' },
	{ path: '/signup', component: Signup, as: 'Signup' },
	{ path: '/profile', component: Profile, as: 'Profile' },
	{ path: '/transport/listing/:id', component: ListingPropositions, name: 'ListingPropositionsComparatorsTransport' },
	{ path: '/transport/research/:comparator_id/:travel_id', component: Research, name: 'ResearchTransport' }
])
export class FrontOfficeA2App {

	constructor(private _auth: AuthService) {
	}

	ngOnInit() {
		this._auth.checkJWTValid();
	}
}
