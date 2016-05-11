import {Component} from 'angular2/core';
import { RouterLink, RouteParams } from 'angular2/router';
import { Http, RequestOptions, Headers } from 'angular2/http';
import { AuthService } from '../../../../tripy_go_lib/services/auth.service';
import { TransportComparatorCmp } from './transport-comparator/transport-comparator';
import { filterTypeTransport } from '../../../../pipes/filterTypeTransport.pipe';

@Component({
	selector: 'listing-propositions',
	templateUrl: 'app/components/steps/transport/listingPropositions/listingPropositions.html',
	styleUrls: ['app/components/steps/transport/listingPropositions/listingPropositions.css'],
	providers: [],
	directives: [RouterLink, TransportComparatorCmp],
	pipes: [filterTypeTransport]
})
export class ListingPropositions {
	travel_id: String;
	comparators: Array<TransportComparator>;

	options_post: RequestOptions;

	transportTypes: any;

	constructor(private params: RouteParams, private _http:Http, private _auth: AuthService) {
		this.travel_id = params.get('id');

		this.options_post = new RequestOptions({ headers: _auth.getBearerHeaders() });
		this.synchTransportsComparators();
		this.synchTransportTypes();
	}

	// ***************************************
	// Get the all list of transports comparators and store it into comparators vars
	// ***************************************
	synchTransportsComparators() {
		this._http.get('/api/transport/comparators', this.options_post)
			.map(res => res.json())
			.subscribe(comparators => {
				this.comparators = comparators;
			});
	}

	synchTransportTypes() {
		this._http.get('/api/transport/type', this.options_post)
			.map(res => res.json())
			.subscribe(transportTypes => {
				this.transportTypes = transportTypes;
				console.log(this.transportTypes);
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