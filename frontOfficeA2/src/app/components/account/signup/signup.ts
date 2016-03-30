import {Component} from 'angular2/core';
import { RouterLink } from 'angular2/router';
import { FormBuilder, ControlGroup, Validators, Control } from 'angular2/common';
import { AuthService } from '../../../tripy_go_lib/services/auth.service';

@Component({
	selector: 'signup',
	templateUrl: 'app/components/account/signup/signup.html',
	styleUrls: ['app/components/account/signup/signup.css'],
	providers: [FormBuilder],
	directives: [RouterLink],
	pipes: []
})
export class Signup {
    emailUsed: boolean = false;

    userForm: ControlGroup;
    name: Control;
    email: Control;
    password: Control;

	constructor(private _authService: AuthService, fb: FormBuilder) {
		this.name = fb.control('', Validators.compose([Validators.required, Validators.minLength(3)]));
		this.email = fb.control('', Validators.compose([Validators.required]));
		this.password = fb.control('', Validators.compose([Validators.required, Validators.minLength(3)]));

		this.userForm = fb.group({
			name: this.name,
			email: this.email,
			password: this.password
		});

		// Subscribe to Email changes
		this.email.valueChanges.subscribe((change) => {
			this.emailUsed = false;
		});
	}

	register() {
		// console.log(this.userForm.value);
		this._authService.createUser(this.userForm.value)
			.subscribe(
				response => {
					this.emailUsed = true;
				},
				error => {
					console.log(error);
				}
			);
	}
}
