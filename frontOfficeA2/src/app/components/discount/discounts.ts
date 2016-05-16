import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES, Router } from 'angular2/router';
import { Promo } from './components/discount';
import { DiscountService } from '../../services/discount.service';

@Component({
	selector: 'discounts',
	templateUrl: 'app/components/discount/discounts.html',
	styleUrls: ['app/components/discount/discounts.css'],
	providers: [ DiscountService ],
	directives: [ROUTER_DIRECTIVES, Promo],
	pipes: []
})
export class Promos implements OnInit {
  private discounts: any;

	constructor(private _router: Router, private discountService: DiscountService) { }

  ngOnInit() {
    this.discountService.getDiscounts().subscribe(res => this.discounts = res);
  }

}
