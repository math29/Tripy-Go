import {Component} from 'angular2/core';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Response} from 'angular2/http';
import {TimelineService} from '../../services/timelineService';
import {OperationsService} from '../../services/operationsService';

import {Location, RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'timeline',
  templateUrl: 'views/components/utils/timeline.html',
  providers: [TimelineService, OperationsService],
  directives: [ROUTER_DIRECTIVES],
  inputs: ['timelines', 'timelineIndex']
})
export class TimelineCmp{
  timelines: any;
  timelineIndex: any;

  getClass(index: number){
    if(index%2 == 1){
      return "timeline-inverted";
    }else{
      return "";
    }
  }


}
