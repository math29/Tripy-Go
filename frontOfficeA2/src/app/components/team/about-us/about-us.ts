import {Component} from 'angular2/core';
import { ROUTER_DIRECTIVES, Router } from 'angular2/router';

@Component({
	selector: 'header',
	templateUrl: 'app/components/team/about-us/about-us.html',
	// styleUrls: ['app/components/team/header.css'],
	providers: [],
	directives: [ROUTER_DIRECTIVES],
	pipes: []
})
export class AboutUs {
	constructor(private _router: Router) {
	}
}
