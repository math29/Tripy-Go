import {Component, Input, OnInit} from 'angular2/core';
import { Http, RequestOptions, Headers } from 'angular2/http';
import { RouterLink } from 'angular2/router';
import { TransportComparatorComment } from './transport-comparator-comment/transport-comparator-comment';

@Component({
	selector: 'comparator',
	templateUrl: 'app/components/steps/transport/listingPropositions/transport-comparator/transport-comparator.html',
	styleUrls: ['app/components/steps/transport/listingPropositions/transport-comparator/transport-comparator.css'],
	providers: [],
	directives: [RouterLink, TransportComparatorComment],
	pipes: [],
	inputs: ['comparator']
})
export class TransportComparatorCmp {
	private comparator: any;

	// This var tell us if comments are epanded or not
	private comments: Boolean = false;
  
	constructor(){
	}

	ngOnInit(){
		console.log(this.comparator);
	}

	// Img Sizing
	
}