import {Component} from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { AuthService } from '../../tripy_go_lib/auth.service'

@Component({
	selector: 'header',
	templateUrl: 'app/components/header/header.html',
	styleUrls: ['app/components/header/header.css'],
	providers: [AuthService],
	directives: [ROUTER_DIRECTIVES],
	pipes: []
})
export class Header {

	constructor(private _authService:AuthService) { }

	// isLoggedIn() {
	// 	if (this._authService.isLoggedIn()){
	// 		return true;
	// 	}
	// }
}
