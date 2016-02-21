import {Component} from 'angular2/core';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Response} from 'angular2/http';
import {StatsCmp} from '../utils/stats';
import {TimelineService} from '../../services/timelineService';
import {OperationsService} from '../../services/operationsService';

import {Location, RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'timelines',
  templateUrl: 'views/components/timelines/main.html',
  providers: [TimelineService, OperationsService],
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

    constructor(private _timelineService: TimelineService, private _operationsService: OperationsService){}

    getTimelines(){
      this._timelineService.getTimelines().subscribe(res => {
        this.timelines = res;
        this.timelines = JSON.parse(this.timelines._body);
        console.log(this.timelines);
        }, error => {this.errors.push("Impossible de récupérer les timelines");});
    }

    getOperations(){
      this._operationsService.getOperations().subscribe(res => {this.operations = res; this.operations = JSON.parse(this.operations._body);}, error => {this.errors.push("Impossible de récupérer les opérations");});
    }

    ngOnInit(){
      this.getOperations();
      this.getTimelines();
    }

   textIsValid(text){
      var valid = true;

      if(typeof text === 'undefined' || text.length === 0 ){
        valid = false;
      }

      return valid;
    }

    createOperation(){
      this.operationEdit = {};
    }

    getIndexOfOperation(operation, list){
      for(var i = 0; i< list.length; i++){
        if(list[i]._id === operation._id){
          return i;
        }
      }
      return -1;
    }

    createTimeline(){}

    isTimelineOnOperation(timeline:any, operation:any){}

    addToTimeline(operation:any){}

    createThisTimeline(){}

    saveOperation(operation:any){}

}
