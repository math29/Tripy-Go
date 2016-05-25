import {Component} from '@angular/core';
import { RouterLink } from '@angular/router-deprecated';
// import { FormBuilder, ControlGroup, Validators, Control } from 'angular2/common';
import { AuthService } from '../../../tripy_go_lib/services/auth.service';

import { Overview } from './overview/overview';
import { Settings } from './settings/settings';
import { ProfileTravels } from './travels/profile_travels';

@Component({
	selector: 'profile',
	templateUrl: 'app/components/account/profile/profile.html',
	styleUrls: ['app/components/account/profile/profile.css'],
	providers: [],
	directives: [RouterLink, Overview, Settings, ProfileTravels],
	pipes: []
})
export class Profile {
    emailUsed: boolean = false;
    step = 1;

	constructor(private _auth: AuthService) {
		this._auth.storeMe();
	}
}
