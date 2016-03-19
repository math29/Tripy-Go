import {Component} from 'angular2/core';
import { RouterLink } from 'angular2/router';
// import { FormBuilder, ControlGroup, Validators, Control } from 'angular2/common';
import { AuthService } from '../../../../tripy_go_lib/auth.service';

@Component({
	selector: 'profileTravels',
	templateUrl: 'app/components/account/profile/travels/profile_travels.html',
	// styleUrls: ['app/components/account/profile/profile.css'],
	providers: [AuthService],
	directives: [RouterLink],
	pipes: []
})
export class ProfileTravels {
	travels: any;
	constructor(private _authService: AuthService) {

	}
}
