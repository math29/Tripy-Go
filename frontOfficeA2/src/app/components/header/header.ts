import {Component, OnInit} from 'angular2/core';
import { ROUTER_DIRECTIVES, Router } from 'angular2/router';

import { AuthService } from '../../tripy_go_lib/services/auth.service'
import { Stepbar } from './stepbar/stepbar';

@Component({
	selector: 'header',
	templateUrl: 'app/components/header/header.html',
	styleUrls: ['app/components/header/header.css'],
	providers: [],
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
		this.routesStepBar = [
			'transport/listing',
			'transport/research'
		];

		// Un peu forcé malgé moi de faire ce petit parcours des différentes routes qui composent notre stepbar
		// JE vérifie pour chacune d'entre elles si elle est contenu dans la route actuelle (gère par la même occasion le cas où nous aurions des paramètres)
		this._router.subscribe((path) => {
			this.step = 0;
			for (let i = 0; i < this.routesStepBar.length; i++){
				if (path.indexOf(this.routesStepBar[i]) > -1)
					this.step = i+1;
			}
		});
	}
}
