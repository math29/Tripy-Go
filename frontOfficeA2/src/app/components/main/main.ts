/// <reference path="../../../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../../../typings/jquery.ui.datetimepicker/jquery.ui.datetimepicker.d.ts" />

import {Component, ElementRef, AfterViewInit} from 'angular2/core';
import { DATEPICKER_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

declare var jQuery: JQueryStatic;

@Component({
  selector: 'main',
  templateUrl: 'app/components/main/main.html',
  styleUrls: ['app/components/main/main.css'],
  providers: [],
  directives: [DATEPICKER_DIRECTIVES],
  pipes: []
})
export class Main implements AfterViewInit {
	date: Date = new Date();

	constructor(private el: ElementRef) {
    }

	ngAfterViewInit() {
		jQuery(this.el.nativeElement)
			.find('#depart_date')
			.datepicker({ minDate: -0, maxDate: "+3M" });
	}
}
