import {Component} from 'angular2/core';
import { RouterLink } from 'angular2/router';

@Component({
	selector: 'listing-propositions',
	templateUrl: 'app/components/transport/listingPropositions/listingPropositions.html',
	// styleUrls: ['app/components/transport/listingPropositions/listingPropositions.css'],
	providers: [],
	directives: [RouterLink],
	pipes: []
})
export class ListingPropositions {

	constructor() {
	}
}
