import {Component} from 'angular2/core';
import { RouterLink } from 'angular2/router';
// import { FormBuilder, ControlGroup, Validators, Control } from 'angular2/common';
import { AuthService } from '../../../tripy_go_lib/auth.service';

import { Overview } from './overview/overview';
import { Settings } from './settings/settings';

@Component({
	selector: 'profile',
	templateUrl: 'app/components/account/profile/profile.html',
	styleUrls: ['app/components/account/profile/profile.css'],
	providers: [AuthService],
	directives: [RouterLink, Overview, Settings],
	pipes: []
})
export class Profile {
    emailUsed: boolean = false;

	constructor(private _authService: AuthService) {
	}
}
