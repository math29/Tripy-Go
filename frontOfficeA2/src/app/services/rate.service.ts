import {Injectable} from 'angular2/core';
import { Http, RequestOptions, Headers } from 'angular2/http';
import { AuthService } from '../tripy_go_lib/services/auth.service';

@Injectable()
export class RateService {

    options_post: RequestOptions;

    constructor(private _http: Http, private _auth: AuthService) {
        this.options_post = new RequestOptions({ headers: _auth.getBearerHeaders() });
    }

    // ***************************************
    // Stack Rate Functions
    // ***************************************
    updateStackRate(vote, rate_id) {
        return this._http.post('/api/rate/vote/' + vote + "/" + rate_id, null, this.options_post)
            .map(res => res.json());
    }

    // ***************************************
    // Stars Rate Functions
    // ***************************************

}
