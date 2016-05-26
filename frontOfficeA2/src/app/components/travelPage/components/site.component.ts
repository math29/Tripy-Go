import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { RatingComponent } from 'ng2-bootstrap/ng2-bootstrap';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import { SiteService } from '../services/site.service';


@Component({
    selector: 'site',
    templateUrl: 'app/components/travelPage/components/site.component.html',
    directives: [RatingComponent, CORE_DIRECTIVES, FORM_DIRECTIVES],
    providers: [],
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
  private rates: any = [];

  constructor(private siteService : SiteService) {

  }

  ngOnInit() {
    this.siteService.getThisSite(this.site.site_id)
      .subscribe(success => {
        this.siteContent = success;
      }, error => {console.log('error');}
    );
  }

  ngOnDestroy() {
  }

  public hoveringOver(value:number):void {
    this.overStar = value;
    this.percent = 100 * (value / this.max);
  };

  public resetStar():void {
    this.overStar = void 0;
  }

}
