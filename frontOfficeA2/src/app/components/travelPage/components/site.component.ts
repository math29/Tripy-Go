import { Component, EventEmitter, Input, Output, OnInit, OnDestroy, ApplicationRef } from '@angular/core';
import { RatingComponent } from 'ng2-bootstrap/ng2-bootstrap';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import { SiteService, RateService } from '../services/index';


@Component({
    selector: 'site',
    templateUrl: 'app/components/travelPage/components/site.component.html',
    directives: [RatingComponent, CORE_DIRECTIVES, FORM_DIRECTIVES],
    providers: [ RateService ],
    styleUrls: ['app/components/travelPage/components/site.component.css'],
    pipes: []
})

export class SiteCmp implements OnInit, OnDestroy {
  @Input() site: any;
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
  private comment_view: boolean = false;

  constructor(private siteService : SiteService, private rateService : RateService, private _ref: ApplicationRef) {

  }

  ngOnInit() {
    this.siteService.getThisSite(this.site.site_id)
      .subscribe(success => {
        this.siteContent = success;
        this.getMyRates();
        this.getMyComment();
      }, error => {console.log('error');}
    );
  }

  ngOnDestroy() {
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
    this.siteService.commentThisSite('transport', this.site.site_id, this.comment)
      .subscribe(success => {}, error => {});
    this.comment_view = !this.comment_view;
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

}
