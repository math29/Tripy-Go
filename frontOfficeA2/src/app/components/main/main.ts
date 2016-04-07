/// <reference path="../../../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../../../typings/jquery.ui.datetimepicker/jquery.ui.datetimepicker.d.ts" />

import {Component, ElementRef, AfterViewInit, OnInit, EventEmitter } from 'angular2/core';
import { DATEPICKER_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import { FormBuilder, ControlGroup, Validators, Control } from 'angular2/common';
import { Http, Headers, RequestOptions } from 'angular2/http';
import { Router } from 'angular2/router';
import { AuthService } from '../../tripy_go_lib/services/auth.service';

import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

declare var jQuery: JQueryStatic;
declare var google: any;

@Component({
  selector: 'main',
  templateUrl: 'app/components/main/main.html',
  styleUrls: ['app/components/main/main.css'],
  providers: [FormBuilder],
  directives: [DATEPICKER_DIRECTIVES],
  pipes: []
})
export class Main implements AfterViewInit, OnInit {
	// Form Gesture
	startForm: ControlGroup;
    departure: Control;
    arrival: Control;
    date_departure: Control;
    date_return: Control;

	departure_place: any;
	arrival_place: any;

	travelRequest: any;

	// Options Available
	options: RequestOptions;
	options_auth: RequestOptions;
	options_post: RequestOptions;

	googleApiKey: String = "AIzaSyCbbSgj5Sk0_eiC9TAIbr2Un_trdaUOuwY";

	// Errors Gesture
	login_error: String;

	constructor(private el: ElementRef, fb: FormBuilder, private _http: Http, private _auth: AuthService, private _router: Router) {
		this.departure = fb.control('', Validators.compose([Validators.required]));
		this.arrival = fb.control('', Validators.compose([Validators.required]));
		this.date_departure = fb.control('');
		this.date_return = fb.control('');

		this.startForm = fb.group({
			departure: this.departure,
			arrival: this.arrival,
			date_departure: this.date_departure,
			date_return: this.date_return
		});

		let headers = new Headers({
		});
		this.options = new RequestOptions({ headers: headers });

		let headers_post = new Headers({
			'Content-Type': 'application/json'
		});
		this.options_post = new RequestOptions({ headers: headers_post });

		this.options_post = new RequestOptions({ headers: _auth.getBearerHeaders() });
    }

    // *******************************************************************************************
    // Fonction Called on form "Let's Started" Submit
    // The following actions are displayed :
    // - Check the Form validity
    // - Get the Author and store it in our json object
    // - Converte arrival and departure inputs to dates and store it into our json object
    // - Lunch the persisting processus with the Locations persisting
    // *******************************************************************************************
    startWithSubmit() {
		if (!this._auth.isAuthed()) {
			this.login_error = "Vous devez être connecté pour pouvoir vous lancer dans l'aventure ! :)";
		}
		else if (this.startForm.valid) {
			// Add User if connected - Null else
			this.travelRequest = this.startForm.value;
			if (this._auth.isAuthed()) this.travelRequest.author = this._auth.getMe();
			else this.travelRequest.author = null;

			// Update and format DatePickers Departure and return
			let r_datepicker = jQuery(this.el.nativeElement)
				.find('.return_date')
				.data()
				.datepicker;
			let r_date = new Date(r_datepicker.selectedYear, r_datepicker.selectedMonth, r_datepicker.selectedDay);
			this.travelRequest.date_return = r_date;

			let d_datepicker = jQuery(this.el.nativeElement)
				.find('.depart_date')
				.data()
				.datepicker;
			let d_date = new Date(d_datepicker.selectedYear, d_datepicker.selectedMonth, d_datepicker.selectedDay);
			this.travelRequest.date_departure = d_date;

			// Let's begin persisting processus of the new Travel with the Locations persisting
			this.persistLocations();
		}
	}

	// *******************************************************************************************
	// Simultaneous requests to our Location API to determine if locations already exist or not
	// IF IT EXIST :
	// - Get location Id and Go to transport persisting
	// IF NOT :
	// - Googe GeoCode API to get some informations on selected places
	// - Extract COUNTRY CODE from Geocode Response
	// - Find Country concerned in our BDD
    // - Persist those informations in our BDD & get id of new locations
    // - Go to transport persisting
    // *******************************************************************************************
    persistLocations() {
		let self = this;
		let nbReqs = 2;

		this._http.get('/api/locations/name/' + this.departure.value, this.options)
			.map(res => res.json())
			.subscribe(locations => {
				if (locations.length == 0){
					self._http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + self.departure.value + '&key=' + self.googleApiKey, self.options)
						.map(res => res.json().results[0])
						.subscribe(response => {
							// Find the Short Code Country
							var country_code = self.getCountryCode(response);

							self._http.get('/api/countries/country_code/' + country_code, self.options_post)
								.map(res => res.json())
								.map(res => res[0]._id)
								.subscribe(country_code_id => {
									let departure =
										{
											name: self.departure.value,
											country: country_code_id,
											loc: [response.geometry.location.lat, response.geometry.location.lng]
										};
									console.log(country_code_id);
									// Post new Location getted from Google Geocode API
									self._http.post('/api/locations', JSON.stringify(departure), self.options_post)
										.map(res => res.json())
										// .map(res => res._id)
										.subscribe(
										location_id => {
											self.departure_place = location_id;
											nbReqs--;
											if (!nbReqs) self.persistTransport();
										},
										error => {
											console.log("Il faudrait gérer ici l'ajout du pars manquant !");
											console.log(JSON.stringify(error));
										}
										);
								},
								error => {
									console.log(JSON.stringify(error));
								});
						}
						);
				}else{
					self.departure_place = locations[0]._id;
					nbReqs--;
					if (!nbReqs) self.persistTransport();
				}
			});

		this._http.get('/api/locations/name/' + this.arrival.value, this.options)
			.map(res => res.json())
			.subscribe(locations => {
				if (locations.length == 0) {
					self._http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + self.arrival.value + '&key=' + self.googleApiKey, self.options)
						.map(res => res.json().results[0])
						.subscribe(response => {
							// Find the Short Code Country
							let country_code = self.getCountryCode(response);

							self._http.get('/api/countries/country_code/' + country_code, self.options_post)
								.map(res => res.json()[0]._id)
								.subscribe(country_code_id => {
									let arrival =
										{
											name: self.arrival.value,
											country: country_code_id,
											loc: [response.geometry.location.lat, response.geometry.location.lng]
										};

									// Post new Location getted from Google Geocode API
									self._http.post('/api/locations', JSON.stringify(arrival), self.options_post)
										.map(res => res.json())
										// .map(res => res._id)
										.subscribe(
										location_id => {
											self.arrival_place = location_id;
											nbReqs--;
											if (!nbReqs) self.persistTransport();
										},
										error => {
											console.log(JSON.stringify(error));
										}
										);
								},
								error => {
									console.log("Il faudrait gérer ici l'ajout du pars manquant !");
									console.log(JSON.stringify(error));
								});
							}
							);
				} else {
					self.arrival_place = locations[0]._id;
					nbReqs--;
					if (!nbReqs) self.persistTransport();
				}
			});
    }

    // *******************************************************************************************
    // This function extract the COUNTRY CODE from the Geocode Response
    // *******************************************************************************************
    getCountryCode(response) {
		for (var i = 0; i < response.address_components.length; i++) {
			for (var b = 0; b < response.address_components[i].types.length; b++) {
				if (response.address_components[i].types[b] == "country") {
					return response.address_components[i].short_name;
				}
			}
		}
		return "";
    }

    // *******************************************************************************************
    // Persist New Transport (use the two Locations previously created)
    // *******************************************************************************************
	persistTransport() {
		let transport = {
			departure: this.departure_place,
			arrival: this.arrival_place,
			date_departure: this.travelRequest.date_departure
		}

		this._http.post('/api/transports', JSON.stringify(transport), this.options_post)
			.map(res => res.json()._id)
			.subscribe(
			location_id => {
				this.travelRequest.transports = [location_id];
				this.persistTravel();
			},
			error => {
				console.log(JSON.stringify(error));
			}
			);
	}

	// *******************************************************************************************
	// Persist new Travel (use the transport previously created)
	// *******************************************************************************************
	persistTravel() {
		delete this.travelRequest.departure;
		delete this.travelRequest.arrival;

		this._http.post('/api/travels', JSON.stringify(this.travelRequest), this.options_post)
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

	// *******************************************************************************************
	// Initialization With JQuery Datepicker
	// *******************************************************************************************
	ngAfterViewInit() {
		jQuery(this.el.nativeElement)
			.find('.depart_date')
			.datepicker({ minDate: -0, maxDate: "+3M" });

		jQuery(this.el.nativeElement)
			.find('.return_date')
			.datepicker({ minDate: -0, maxDate: "+3M" });
	}

	// *******************************************************************************************
	// Initialization Inputs with Google autocomplete API
	// *******************************************************************************************
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
}
