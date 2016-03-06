import {Component} from 'angular2/core';
import { ROUTER_DIRECTIVES, Router } from 'angular2/router';
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
	user: any;

	constructor(private _auth: AuthService, private _router: Router) {
		console.log(_auth.getMe());
	}

	ngOnInit() {
		// this._router.subscribe((val) => function(val){
		// 	console.log(val);
		// 	if (val == "" && this._authService.isLoggedIn()) {
		// 		this.user = this._authService.getMe();
		// 		console.log(this.user);
		// 	}
		// });
		// if (this._authService.isLoggedIn()) {
		// 	this.user = this._authService.getMe();
		// 	console.log(this.user);
		// }
	}
}
