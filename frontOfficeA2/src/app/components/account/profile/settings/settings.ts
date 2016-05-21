import {Component, ElementRef} from 'angular2/core';
import { RouterLink } from 'angular2/router';
import { FormBuilder, ControlGroup, Validators, Control, FORM_DIRECTIVES, NgClass, NgStyle, CORE_DIRECTIVES } from 'angular2/common';
import { Http, Headers, RequestOptions } from 'angular2/http';
import { AuthService } from '../../../../tripy_go_lib/services/auth.service';
import { FILE_UPLOAD_DIRECTIVES, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { GeneralesInfos } from './generalesInfos/generalesInfos';

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

    uploader: FileUploader = new FileUploader({ url: fileAPI });
	hasBaseDropZoneOver: boolean = false;
	hasAnotherDropZoneOver: boolean = false;

	constructor(private _auth: AuthService, fb: FormBuilder, private _http: Http, private el: ElementRef) {
		// Necessary to not have an error
		this.uploader.queueLimit = 1;
		this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
			let responsePath = JSON.parse(response);
			this.updateUserPicture(responsePath);// the url will be in the response
		};

		this.options = new RequestOptions({ headers: _auth.getBearerHeaders() });
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
