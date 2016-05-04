import {Component, Input, OnInit} from 'angular2/core';
import { Http, RequestOptions, Headers } from 'angular2/http';
import { AuthService } from '../../../../../../tripy_go_lib/services/auth.service';

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
	private vote_side: String;
	private options_post: RequestOptions;
  
	constructor(private _auth: AuthService, private _http: Http) {
		this.options_post = new RequestOptions({ headers: _auth.getBearerHeaders() });
	}

	ngOnInit(){
		console.log(this.comment);
	}

	// Rate Votes
	vote(side) {
		this.vote_side = side;

		// Post Vote
		this._http.post(`/api/rate/vote/${side}/${this.comment.rate._id}`, null, this.options_post)
			.map(res => res.json())
			.subscribe(res => {
				console.log(this.comment.rate);
				this.comment.rate = res;
			});
	}
}