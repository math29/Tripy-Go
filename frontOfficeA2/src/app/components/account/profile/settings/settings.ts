/// <reference path="../../../../../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../../../../../typings/jquery.ui.datetimepicker/jquery.ui.datetimepicker.d.ts" />

import {Component, OnInit, ElementRef} from 'angular2/core';
import { RouterLink } from 'angular2/router';
import { FormBuilder, ControlGroup, Validators, Control, FORM_DIRECTIVES, NgClass, NgStyle, CORE_DIRECTIVES } from 'angular2/common';
import { Http, Headers, RequestOptions } from 'angular2/http';
import { AuthService } from '../../../../tripy_go_lib/services/auth.service';
import { FILE_UPLOAD_DIRECTIVES, FileUploader } from 'ng2-file-upload/ng2-file-upload';

declare var google: any;

const fileAPI = "/api/files";

@Component({
	selector: 'settings',
	templateUrl: 'app/components/account/profile/settings/settings.html',
	styleUrls: [
		'app/components/account/profile/settings/settings.css'
	],
	providers: [],
	directives: [RouterLink, FILE_UPLOAD_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle, CORE_DIRECTIVES],
	pipes: []
})
export class Settings implements OnInit {
    // emailUsed: boolean = false;

    userUpdateForm: ControlGroup;
    name: Control;
    email: Control;
    dest_prefered: Control;

    dest_prefereds: Array<string>;
    autocomplete_d: any;

    visitedCountries: Array<string>;

    user_info_message: String;

    options: RequestOptions;

    uploader: FileUploader = new FileUploader({ url: fileAPI });
	hasBaseDropZoneOver: boolean = false;
	hasAnotherDropZoneOver: boolean = false;

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

		// Necessary to not have an error
		this.uploader.queueLimit = 1;
		this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
			let responsePath = JSON.parse(response);
			this.updateUserPicture(responsePath);// the url will be in the response
		};

		this.options = new RequestOptions({ headers: _auth.getBearerHeaders() });
	}

	updateUser() {
		if (this.userUpdateForm.valid) {
			let user = this.userUpdateForm.value;

			// Destination prefered synchro
			delete user.dest_prefered;
			user.dest_prefereds = this.dest_prefereds;

			console.log(user);

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

	// ****************************************
	// GESTION UPLOAD NEW PICTURES
	// ****************************************

	updateUserPicture(responsePath: any) {
		let user = this._auth.getMe();
		user.picture = "/api/files/" + responsePath.file._id ;
		this._http.put('/api/users/' + user._id, JSON.stringify(user), this.options)
			.map(res => res.json())
			.subscribe(
				response => {
					this._auth.storeMe();
				}
			);
	}

	fileOverBase(e: any) {
		this.hasBaseDropZoneOver = e;
	}


	// POPULATING USER UPDATE FORM

	populateUserForm() {
		let user = this._auth.getMe();
		console.log(user);

		// Populate differents user form fields
		this.name.updateValue(user.name);
		this.email.updateValue(user.email);
		this.dest_prefereds = user.dest_prefereds;
	}

	// PREFERED PLACES
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

	addPrefPlace(){
		if (this.dest_prefereds.length < 3 && this.dest_prefereds.length > -1) {
			console.log('here')
			let place = this.autocomplete_d.getPlace();
			this.dest_prefereds.push(place.formatted_address);
			// _this.departure_place = place;
			this.updatePrefPlaces();
		}
	}

	rmPrefPlace(index){
		if (index > -1) {
			this.dest_prefereds.splice(index, 1);
			this.updatePrefPlaces();
		}
	}

    // *******************************************************************************************
	// Initialization Du GeoCode API
	// *******************************************************************************************
	ngOnInit() {
		this.populateUserForm();

        let dest_prefered: any = document.getElementById('dest_prefered');
        this.autocomplete_d = new google.maps.places.Autocomplete(dest_prefered, {});
	}
}
