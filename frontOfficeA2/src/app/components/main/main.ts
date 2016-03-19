/// <reference path="../../../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../../../typings/jquery.ui.datetimepicker/jquery.ui.datetimepicker.d.ts" />

import {Component, ElementRef, AfterViewInit, OnInit, EventEmitter } from 'angular2/core';
import { DATEPICKER_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import { FormBuilder, ControlGroup, Validators, Control } from 'angular2/common';
import { Http, Headers, RequestOptions } from 'angular2/http';
import { Router } from 'angular2/router';
import { AuthService } from '../../tripy_go_lib/auth.service';

import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

declare var jQuery: JQueryStatic;
declare var google: any;

@Component({
  selector: 'main',
  templateUrl: 'app/components/main/main.html',
  styleUrls: ['app/components/main/main.css'],
  providers: [FormBuilder, AuthService],
  directives: [DATEPICKER_DIRECTIVES],
  pipes: []
})
export class Main implements AfterViewInit, OnInit {
	// Form Gesture
	startForm: ControlGroup;
    departure: Control;
    arrival: Control;
    date_departure: Control;

	departure_place: any;
	arrival_place: any;

	googleApiKey: String = "AIzaSyCbbSgj5Sk0_eiC9TAIbr2Un_trdaUOuwY";

	constructor(private el: ElementRef, fb: FormBuilder, private _http: Http, private _auth: AuthService, private _router: Router) {
		this.departure = fb.control('');
		this.arrival = fb.control('');
		this.date_departure = fb.control('');

		this.startForm = fb.group({
			departure: this.departure,
			arrival: this.arrival,
			date_departure: this.date_departure
		});
    }

    // Simultaneous requests to Googe GeoCode API to get some informations on selected places
    // Use Observable system to indicate if the two requests are ended
    startPreSubmit(): Observable<any> {
		let emitter = new EventEmitter();
		let nbReqs = 2;
		let headers = new Headers({
		});
		let options = new RequestOptions({ headers: headers });

		this._http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.departure.value + '&key=' + this.googleApiKey, options)
			.map(res => res.json())
			.map(res => res.results[0].geometry.location)
			.subscribe(response => {
					this.departure.updateValue(
						{
							name: this.departure.value,
							loc: [response.lat, response.lng]
						}
					);
					nbReqs--;
					emitter.emit(nbReqs);
				}
			);

		this._http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.arrival.value + '&key=' + this.googleApiKey, options)
			.map(res => res.json())
			.map(res => res.results[0].geometry.location)
			.subscribe(response => {
					this.arrival.updateValue(
						{
							name: this.arrival.value,
							loc: [response.lat, response.lng]
						}
					);
					nbReqs--;
					emitter.emit(nbReqs);
				}
			);

		return emitter;
    }

    // Fonction Called on form "Let's Started" Submit
    startWithSubmit() {
		this.startPreSubmit()
			.subscribe(res => {
				if (this.startForm.valid && res == 0) {
					console.log(this.departure.value);
					console.log(this.arrival.value);
					// Add User if connected - Null else
					let data = this.startForm.value;
					if (this._auth.isAuthed()) data.author = this._auth.getMe();
					else data.author = null;

					// Post new Travel
					let headers = new Headers({
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + this._auth.getToken()
					});
					let options = new RequestOptions({ headers: headers });
					console.log(data)
					this._http.post('/api/travels', JSON.stringify(data), options)
						.map(res => res.json())
						.map(res => res._id)
						.subscribe(
							response => {
								this._router.navigate(['ListingPropositions', { id: response }]);
							},
							error => {
								console.log(JSON.stringify(error));
							}
						);
				}
			});
	}

	ngAfterViewInit() {
		jQuery(this.el.nativeElement)
			.find('.depart_date')
			.datepicker({ minDate: -0, maxDate: "+3M" });
	}

	ngOnInit() {
		let _this = this;
        let input_departure: any = document.getElementById('input-departure');
        let input_arrival: any = document.getElementById('input-arrival');
        let autocomplete_d = new google.maps.places.Autocomplete(input_departure, {});
        let autocomplete_a = new google.maps.places.Autocomplete(input_arrival, {});

        google.maps.event.addListener(autocomplete_d, 'place_changed', function() {
            let place = autocomplete_d.getPlace();
            _this.departure.updateValue(place.formatted_address);
            _this.departure_place = place;
        });

        google.maps.event.addListener(autocomplete_a, 'place_changed', function() {
            let place = autocomplete_a.getPlace();
            _this.arrival.updateValue(place.formatted_address);
            _this.arrival_place = place;
        });
    }

	updateDateModel() {
		// Update Date Form model when changement (need to do this because of JQuery action)
		let datepicker = jQuery(this.el.nativeElement)
			.find('.depart_date')
			.data()
			.datepicker;
		let date = new Date(datepicker.selectedYear, datepicker.selectedMonth, datepicker.selectedDay);
		this.date_departure.updateValue(date);
	}
}
