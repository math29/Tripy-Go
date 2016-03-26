import {Component, Input} from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { AuthService } from '../../../tripy_go_lib/services/auth.service';

@Component({
	selector: 'stepbar',
	templateUrl: 'app/components/header/stepbar/stepbar.html',
	styleUrls: ['app/components/header/stepbar/stepbar.css'],
	providers: [AuthService],
	directives: [ROUTER_DIRECTIVES],
	pipes: [],
	inputs: []
})
export class Stepbar {
	@Input() step;

	constructor(private _auth: AuthService) {
	}
}
