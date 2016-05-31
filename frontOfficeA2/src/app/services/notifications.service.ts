import {Injectable} from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { AuthService } from '../tripy_go_lib/services/auth.service';

@Injectable()
export class NotificationService {

    options_post: RequestOptions;

    constructor(private _http: Http, private _auth: AuthService) {
    }

    // ***************************************
    // Stack Rate Functions
    // ***************************************
    ackNotification(notification_id : string) {
      this.options_post = new RequestOptions({ headers: this._auth.getBearerHeaders() });
        return this._http.post(`/api/notifications/${notification_id}`, null, this.options_post)
            .map(res => res.json());
    }

    // ***************************************
    // Stars Rate Functions
    // ***************************************

}
