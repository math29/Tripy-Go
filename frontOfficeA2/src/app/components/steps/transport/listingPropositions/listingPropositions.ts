/// <reference path="../../../../../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../../../../../typings/jqrangeslider/jqrangeslider.d.ts" />

import {Component, ElementRef, ViewChild, AfterViewInit, ViewEncapsulation} from '@angular/core';
import { RouterLink, RouteParams } from '@angular/router-deprecated';
import { NgForm } from '@angular/common';
import { Http, RequestOptions, Headers } from '@angular/http';
import { AuthService } from '../../../../tripy_go_lib/services/auth.service';
import { TransportComparatorCmp } from './transport-comparator/transport-comparator';

import { FilterComparatorsService } from '../../../../services/filterComparators.service';

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
	providers: [FilterComparatorsService],
	directives: [RouterLink, TransportComparatorCmp]
})
export class ListingPropositions {
	travel_id: String;
	comparators: Array<TransportComparator>;
	allComparators: Array<TransportComparator>;

	options_post: RequestOptions;

	transportTypes: any;

	// Filters variables
	filterTypeChecked:Array<string> = [];
	filterTypeMap = {};
	ergonomyRange: number[] = [0, 5];
	contentRange: number[] = [0, 5];
	order: string = 'content_score';
	orderDir: string = '-';

	constructor(private el: ElementRef, private params: RouteParams, private _http: Http, private _auth: AuthService, private filter: FilterComparatorsService) {
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
				this.exec_filter();
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
				this.exec_filter();
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
				this.allComparators = comparators;
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
		this.exec_filter();
	}

	// Order
	onOrderChange(deviceValue) {
		this.order = deviceValue;
		this.exec_filter();
	}

	onOrderDirChange(deviceValue) {
		this.orderDir = deviceValue;
		this.exec_filter();
	}

	// EXEC FILTER
	exec_filter(){
		this.comparators = this.filter.exec(
			this.allComparators, this.ergonomyRange,
			this.contentRange, this.filterTypeChecked,
			this.order, this.orderDir);
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
