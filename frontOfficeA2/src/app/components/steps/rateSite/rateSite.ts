import { Component, OnInit } from '@angular/core';
import { RouterLink, RouteParams } from '@angular/router-deprecated';
import { Http, RequestOptions, Headers } from '@angular/http';
import { AuthService } from '../../../tripy_go_lib/services/auth.service';
import { SiteService, RateService } from '../../travelPage/services/index';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';

import { RatingComponent } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
	selector: 'rateSite',
	templateUrl: 'app/components/steps/rateSite/rateSite.html',
	styleUrls: ['app/components/steps/rateSite/rateSite.css'],
	providers: [ RateService, SiteService ],
	directives: [ RouterLink, RatingComponent, CORE_DIRECTIVES, FORM_DIRECTIVES ],
	pipes: []
})
export class RateSite implements OnInit{

	options_post: RequestOptions;
	site_id: string;
	site: any;

	public max:number = 5;
	public isReadonly:boolean = false;
	private siteContent : any;

	public overStar:number;
	public percent:number;
	private rates: any = {
		ergo_rate: 5,
		content_rate: 0
	};

	private previous_rate : any = {
		ergo_rate: 0,
		content_rate: 0
	};
	private comment = "";

	constructor(private params: RouteParams, private _http: Http, private _auth: AuthService, private rateService : RateService, private siteService: SiteService) {
		this.options_post = new RequestOptions({ headers: _auth.getBearerHeaders() });
		this.site_id = params.get('site_id');
	}

	getMyRates() {
		this.rateService.getMyRate(this.siteContent.transport.ergo_rate._id)
		  .subscribe(success => {
		    this.rates.ergo_rate = 0;
		    if(success.status == 200 ) {
		      this.rates.ergo_rate = success.data.action;
		    }
		    this.previous_rate = JSON.parse(JSON.stringify(this.rates));
		  }, error => {
		    console.log('error ergo: '+ JSON.stringify(error));
		  });
		this.rateService.getMyRate(this.siteContent.transport.content_rate._id)
		  .subscribe(success => {
		    if(success.status == 200) {
		      this.rates.content_rate = success.data.action;
		    }else {
		      this.rates.content_rate = 0;
		    }
		    this.previous_rate = JSON.parse(JSON.stringify(this.rates));
		  }, error => console.log('error content: '+ JSON.stringify(error)));
	}

	getMyComment() {
		this.siteService.getMyComment('transport', this.site.site_id)
		  .subscribe(success => {
		    if(success.status == 200) {
		      this.comment = success.data.comment;
		    }else {
		      this.comment = '';
		    }
		}, error => {});
	}

	commentThisSite() {
		this.siteService.commentThisSite('transport', this.site_id, this.comment)
			.subscribe(success => {}, error => {});
	}

	public hoveringOver(value:number):void {
	this.overStar = value;
	this.percent = 100 * (value / this.max);
	};

	public resetStar(rate:string, v:any):void {
		if(this.rates[rate] != this.previous_rate[rate]) {
		this.rateService.updateRate(this.siteContent.transport[rate]._id, this.rates[rate])
		.subscribe(success => {}, error => {});
		this.previous_rate[rate] = this.rates[rate];
		}
		this.overStar = void 0;
	}

	ngOnInit() {
    this.siteService.getThisSite(this.site_id)
      .subscribe(success => {
        this.siteContent = success;
      }, error => {console.log('error');}
    );
  }
}
