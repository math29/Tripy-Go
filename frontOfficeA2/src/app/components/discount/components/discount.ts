import {Component, Input} from 'angular2/core';
import { ROUTER_DIRECTIVES, Router } from 'angular2/router';

@Component({
	selector: 'discount',
	templateUrl: 'app/components/discount/components/discount.html',
	styleUrls: ['app/components/discount/components/discount.css'],
	providers: [],
	directives: [ROUTER_DIRECTIVES],
	pipes: []
})
export class Promo {
	@Input() discount;

	constructor(private router: Router) { }

	navigateTo() {
		window.location.href = '/api/promos/'+ this.discount._id;
	}
}
