import {Component, Input, OnInit} from 'angular2/core';
import { Http, RequestOptions, Headers } from 'angular2/http';
import { AuthService } from '../../../../../../tripy_go_lib/services/auth.service';
import { RateService } from '../../../../../../services/rate.service';

@Component({
	selector: 'comparatorComment',
	templateUrl: 'app/components/steps/transport/listingPropositions/transport-comparator/transport-comparator-comment/transport-comparator-comment.html',
	styleUrls: ['app/components/steps/transport/listingPropositions/transport-comparator/transport-comparator-comment/transport-comparator-comment.css'],
	providers: [RateService],
	directives: [],
	pipes: [],
	inputs: ['comment']
})
export class TransportComparatorComment {
	private comment: any;
	private rate_side: String;
	private options_post: RequestOptions;
  
	constructor(private _auth: AuthService, private _http: Http, private _rate: RateService) {
		this.options_post = new RequestOptions({ headers: _auth.getBearerHeaders() });
	}

	ngOnInit(){
		// Initialize aspect
		let rate = this.comment.rate;
		for (var i = 0; i < rate.raters.length; i++){
			if(rate.raters[i].user == this._auth.getMe()._id){
				switch (rate.raters[i].action){
					case 1:
						this.rate_side = "up";
						break;
					case -1:
						this.rate_side = "down";
						break;
				}
			}
		}
	}

	vote(side){
		this.rate_side = side;
		this._rate.updateStackRate(side, this.comment.rate._id)
			.subscribe(rate => {
				this.comment.rate = rate;
			});
	}
}