import {Component} from 'angular2/core';
import { RouterLink } from 'angular2/router';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
// import { FormBuilder, ControlGroup, Validators, Control } from 'angular2/common';
import { AuthService } from '../../../../tripy_go_lib/services/auth.service';
import 'rxjs/add/operator/map';

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
	constructor(private _auth: AuthService, private _http: Http) {
		this._http.get('/api/travels/user/' + _auth.getMe()._id)
			.map(res => res.json())
			.subscribe(
			response => {
				this.travels = response;
				console.log(this.travels);
			},
			error => {
				console.log(JSON.stringify(error));
			}
			);
	}
}
