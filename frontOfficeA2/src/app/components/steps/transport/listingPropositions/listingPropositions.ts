/// <reference path="../../../../../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../../../../../typings/jqrangeslider/jqrangeslider.d.ts" />

import {Component, ElementRef, ViewChild, AfterViewInit, ViewEncapsulation} from 'angular2/core';
import { RouterLink, RouteParams } from 'angular2/router';
import { NgForm } from 'angular2/common';
import { Http, RequestOptions, Headers } from 'angular2/http';
import { AuthService } from '../../../../tripy_go_lib/services/auth.service';
import { TransportComparatorCmp } from './transport-comparator/transport-comparator';

import { filterTypeTransport } from '../../../../pipes/filterTypeTransport.pipe';
import { filterRangeRate } from '../../../../pipes/filterRangeRate.pipe';
import { OrderBy } from '../../../../pipes/orderBy.pipe';

declare var jQuery: any;
declare var $: any;

@Component({
	selector: 'listing-propositions',
	templateUrl: 'app/components/steps/transport/listingPropositions/listingPropositions.html',
	styleUrls: [
		'app/components/steps/transport/listingPropositions/rangeslider.css',
		'app/components/steps/transport/listingPropositions/listingPropositions.css'
	],
    encapsulation: ViewEncapsulation.None,
	providers: [],
	directives: [RouterLink, TransportComparatorCmp],
	pipes: [filterTypeTransport, filterRangeRate, OrderBy]
})
export class ListingPropositions {
	travel_id: String;
	comparators: Array<TransportComparator>;

	options_post: RequestOptions;

	transportTypes: any;

	// Filters variables
	filterTypeChecked:Array<string> = [];
	filterTypeMap = {};
	ergonomyRange: number[] = [0, 5];
	contentRange: number[] = [0, 5];
	order: string = 'content_score';
	orderDir: string = '-';

	constructor(private el: ElementRef, private params: RouteParams, private _http: Http, private _auth: AuthService) {
		this.travel_id = params.get('id');

		this.options_post = new RequestOptions({ headers: _auth.getBearerHeaders() });
		this.synchTransportsComparators();
		this.synchTransportTypes();
	}

	ngAfterViewInit() {
		let ergonomy_range = jQuery(this.el.nativeElement).find(".ergonomy_rangeslider").slider({
			range: true,
			orientation: "horizontal",
			min: 0,
			max: 5,
			values: [0, 5],
			slide: (event, ui) => {
				this.ergonomyRange = ui.values;
				ergonomy_range.val(ui.value);
			}
        });

        let content_range = jQuery(this.el.nativeElement).find(".content_rangeslider").slider({
			range: true,
			orientation: "horizontal",
			min: 0,
			max: 5,
			values: [0, 5],
			slide: (event, ui) => {
				this.contentRange = ui.values;
				content_range.val(ui.value);
			}
        });
	}

	// ***************************************
	// Get the all list of transports comparators and store it into comparators vars
	// ***************************************
	synchTransportsComparators() {
		this._http.get('/api/comparators/transport', this.options_post)
			.map(res => res.json())
			.subscribe(comparators => {
				// Need to Do this for filtring
				for (var i = 0; i < comparators.length; i++){
					comparators[i].ergo_score = comparators[i].transport.ergo_rate.score;
					comparators[i].content_score = comparators[i].transport.content_rate.score;
				}
				this.comparators = comparators;
			});
	}

	synchTransportTypes() {
		this._http.get('/api/transport/type', this.options_post)
			.map(res => res.json())
			.subscribe(transportTypes => {
				this.transportTypes = transportTypes;
				for (var x = 0; x < this.transportTypes.length; x++) {
					this.filterTypeMap[this.transportTypes[x].name] = false;
				}
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

	// Order
	onOrderChange(deviceValue) {
		this.order = deviceValue;
	}

	onOrderDirChange(deviceValue) {
		this.orderDir = deviceValue;
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
