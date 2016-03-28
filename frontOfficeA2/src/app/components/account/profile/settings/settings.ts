/// <reference path="../../../../../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../../../../../typings/jquery.ui.datetimepicker/jquery.ui.datetimepicker.d.ts" />

import {Component, OnInit, AfterViewInit, ElementRef} from 'angular2/core';
import { RouterLink } from 'angular2/router';
import { FormBuilder, ControlGroup, Validators, Control } from 'angular2/common';
import { Http, Headers, RequestOptions } from 'angular2/http';
import { AuthService } from '../../../../tripy_go_lib/services/auth.service';

declare var jQuery: JQueryStatic;

@Component({
	selector: 'settings',
	templateUrl: 'app/components/account/profile/settings/settings.html',
	// styleUrls: ['app/components/account/profile/profile.css'],
	providers: [AuthService],
	directives: [RouterLink],
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
    picture: Control;
    birthday: Control;

    user_info_message: String;

    options: RequestOptions;

	constructor(private _auth: AuthService, fb: FormBuilder, private _http: Http, private el: ElementRef) {
		this.name = fb.control('', Validators.compose([]));
		this.fname = fb.control('', Validators.compose([]));
		this.phone = fb.control('', Validators.compose([]));
		this.address = fb.control('', Validators.compose([]));
		this.zipcode = fb.control('', Validators.compose([]));
		this.city = fb.control('', Validators.compose([]));
		this.country = fb.control('', Validators.compose([]));
		this.birthday = fb.control('', Validators.compose([]));
		// this.picture = fb.control('', Validators.compose([Validators.required]));

		this.userUpdateForm = fb.group({
			name: this.name,
			fname: this.fname,
			phone: this.phone,
			address: this.address,
			zipcode: this.zipcode,
			city: this.city,
			country: this.country,
			birthday: this.birthday,
			picture: this.picture
		});

		// Subscribe to Email changes
		// this.email.valueChanges.subscribe((change) => {
		// 	this.emailUsed = false;
		// });
		this.options = new RequestOptions({ headers: _auth.getBearerHeaders() });
	}

	updateUser() {
		if (this.userUpdateForm.valid) {
			console.log(this.userUpdateForm.value);
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
					// this._router.navigate(['ListingPropositions', { id: response }]);
				},
				error => {
					console.log(JSON.stringify(error));
				}
				);
		}
	}

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
