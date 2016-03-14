/// <reference path="../../../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../../../typings/jquery.ui.datetimepicker/jquery.ui.datetimepicker.d.ts" />

import {Component, ElementRef, AfterViewInit} from 'angular2/core';
import { DATEPICKER_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import { FormBuilder, ControlGroup, Validators, Control } from 'angular2/common';

declare var jQuery: JQueryStatic;

@Component({
  selector: 'main',
  templateUrl: 'app/components/main/main.html',
  styleUrls: ['app/components/main/main.css'],
  providers: [FormBuilder],
  directives: [DATEPICKER_DIRECTIVES],
  pipes: []
})
export class Main implements AfterViewInit {
	startForm: ControlGroup;
    departure: Control;
    arrival: Control;
    date: Control;

	constructor(private el: ElementRef, fb: FormBuilder) {
		this.departure = fb.control('');
		this.arrival = fb.control('');
		this.date = fb.control('');

		this.startForm = fb.group({
			departure: this.departure,
			arrival: this.arrival,
			date: this.date
		});
    }

    startWithSubmit() {
		console.log(this.startForm.value);
	}

	ngAfterViewInit() {
		let _this = this;
		jQuery(this.el.nativeElement)
			.find('.depart_date')
			.datepicker({ minDate: -0, maxDate: "+3M" });

		// Update Date Form model when changement (need to do this because of JQuery action)
		jQuery(this.el.nativeElement)
			.find('.depart_date')
			.change(function(){
				let datepicker = jQuery(_this.el.nativeElement)
					.find('.depart_date')
					.data()
					.datepicker;
				let date = new Date(datepicker.selectedYear, datepicker.selectedMonth, datepicker.selectedDay);
				_this.date.updateValue(date);
			})
	}
}
