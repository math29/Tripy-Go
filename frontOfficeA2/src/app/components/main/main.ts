/// <reference path="../../../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../../../typings/jquery.ui.datetimepicker/jquery.ui.datetimepicker.d.ts" />

import {Component, ElementRef, AfterViewInit} from 'angular2/core';
import { DATEPICKER_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import { FormBuilder, ControlGroup, Validators, Control } from 'angular2/common';
import {Http, Headers, RequestOptions} from 'angular2/http';
import { AuthService } from '../../tripy_go_lib/auth.service';

declare var jQuery: JQueryStatic;

@Component({
  selector: 'main',
  templateUrl: 'app/components/main/main.html',
  styleUrls: ['app/components/main/main.css'],
  providers: [FormBuilder, AuthService],
  directives: [DATEPICKER_DIRECTIVES],
  pipes: []
})
export class Main implements AfterViewInit {
	startForm: ControlGroup;
    departure: Control;
    arrival: Control;
    date_departure: Control;

	constructor(private el: ElementRef, fb: FormBuilder, private _http: Http, private _auth: AuthService) {
		this.departure = fb.control('');
		this.arrival = fb.control('');
		this.date_departure = fb.control('');

		this.startForm = fb.group({
			departure: this.departure,
			arrival: this.arrival,
			date_departure: this.date_departure
		});
    }

    startWithSubmit() {
		// console.log(this._auth.getToken());
		if (this.startForm.valid){
			let headers = new Headers({
				'Content-Type': 'application/json',
				'Authorization': 'bearer ' + this._auth.getToken()
			});
			let options = new RequestOptions({ headers: headers });
			this._http.post('/api/travels', JSON.stringify(this.startForm.value), options)
				.subscribe(
				response => {
					console.log(response);
				},
				error => {
					console.log(JSON.stringify(error));
				}
				);
		}
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
				_this.date_departure.updateValue(date);
			})
	}
}
