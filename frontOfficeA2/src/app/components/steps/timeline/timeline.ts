import {Component, Input, OnInit} from 'angular2/core';
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
	@Input() instanceId;
	options_post: RequestOptions;

	instance: any;

	constructor(private _http: Http, private _auth: AuthService) {
		this.options_post = new RequestOptions({ headers: _auth.getBearerHeaders() });
	}

	// ***************************************
	// Get the selected timeline and store it into timeline_instance vars
	// ***************************************
	getTimeline() {
		this._http.get('/api/timeline/570a418de80725d519eb5d2e', this.options_post)
			.map(res => res.json())
			.subscribe(timeline => {
				this.instance = timeline;
				console.log(this.instance);
			})
	}


	ngOnInit() {
		this.getTimeline();
	}
}