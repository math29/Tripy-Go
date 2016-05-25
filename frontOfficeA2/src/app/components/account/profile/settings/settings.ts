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

import { GeneralesInfos } from './generalesInfos/generalesInfos';

declare var jQuery: JQueryStatic;

const fileAPI = "/api/files";

@Component({
	selector: 'settings',
	templateUrl: 'app/components/account/profile/settings/settings.html',
	styleUrls: [
		'app/components/account/profile/settings/settings.css'
	],
	providers: [],
	directives: [RouterLink, FILE_UPLOAD_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle, CORE_DIRECTIVES, GeneralesInfos],
	pipes: []
})
export class Settings {

    options: RequestOptions;

    uploader: FileUploader;
	hasBaseDropZoneOver: boolean = false;
	hasAnotherDropZoneOver: boolean = false;

	constructor(private _auth: AuthService, fb: FormBuilder, private _http: Http, private el: ElementRef) {
		 this.uploader = new FileUploader({ url: fileAPI, queueLimit: 1 });
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
}
