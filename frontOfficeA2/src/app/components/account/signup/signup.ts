import {Component, OnInit} from '@angular/core';
import { RouterLink, RouteParams } from '@angular/router-deprecated';
import { FormBuilder, ControlGroup, Validators, Control } from '@angular/common';
import { AuthService } from '../../../tripy_go_lib/services/auth.service';

declare var $:any;

@Component({
	selector: 'signup',
	templateUrl: 'app/components/account/signup/signup.html',
	styleUrls: ['app/components/account/signup/signup.css'],
	providers: [FormBuilder],
	directives: [RouterLink],
	pipes: []
})
export class Signup implements OnInit{
    emailUsed: boolean = false;

    userForm: ControlGroup;
    name: Control;
    email: Control;
    password: Control;

	constructor(private _authService: AuthService, fb: FormBuilder,private  params: RouteParams) {
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

	ngOnInit() {
		if(this.params.get("error")) {
      if(this.params.get("error") == "email") {
        $('#myModal').modal('show');                      // initialized with defaults
      }
    }
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
