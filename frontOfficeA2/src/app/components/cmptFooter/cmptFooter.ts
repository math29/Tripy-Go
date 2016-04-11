import {Component} from 'angular2/core';
import { ROUTER_DIRECTIVES, Router } from 'angular2/router';

@Component({
	selector: 'cmptFooter',
	templateUrl: 'app/components/cmptFooter/cmptFooter.html',
	styleUrls: ['app/components/cmptFooter/cmptFooter.css'],
	providers: [],
	directives: [ROUTER_DIRECTIVES],
	pipes: []
})
export class CmptFooter {

	constructor(private _router: Router) { }

}
