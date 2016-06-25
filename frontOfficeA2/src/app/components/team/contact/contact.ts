import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router-deprecated';
import { SocialMedias } from '../../socialMedias/socialMedias';

@Component({
	selector: 'header',
	templateUrl: 'app/components/team/contact/contact.html',
	// styleUrls: ['app/components/team/header.css'],
	providers: [],
	directives: [ROUTER_DIRECTIVES, SocialMedias],
	pipes: []
})
export class Contact {
	constructor(private _router: Router) {
	}
}
