import {Component, Input} from '@angular/core';
import {DatePipe} from '@angular/common';
import { ROUTER_DIRECTIVES, Router } from '@angular/router-deprecated';

@Component({
	selector: 'advice',
	templateUrl: 'app/components/advices/components/advice.html',
	styleUrls: ['app/components/advices/components/advice.css'],
	providers: [],
	directives: [ROUTER_DIRECTIVES],
	pipes: [DatePipe]
})
export class Advice {
	@Input() advice;

	constructor(private router: Router) { }

	navigateTo() {
		window.location.href = this.advice.url;
	}

	stringAsDate(dateStr) {
		return new Date(dateStr);
	}
}
