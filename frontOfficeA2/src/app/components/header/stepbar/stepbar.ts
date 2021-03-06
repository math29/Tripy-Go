import {Component, Input} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { AuthService } from '../../../tripy_go_lib/services/auth.service';

@Component({
	selector: 'stepbar',
	templateUrl: 'app/components/header/stepbar/stepbar.html',
	styleUrls: ['app/components/header/stepbar/stepbar.css'],
	providers: [],
	directives: [ROUTER_DIRECTIVES],
	pipes: [],
	inputs: []
})
export class Stepbar {
	@Input() step;

	constructor(private _auth: AuthService) {
	}
}
