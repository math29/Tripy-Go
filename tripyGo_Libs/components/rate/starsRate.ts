import {Component, OnInit, OnDestroy} from 'angular2/core';
import {Response} from 'angular2/http';
import {Location, RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'stars-rate',
  template: `

            <div class="well well-sm">
                <div class="row">
                    <div class="col-xs-12 col-md-6 text-center">
                        <h1 class="rating-num">{{globalRate | number:'1.1-2'}}</h1>
                        <div class="rating">
                            <span class="glyphicon glyphicon-star"></span>
                            <span class="glyphicon glyphicon-star"></span>
                            <span class="glyphicon glyphicon-star"></span>
                            <span class="glyphicon glyphicon-star"></span>
                            <span class="glyphicon glyphicon-star-empty"></span>
                        </div>
                        <div>
                            <span class="glyphicon glyphicon-user"></span>{{userNumber}} votants
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-6" >
                        <div class="row rating-desc" *ngFor="#star of starsRange">
                            <div class="col-xs-3 col-md-3 text-right">
                                <span class="glyphicon glyphicon-star"></span>{{star.star}}
                            </div>
                            <div class="col-xs-8 col-md-9">
                                <div class="progress">
                                    <div class="progress-bar progress-bar-{{star.class}}" role="progressbar" aria-valuenow="20"
                                        aria-valuemin="0" aria-valuemax="100" style="width: {{star.value}}%">
                                        <span class="sr-only">{{star.value}}%</span>
                                    </div>
                                </div>
                            </div>
                            <!-- end 5 -->
                        </div>
                        <!-- end row -->
                    </div>
                </div>
            </div>

  `,
  styles:['body{ margin-top:20px;}',
'.glyphicon { margin-right:5px;}',
'.rating .glyphicon {font-size: 22px;}',
'.rating-num { margin-top:0px;font-size: 54px; }',
'.progress { margin-bottom: 5px;}',
'.progress-bar { text-align: left; }',
'.rating-desc .col-md-3 {padding-right: 0px;}',
'.sr-only { margin-left: 5px;overflow: visible;clip: auto; }'],
  providers: [],
  directives: [ROUTER_DIRECTIVES],
})
export class StarsRateCmp{
  private idUp:string;
  private idDown:string;
  private globalRate: number = 4.0;
  private userNumber: number = 10;
  private starsRange: any[] = [{
    star: 4,
    value: 80,
    class: 'success'
  },
  {
    star: 4,
    value: 60,
    class: 'success'
  },
  {
    star: 3,
    value: 40,
    class:'info'
  },
  {
    star: 2,
    value: 20,
    class:'warning'
  },
  {
    star: 1,
    value: 10,
    class: 'danger'
  }
];

constructor(){
}

ngOnInit(){
}

ngOnDestroy(){
}
}
