import {Component, Input, OnInit} from 'angular2/core';
import { Http, RequestOptions, Headers } from 'angular2/http';

@Component({
	selector: 'comparatorComment',
	templateUrl: 'app/components/steps/transport/listingPropositions/transport-comparator/transport-comparator-comment/transport-comparator-comment.html',
	styleUrls: ['app/components/steps/transport/listingPropositions/transport-comparator/transport-comparator-comment/transport-comparator-comment.css'],
	providers: [],
	directives: [],
	pipes: [],
	inputs: ['comment']
})
export class TransportComparatorComment {
	private comment: any;
  
	constructor(){
	}

	ngOnInit(){
		console.log(this.comment);
	}

	// Img Sizing
	
}