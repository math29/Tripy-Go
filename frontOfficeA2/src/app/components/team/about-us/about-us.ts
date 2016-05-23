import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router-deprecated';

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
