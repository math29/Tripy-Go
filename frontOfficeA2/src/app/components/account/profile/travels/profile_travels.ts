import {Component} from '@angular/core';
import { RouterLink, Router } from '@angular/router-deprecated';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
// import { FormBuilder, ControlGroup, Validators, Control } from 'angular2/common';
import { AuthService } from '../../../../tripy_go_lib/services/auth.service';
import 'rxjs/add/operator/map';

@Component({
	selector: 'profileTravels',
	templateUrl: 'app/components/account/profile/travels/profile_travels.html',
	// styleUrls: ['app/components/account/profile/profile.css'],
	providers: [],
	directives: [RouterLink],
	pipes: []
})
export class ProfileTravels {
	travels: any;
	constructor(private _auth: AuthService, private _http: Http,private router : Router) {
		this._http.get('/api/travels/user/' + _auth.getMe()._id)
			.map(res => res.json())
			.subscribe(
			response => {
				this.travels = response;
			},
			error => {
				console.log(JSON.stringify(error));
			}
			);
	}

	navigateTo(travel : any) {
		this.router.navigate(['TravelPage',  { travel_id: travel._id }]);
	}
}
