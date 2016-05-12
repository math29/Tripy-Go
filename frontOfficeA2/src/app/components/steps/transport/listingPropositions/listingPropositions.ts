import {Component} from 'angular2/core';
import { RouterLink, RouteParams } from 'angular2/router';
import { NgForm } from 'angular2/common';
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

	// Filters variables
	filterTypeChecked:Array<string> = [];
	filterTypeMap = {};

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
				this.initFilterTypeMap();
			});
	}

	// ***************************************
	// Filters Gesture
	// ***************************************
	initFilterTypeMap() {
		for (var x = 0; x < this.transportTypes.length; x++) {
			this.filterTypeMap[this.transportTypes[x].name] = true;
		}
		this.updateOptions();
	}

	updateCheckedOptions(option, event) {
		this.filterTypeMap[option] = event.target.checked;
		
		// update checked options
		this.updateOptions();
	}

	updateOptions() {
		this.filterTypeChecked = [];
		for (var x in this.filterTypeMap) {
			if (this.filterTypeMap[x]) {
				this.filterTypeChecked.push(x);
			}
		}
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