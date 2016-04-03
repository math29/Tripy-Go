import {Component} from 'angular2/core';
import { RouterLink, RouteParams } from 'angular2/router';
import { Http, RequestOptions, Headers } from 'angular2/http';
import { AuthService } from '../../../tripy_go_lib/services/auth.service';

@Component({
	selector: 'research',
	templateUrl: 'app/components/transport/research/research.html',
	// styleUrls: ['app/components/transport/listingPropositions/listingPropositions.css'],
	providers: [],
	directives: [RouterLink],
	pipes: []
})
export class Research {
	comparator: any;
	options_post: RequestOptions;

	constructor(private params: RouteParams, private _http: Http, private _auth: AuthService) {
		this.getComparator(params.get('id'));
		this.options_post = new RequestOptions({ headers: _auth.getBearerHeaders() });
	}

	// ***************************************
	// Get the selected comparator and store it into comparator vars
	// ***************************************
	getComparator(id:String) {
		this._http.get('/api/transport/comparator/' + id, this.options_post)
			.map(res => res.json())
			.subscribe(comparator => {
				this.comparator = comparator;
				console.log(this.comparator);
			});
	}
}
