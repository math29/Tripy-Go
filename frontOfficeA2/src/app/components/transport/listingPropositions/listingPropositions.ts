import {Component} from 'angular2/core';
import { RouterLink, RouteParams } from 'angular2/router';

@Component({
	selector: 'listing-propositions',
	templateUrl: 'app/components/transport/listingPropositions/listingPropositions.html',
	// styleUrls: ['app/components/transport/listingPropositions/listingPropositions.css'],
	providers: [],
	directives: [RouterLink],
	pipes: []
})
export class ListingPropositions {
	travel_id: String;

	constructor(private params: RouteParams) {
		this.travel_id = params.get('id');
		console.log(this.travel_id);
	}
}
