import {Component} from 'angular2/core';
import {Router, RouterLink, ROUTER_DIRECTIVES} from 'angular2/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { Http, Headers } from 'angular2/http';

import {Navbar} from '../../navigation/navbar/navbar';

@Component({
  selector: 'login',
  templateUrl: 'app/components/account/login/login.html',
  styleUrls: ['app/components/account/login/login.css'],
  providers: [],
  directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES, Navbar],
  pipes: []
})
export class Login {
	user: any;
    errors: any;

	constructor(public router: Router, public http: Http) {
	}

	login(event, email, password) {
		event.preventDefault();
		// let body = JSON.stringify({ email, password });
		let body = "email=" + email + "&password=" + password;
		let headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		console.log("the body : "+body);
		this.http.post('http://localhost:9000/auth/local', body, { headers: headers })
			.subscribe(
			response => {
				localStorage.setItem('jwt', response.json().id_token);
				this.router.parent.navigateByUrl('/');
			},
			error => {
				// alert(JSON.stringify(error));
				console.log(JSON.stringify(error));
				// console.log(JSON.stringify(error));
			}
			);
	}

	signup(event) {
		event.preventDefault();
		this.router.parent.navigateByUrl('/signup');
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
