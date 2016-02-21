import {Component} from 'angular2/core';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Response} from 'angular2/http';
import {StatsCmp} from '../utils/stats';

import {Location, RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'timelines',
  templateUrl: 'views/components/timelines/main.html',
  providers: [],
  directives: [ROUTER_DIRECTIVES, StatsCmp]
})
export class TimelinesCmp{
    private errors: any;
    private messages: any;

    private operationEdit:any = null;
    private newTimeline:any;
    private timelines: any = null;
    private operations:any = null;
    private createTimeLineValue:boolean = false;

    constructor(){}

    ngOnInit(){
    }

   textIsValid(text){
      var valid = true;

      if(typeof text === 'undefined' || text.length === 0 ){
        valid = false;
      }

      return valid;
    }

    createOperation(){}

    createTimeline(){}

    isTimelineOnOperation(timeline:any, operation:any){}

    addToTimeline(operation:any){}

    createThisTimeline(){}

    saveOperation(operation:any){}

}
