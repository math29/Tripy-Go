import {Component} from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

@Component({
	selector: 'header',
	templateUrl: 'app/components/header/header.html',
	styleUrls: ['app/components/header/header.css'],
	providers: [],
	directives: [ROUTER_DIRECTIVES],
	pipes: []
})
export class Header {

	constructor() { }

}
