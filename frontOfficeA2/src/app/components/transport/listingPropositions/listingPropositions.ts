import {Component} from 'angular2/core';
import { RouterLink, RouteParams } from 'angular2/router';
import { Http, RequestOptions, Headers } from 'angular2/http';

@Component({
	selector: 'listing-propositions',
	templateUrl: 'app/components/transport/listingPropositions/listingPropositions.html',
	styleUrls: ['app/components/transport/listingPropositions/listingPropositions.css'],
	providers: [],
	directives: [],
	pipes: []
})
export class ListingPropositions {
	travel_id: String;
	comparators: Array<TransportComparator>;

	options: RequestOptions;

	constructor(private params: RouteParams, private _http:Http) {
		this.travel_id = params.get('id');
		this.synchTransportsComparators();

		// Headers For api requests
		let headers = new Headers({
		});
		this.options = new RequestOptions({ headers: headers });
	}

	// ***************************************
	// Get the all list of transports comparators and store it into comparators vars
	// ***************************************
	synchTransportsComparators() {
		this._http.get('/api/transport/comparator', this.options)
			.map(res => res.json())
			.subscribe(comparators => {
				this.comparators = comparators;
			});

		// let comp = new TransportComparator();
		// comp = {
		// 	type: [{ name: "Avion", img: "url" }],
		// 	company: { name: "LILIGO", img: "assets/images/cruise2.jpg", url: "http://www.liligo.fr/" }
		// };
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