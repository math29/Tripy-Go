import {Component, Input} from 'angular2/core';
import { Http, RequestOptions, Headers } from 'angular2/http';

@Component({
	selector: 'comparator',
	template: `
		<div class="cruise-list-view" *ngIf="comparator">
			<div class="col-md-4 clear-padding">
				<img *ngIf="comparator.company.img" [src]="comparator.company.img" [alt]="comparator.company.name">
			</div>
			<div class="col-md-5 clear-padding booking-box text-center">
				<h2>{{ comparator.company.name }}</h2>
			</div>
			<!-- <div class="clearfix-sm"></div> -->
			<div class="col-md-3 booking-box clear-padding text-center">
				<div class="rating-box">
					<i class="fa fa-star"></i>
					<i class="fa fa-star"></i>
					<i class="fa fa-star"></i>
					<i class="fa fa-star"></i>
					<i class="fa fa-star-o"></i>
					<h5>Ergonomie</h5>
				</div>
				<div class="rating-box">
					<i class="fa fa-star"></i>
					<i class="fa fa-star"></i>
					<i class="fa fa-star"></i>
					<i class="fa fa-star"></i>
					<i class="fa fa-star-o"></i>
					<h5>Contenu</h5>
				</div>
			</div>
			<div class="comments-button">
				<!-- <a (click)="">
					<i class="fa fa-chevron-down" aria-hidden="true"></i>
					<!-- <i class="fa fa-chevron-up" aria-hidden="true"></i> -->
				</a> -->
			</div>
		</div>
	`,
	styles: [`
		.comments-button {
			position: absolute;
			bottom: 0;
			width: 100 %;
			text-align: center;
		}

		.comments - button i {
			padding: 10px 25px 10px 25px;
			margin-bottom: 0px;
			background: #F2676B;
			color: white;
			cursor: pointer;
		}
	`],
	providers: [],
	directives: [],
	pipes: [],
	inputs: ['comparator']
})
export class TransportComparatorCmp {
	private comparator: any;
	constructor(){
		console.log(this.comparator);
	}
}