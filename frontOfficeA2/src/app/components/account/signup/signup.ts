import {Component} from 'angular2/core';
import {Router, RouterLink, ROUTER_DIRECTIVES} from 'angular2/router';
import { FormBuilder, ControlGroup, Validators, Control } from 'angular2/common';
import { Http, Headers } from 'angular2/http';
import { AuthService } from '../../../tripy_go_lib/auth.service';

@Component({
	selector: 'signup',
	templateUrl: 'app/components/account/signup/signup.html',
	styleUrls: ['app/components/account/signup/signup.css'],
	providers: [AuthService, FormBuilder],
	directives: [RouterLink],
	pipes: []
})
export class Signup {
	public user: any = { name : "", email: "", password: "" };
    errors: any;
    response: any;

    userForm: ControlGroup;
    name: Control;
    email: Control;
    password: Control;

	constructor(private _authService: AuthService, fb: FormBuilder) {
		this.name = fb.control('', Validators.compose([Validators.required, Validators.minLength(3)]));
		this.email = fb.control('', Validators.required);
		this.password = fb.control('', Validators.compose([Validators.required, Validators.minLength(3)]));

		this.userForm = fb.group({
			name: this.name,
			email: this.email,
			password: this.password
		});
	}

	register() {
		// console.log(this.userForm.value);
		this._authService.createUser(this.userForm.value);
	}


  //   $scope.register = function(form) {
		// $scope.submitted = true;

		// if (form.$valid) {
		// 	Auth.createUser({
		// 		name: $scope.user.name,
		// 		email: $scope.user.email,
		// 		password: $scope.user.password
		// 	})
		// 		.then(function() {
		// 			// Account created, redirect to home
		// 			$location.path('/');
		// 		})
		// 		.catch(function(err) {
		// 			err = err.data;
		// 			$scope.errors = {};

		// 			// Update validity of form fields that match the mongoose errors
		// 			angular.forEach(err.errors, function(error, field) {
		// 				form[field].$setValidity('mongoose', false);
		// 				$scope.errors[field] = error.message;
		// 			});
		// 		});
		// }
  //   };

  //   $scope.loginOauth = function(provider) {
		// $window.location.href = '/auth/' + provider;
  //   };
}
