import {Component} from 'angular2/core';
import {Router, RouterLink, ROUTER_DIRECTIVES} from 'angular2/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { Http, Headers } from 'angular2/http';
import { AuthService } from '../../../tripy_go_lib/services/auth.service';

@Component({
  selector: 'login',
  templateUrl: 'app/components/account/login/login.html',
  styleUrls: ['app/components/account/login/login.css'],
  providers: [],
  directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES],
  pipes: []
})
export class Login {
	public user: any = { email: "", password: "" };
    errors: any;
    response: any;

	constructor(private _authService: AuthService, public _router: Router, public http: Http) {
	}

	login(){
		this._authService.login(this.user);
	  }

	signup(event) {
		event.preventDefault();
		this._router.parent.navigateByUrl('/signup');
	}

	// login(form) {
	// 	var submitted = true;

	// 	if (form.$valid) {
	// 		Auth.login({
	// 			email: this.user.email,
	// 			password: this.user.password
	// 		})
	// 		.then(function() {
	// 			// Logged in, redirect to home
	// 			$location.path('/');
	// 		})
	// 		.catch(function(err) {
	// 			this.errors.other = err.message;
	// 		});
	// 	}
	// };

	// loginOauth(provider) {
	// $window.location.href = '/auth/' + provider;
	// };

}
