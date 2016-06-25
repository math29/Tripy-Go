/// <reference path="../../../../../../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../../../../../../typings/jquery.ui.datetimepicker/jquery.ui.datetimepicker.d.ts" />

import {Component, OnInit, ElementRef} from '@angular/core';
import { RouterLink } from '@angular/router-deprecated';
import { FormBuilder, ControlGroup, Validators, Control, FORM_DIRECTIVES, NgClass, NgStyle, CORE_DIRECTIVES } from '@angular/common';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthService } from '../../../../../tripy_go_lib/services/auth.service';

declare var google: any;

@Component({
	selector: 'generalesInfos',
	templateUrl: 'app/components/account/profile/settings/generalesInfos/generalesInfos.html',
	styleUrls: [
		'app/components/account/profile/settings/generalesInfos/generalesInfos.css'
	],
	providers: [],
	directives: [RouterLink, FORM_DIRECTIVES, NgClass, NgStyle, CORE_DIRECTIVES],
	pipes: []
})
export class GeneralesInfos implements OnInit {
    userUpdateForm: ControlGroup;
    name: Control;
    email: Control;
    dest_prefered: Control;

    visited_countries: Array<string> = [];
    vCFormVisible = false;
    vCFormCountries: Array<any> = [];
    dest_prefereds: Array<string>;
    autocomplete_d: any;

    user_info_message: String;

    options: RequestOptions;

	constructor(private _auth: AuthService, fb: FormBuilder, private _http: Http, private el: ElementRef) {
		// Initializing forms
		this.name = fb.control('', Validators.compose([]));
		this.email = fb.control('', Validators.compose([]));
		this.dest_prefered = fb.control('', Validators.compose([]));

		this.userUpdateForm = fb.group({
			name: this.name,
			email: this.email,
			dest_prefered: this.dest_prefered
		});

		this.options = new RequestOptions({ headers: _auth.getBearerHeaders() });

		// Update Visited Countries
		this.updateVisitedCountries();
		this.updateVisitedCountryForm();
	}

    // POPULATING USER UPDATE FORM

	populateUserForm() {
		let user = this._auth.getMe();

		// Populate differents user form fields
		this.name.updateValue(user.name);
		this.email.updateValue(user.email);
		this.dest_prefereds = user.dest_prefereds;
	}

	// *******************************************************************************************
	// PREFERED PLACES
	// *******************************************************************************************
	updatePrefPlaces() {
		let user = this._auth.getMe();
		this._http.put('/api/users/prefdestination/' + user._id, JSON.stringify({ preferedDests: this.dest_prefereds }), this.options)
			.map(res => res.json())
			.subscribe(
			response => {
				user.dest_prefereds = this.dest_prefereds;
				this._auth.user = user;
				this._auth.storeMe();
			}
			);

		this.dest_prefered.updateValue('');
	}

	addPrefPlace() {
		if (this.dest_prefereds.length < 3 && this.dest_prefereds.length > -1) {
			let place = this.autocomplete_d.getPlace();
			if (place) {
				this.dest_prefereds.push(place.formatted_address);
				this.updatePrefPlaces();
			}
		}
	}

	rmPrefPlace(index) {
		if (index > -1) {
			this.dest_prefereds.splice(index, 1);
			this.updatePrefPlaces();
		}
	}

	// *******************************************************************************************
	// VISITED COUNTRIES
	// *******************************************************************************************
	updateVisitedCountries() {
		this._http.put('/api/users/update/automatic/visited/countries/' + this._auth.getMe()._id, JSON.stringify(this._auth.getMe()), this.options)
			.map(res => res.json())
			.subscribe(
			user => {
				for (let i = 0; i < user.visited_countries.length; i++) {
					this.visited_countries.push("flag-icon-" + user.visited_countries[i]);
				}
				this._auth.user = user;
				this._auth.storeMe();
			}
			);
	}

	addVisitedCountry(countrySelected) {
		this._http.put('/api/users/update/visited/countries/' + this._auth.getMe()._id, JSON.stringify({country: countrySelected}), this.options)
			.map(res => res.json())
			.subscribe(
			user => {
				this.visited_countries = [];
				for (let i = 0; i < user.visited_countries.length; i++) {
					this.visited_countries.push("flag-icon-" + user.visited_countries[i]);
				}
				this._auth.user = user;
				this._auth.storeMe();
			}
			);
	}

	updateVisitedCountryForm(){
		this._http.get('/api/countries/', this.options)
			.map(res => res.json())
			.subscribe(
			countries => {
				this.vCFormCountries = countries;
			}
			);
	}


	// *****************************
	// Update User
	// ****************************
	updateUser() {
		if (this.userUpdateForm.valid) {
			let user = this.userUpdateForm.value;

			// Destination prefered synchro
			delete user.dest_prefered;
			user.dest_prefereds = this.dest_prefereds;

			// Let's begin persisting processus of the new Travel with the Locations persisting
			this._http.put('/api/users/' + this._auth.getMe()._id, JSON.stringify(user), this.options)
				.map(res => res.json())
				.map(res => res._id)
				.subscribe(
				response => {
					this._auth.storeMe();
					this.user_info_message = "Paramètres mis à jour !";
				},
				error => {
					console.log(JSON.stringify(error));
				}
				);
		}
	}

	ngOnInit() {
		this.populateUserForm();

        let dest_prefered: any = document.getElementById('dest_prefered');
        this.autocomplete_d = new google.maps.places.Autocomplete(dest_prefered, {});
    }
}
