import {Component, Input, OnChanges, SimpleChange} from '@angular/core';
import { RouterLink } from '@angular/router-deprecated';
import { Http, RequestOptions } from '@angular/http';
import { AuthService } from '../../../tripy_go_lib/services/auth.service';
import { MarkdownPipe } from '../../../tripy_go_lib/pipes/marked';
import { RateService } from '../../../services/rate.service';

@Component({
	selector: 'timeline',
	templateUrl: 'app/components/steps/timeline/timeline.html',
	styleUrls: ['app/components/steps/timeline/timeline.css'],
	providers: [RateService],
	directives: [RouterLink],
	pipes: [MarkdownPipe]
})
export class Timeline {
	@Input() name;
	options_post: RequestOptions;

	instance: any;
	step: number = 0;

	rate_side: string;

	constructor(private _http: Http, private _auth: AuthService, private _rate: RateService) {
		this.options_post = new RequestOptions({ headers: _auth.getBearerHeaders() });
	}

	// ***************************************
	// Get the selected timeline and store it into timeline_instance vars
	// ***************************************
	getTimeline() {
		this._http.get('/api/timeline/name/' + this.name, this.options_post)
			.map(res => res.json())
			.subscribe(timeline => {
				this.instance = timeline;
				this.updateRateDesign();
			})
	}

	// ***************************************
	// Timeline Navigation Gesture
	// ***************************************
	nextStep() {
		this.step++;
		this.updateRateDesign();
	}

	previousStep() {
		this.step--;
		this.updateRateDesign();
	}


	ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
		// We get the new instance timeline id to get the timeline
		for (let propName in changes) {
			if(propName == "name"){
				let name = changes[propName].currentValue;
				this.getTimeline();
			}
		}
	}

	// Vote parte
	vote(side) {
		this.rate_side = side;
		this._rate.updateStackRate(side, this.instance.operations[this.step].rate._id)
			.subscribe(rate => {
				this.instance.operations[this.step].rate = rate;
			});
	}

	updateRateDesign(){
		// Initialize aspect
		let rate = this.instance.operations[this.step].rate;
		for (var i = 0; i < rate.raters.length; i++) {
			if (rate.raters[i].user == this._auth.getMe()._id) {
				switch (rate.raters[i].action) {
					case 1:
						this.rate_side = "up";
						break;
					case -1:
						this.rate_side = "down";
						break;
				}
			}
		}
	}
}
