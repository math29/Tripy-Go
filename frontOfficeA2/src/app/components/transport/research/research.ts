import {Component} from 'angular2/core';
import { RouterLink } from 'angular2/router';

@Component({
	selector: 'research',
	templateUrl: 'app/components/transport/research/research.html',
	// styleUrls: ['app/components/transport/listingPropositions/listingPropositions.css'],
	providers: [],
	directives: [RouterLink],
	pipes: []
})
export class Research {

	constructor() {
	}
}
