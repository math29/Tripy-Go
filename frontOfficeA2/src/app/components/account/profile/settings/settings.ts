import {Component} from 'angular2/core';
import { RouterLink } from 'angular2/router';
// import { FormBuilder, ControlGroup, Validators, Control } from 'angular2/common';
import { Http, Headers } from 'angular2/http';
import { AuthService } from '../../../../tripy_go_lib/auth.service';

@Component({
	selector: 'settings',
	templateUrl: 'app/components/account/profile/settings/settings.html',
	// styleUrls: ['app/components/account/profile/profile.css'],
	providers: [AuthService],
	directives: [RouterLink],
	pipes: []
})
export class Settings {
    emailUsed: boolean = false;

	constructor(private _authService: AuthService) {
	}
}
