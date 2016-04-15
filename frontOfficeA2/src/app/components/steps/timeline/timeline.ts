import {Component, Input, OnChanges, SimpleChange} from 'angular2/core';
import { RouterLink, RouteParams } from 'angular2/router';
import { Http, RequestOptions, Headers } from 'angular2/http';
import { AuthService } from '../../../tripy_go_lib/services/auth.service';
import { MarkdownPipe } from '../../../tripy_go_lib/pipes/marked';

@Component({
	selector: 'timeline',
	templateUrl: 'app/components/steps/timeline/timeline.html',
	styleUrls: ['app/components/steps/timeline/timeline.css'],
	providers: [],
	directives: [RouterLink],
	pipes: []
})
export class Timeline {
	@Input() name;
	options_post: RequestOptions;

	instance: any;

	constructor(private _http: Http, private _auth: AuthService) {
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
				console.log(this.instance);
			})
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
}