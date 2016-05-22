import {Component, Input, OnInit} from 'angular2/core';
import { Http, RequestOptions, Headers } from 'angular2/http';
import { RouterLink, RouteParams } from 'angular2/router';
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

	private options_post: RequestOptions;

	// This var tell us if comments are epanded or not
	private comments: Boolean = false;
	private comment_offset: number = 0;
	private comment_limit: number = 5;
	private number_comments: number;

	private travel_id: string;

	constructor(private _auth: AuthService, private _http: Http, private params: RouteParams) {
		this.options_post = new RequestOptions({ headers: _auth.getBearerHeaders() });
		this.travel_id = this.params.get('id');
	}

	ngOnInit(){
		console.log(this.comparator);
		this.number_comments = this.comparator.transport.comments.length;
		this.synchComments();
	}

	synchComments() {
		this._http.get(`/api/comparators/comments/transport/${this.comparator._id}/${this.comment_limit}/${this.comment_offset}`, this.options_post)
			.map(res => res.json())
			.subscribe(comments => {
				this.comparator.transport.comments = comments;
			});
	}

	nextComments() {
		if ((this.comment_offset + this.comment_limit) < this.number_comments) {
			this.comment_offset += 5;
			this.synchComments();
		}
	}

	previousComments() {
		if (this.comment_offset > 0){
			this.comment_offset -= 5;
			this.synchComments();
		}
	}
}
