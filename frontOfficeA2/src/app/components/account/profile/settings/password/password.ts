import {Component} from '@angular/core';
import { FormBuilder, ControlGroup, Validators, Control, FORM_DIRECTIVES, NgClass, NgStyle, CORE_DIRECTIVES } from '@angular/common';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AuthService } from '../../../../../tripy_go_lib/services/auth.service';
import { PasswordValidator } from '../../../../../validators/password.validator';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

declare var jQuery: JQueryStatic;

const fileAPI = "/api/files";

@Component({
	selector: 'changePassword',
	templateUrl: 'app/components/account/profile/settings/password/password.html',
	styleUrls: [
		'app/components/account/profile/settings/password/password.css'
	],
	providers: [],
	directives: [FORM_DIRECTIVES, NgClass, NgStyle],
	pipes: []
})
export class UpdatePassword {
	pwdUpdateForm: ControlGroup;
	newPwdGroup: ControlGroup;
	actualPwd: Control;
	newPwd: Control;
	repeatNewPwd: Control;
  	options: RequestOptions;

	constructor(private _auth: AuthService, fb: FormBuilder, private _http: Http) {
		// Initializing forms
		this.actualPwd = fb.control('', Validators.compose([
			Validators.required
		]));
		this.newPwd = fb.control('',Validators.compose([
			Validators.required,
			Validators.minLength(6),
			PasswordValidator.checkComplexityPwd
		]));
		this.repeatNewPwd = fb.control('', Validators.compose([
			Validators.required,
			Validators.minLength(6)
		]));

		this.newPwdGroup = fb.group({
			newPwd: this.newPwd,
			repeatNewPwd: this.repeatNewPwd
		}, { validator: this.areEqual });

		this.pwdUpdateForm = fb.group({
			actualPwd: this.actualPwd,
			passwords: this.newPwdGroup
		});    

		this.options = new RequestOptions({ headers: new Headers(_auth.getBearerHeaders()) });
	}

	areEqual(group: ControlGroup) {
		let valid = false;

		if (group.controls['newPwd'].value == group.controls['repeatNewPwd'].value){
			valid = true;
		}

		if (valid) {
			return null;
		}

		return {
			areEqual: true
		};
	}
}
