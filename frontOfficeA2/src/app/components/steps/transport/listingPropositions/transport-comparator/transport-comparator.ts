import {Component, Input, OnInit} from 'angular2/core';
import { Http, RequestOptions, Headers } from 'angular2/http';
import { RouterLink } from 'angular2/router';
import { TransportComparatorComment } from './transport-comparator-comment/transport-comparator-comment';
import { AuthService } from '../../../../../tripy_go_lib/services/auth.service';

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

	private options_post: RequestOptions;
  
	constructor(private _auth: AuthService, private _http: Http) {
		this.options_post = new RequestOptions({ headers: _auth.getBearerHeaders() });
	}

	ngOnInit(){
		console.log(this.comparator);
		this._http.post(`/api/transport/comparators/comments/0/${this.comparator._id}`, null, this.options_post)
			.map(res => res.json())
			.subscribe(res => {
				console.log(res);
			});
	}

	// Img Sizing
	
}