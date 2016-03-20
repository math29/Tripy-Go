import {Component, OnInit} from 'angular2/core';
import { ROUTER_DIRECTIVES, Router } from 'angular2/router';

import { AuthService } from '../../tripy_go_lib/auth.service'
import { Stepbar } from './stepbar/stepbar';

@Component({
	selector: 'header',
	templateUrl: 'app/components/header/header.html',
	styleUrls: ['app/components/header/header.css'],
	providers: [AuthService],
	directives: [ROUTER_DIRECTIVES, Stepbar],
	pipes: []
})
export class Header {
	routesStepBar: any;
	step: number = 0;
	_router: Router;

	constructor(private _auth: AuthService, _router: Router) {
		this._router = _router;
	}

	ngOnInit() {
		this.routesStepBar = {
			'letsStarted': 1,
			'star_with': 2
		};

		this._router.subscribe((path) => {
			if (this.routesStepBar[path]) this.step = this.routesStepBar[path];
			else this.step = 0;
		});
	}
}
