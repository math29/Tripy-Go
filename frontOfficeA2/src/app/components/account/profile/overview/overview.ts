import {Component} from '@angular/core';
import { RouterLink } from '@angular/router-deprecated';
import { AuthService } from '../../../../tripy_go_lib/services/auth.service';

@Component({
	selector: 'overview',
	templateUrl: 'app/components/account/profile/overview/overview.html',
	// styleUrls: ['app/components/account/profile/profile.css'],
	providers: [],
	directives: [RouterLink],
	pipes: []
})
export class Overview {
	user: any;

	constructor(private _auth: AuthService) {
		this.user = _auth.getMe();
	}
}
