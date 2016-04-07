/// <reference path="../../../../../../typings/jquery/jquery.d.ts" />

import {Component, OnInit, ElementRef} from 'angular2/core';
import { RouterLink, RouteParams } from 'angular2/router';
import { Http, RequestOptions, Headers } from 'angular2/http';
import { AuthService } from '../../../tripy_go_lib/services/auth.service';

declare var jQuery: JQueryStatic;

@Component({
	selector: 'research',
	templateUrl: 'app/components/transport/research/research.html',
	styleUrls: ['app/components/transport/research/research.css'],
	providers: [],
	directives: [RouterLink],
	pipes: []
})
export class Research implements OnInit {
	comparator: any;
	options_post: RequestOptions;

	iframe_height: number;

	constructor(private params: RouteParams, private _http: Http, private _auth: AuthService, private el: ElementRef) {
		this.options_post = new RequestOptions({ headers: _auth.getBearerHeaders() });
	}

	// ***************************************
	// Get the selected comparator and store it into comparator vars
	// ***************************************
	getComparator(id:String) {
		this._http.get('/api/transport/comparator/' + id, this.options_post)
			.map(res => res.json())
			.subscribe(comparator => {
				this.comparator = comparator;
			});
	}

	ngOnInit() {
		this.getComparator(this.params.get('id'));

		this.iframe_height = window.innerHeight -87 -50;
	}
}
