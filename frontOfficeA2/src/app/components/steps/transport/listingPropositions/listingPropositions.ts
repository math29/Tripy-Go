import {Component} from 'angular2/core';
import { RouterLink, RouteParams } from 'angular2/router';
import { Http, RequestOptions, Headers } from 'angular2/http';
import { AuthService } from '../../../../tripy_go_lib/services/auth.service';

@Component({
	selector: 'listing-propositions',
	templateUrl: 'app/components/steps/transport/listingPropositions/listingPropositions.html',
	styleUrls: ['app/components/steps/transport/listingPropositions/listingPropositions.css'],
	providers: [],
	directives: [RouterLink],
	pipes: []
})
export class ListingPropositions {
	travel_id: String;
	comparators: Array<TransportComparator>;

	options_post: RequestOptions;

	constructor(private params: RouteParams, private _http:Http, private _auth: AuthService) {
		this.travel_id = params.get('id');

		this.options_post = new RequestOptions({ headers: _auth.getBearerHeaders() });
		this.synchTransportsComparators();
	}

	// ***************************************
	// Get the all list of transports comparators and store it into comparators vars
	// ***************************************
	synchTransportsComparators() {
		this._http.get('/api/transport/comparators', this.options_post)
			.map(res => res.json())
			.subscribe(comparators => {
				this.comparators = comparators;
				console.log(this.comparators);
			});
	}
}

// Transports Comparator Schema that we will manipulate
class TransportComparator {
	type: [{
		name: String,
		img: String
	}]
	company: {
		name: String,
		img: String,
		url: String
	}
}