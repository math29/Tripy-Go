import {Component} from '@angular/core';
import {Router, RouterLink, ROUTER_DIRECTIVES, RouteParams} from '@angular/router-deprecated';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { AuthService } from '../../../tripy_go_lib/services/auth.service';

declare var $:any;
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

	constructor(private _authService: AuthService, public _router: Router, params: RouteParams) {
    if(params.get("error")) {
      if(params.get("error") == "email") {
        $('#myModal').modal()                      // initialized with defaults
      }
    }
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

}
