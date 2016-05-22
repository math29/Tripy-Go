/// <reference path="../../../../../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../../../../../typings/jquery.ui.datetimepicker/jquery.ui.datetimepicker.d.ts" />

import {Component, OnInit, AfterViewInit, ElementRef} from '@angular/core';
import { RouterLink } from '@angular/router-deprecated';
import { FormBuilder, ControlGroup, Validators, Control, FORM_DIRECTIVES, NgClass, NgStyle, CORE_DIRECTIVES } from '@angular/common';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AuthService } from '../../../../tripy_go_lib/services/auth.service';
import { FILE_UPLOAD_DIRECTIVES, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

declare var jQuery: JQueryStatic;

const fileAPI = "/api/files";

@Component({
	selector: 'settings',
	templateUrl: 'app/components/account/profile/settings/settings.html',
	styleUrls: ['app/components/account/profile/settings/settings.css'],
	providers: [],
	directives: [RouterLink, FILE_UPLOAD_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle, CORE_DIRECTIVES],
	pipes: []
})
export class Settings implements AfterViewInit, OnInit {
    // emailUsed: boolean = false;

    userUpdateForm: ControlGroup;
    name: Control;
    fname: Control;
    phone: Control;
    address: Control;
    zipcode: Control;
    city: Control;
    country: Control;
    birthday: Control;

    user_info_message: String;

    options: RequestOptions;

    uploader: FileUploader = new FileUploader({ url: fileAPI });
	hasBaseDropZoneOver: boolean = false;
	hasAnotherDropZoneOver: boolean = false;

	constructor(private _auth: AuthService, fb: FormBuilder, private _http: Http, private el: ElementRef) {
		console.log(_auth.getMe());
		// Initializing forms
		this.name = fb.control('', Validators.compose([]));
		this.fname = fb.control('', Validators.compose([]));
		this.phone = fb.control('', Validators.compose([]));
		this.address = fb.control('', Validators.compose([]));
		this.zipcode = fb.control('', Validators.compose([]));
		this.city = fb.control('', Validators.compose([]));
		this.country = fb.control('', Validators.compose([]));
		this.birthday = fb.control('', Validators.compose([]));

		this.userUpdateForm = fb.group({
			name: this.name,
			fname: this.fname,
			phone: this.phone,
			address: this.address,
			zipcode: this.zipcode,
			city: this.city,
			country: this.country,
			birthday: this.birthday
		});

		// Necessary to not have an error
		//this.uploader.queueLimit = 1;
		this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
			let responsePath = JSON.parse(response);
			this.updateUserPicture(responsePath);// the url will be in the response
		};

		this.options = new RequestOptions({ headers: new Headers(_auth.getBearerHeaders()) });
	}

	updateUser() {
		if (this.userUpdateForm.valid) {
			let user = this.userUpdateForm.value;

			// Update and format DatePickers Departure and return
			let r_datepicker = jQuery(this.el.nativeElement)
				.find('#departure_date')
				.data()
				.datepicker;
			user.birthday = new Date(r_datepicker.selectedYear, r_datepicker.selectedMonth, r_datepicker.selectedDay);

			// Let's begin persisting processus of the new Travel with the Locations persisting
			this._http.put('/api/users/' + this._auth.getMe()._id, JSON.stringify(user), this.options)
				.map(res => res.json())
				.map(res => res._id)
				.subscribe(
				response => {
					console.log(response);
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
		// "/api/files/" + $scope.user.picture + "?_ts=" + new Date().getTime();
		console.log(user.picture);
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

		// Populate differents user form fields
		this.name.updateValue(user.name);
		this.fname.updateValue(user.fname);
		this.phone.updateValue(user.phone);
		this.address.updateValue(user.address);
		this.zipcode.updateValue(user.zipcode);
		this.city.updateValue(user.city);
		this.birthday.updateValue(user.birthday);
		this.country.updateValue(user.country);
	}

	ngOnInit() {
		this.populateUserForm();
    }

    // *******************************************************************************************
	// Initialization With JQuery Datepicker
	// *******************************************************************************************
	ngAfterViewInit() {
		jQuery(this.el.nativeElement)
			.find('#departure_date')
			.datepicker({ minDate: -"3M" , maxDate: "+3M" });
	}
}
