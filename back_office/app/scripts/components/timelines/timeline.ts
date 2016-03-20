import {Component,EventEmitter, Output} from 'angular2/core';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Response} from 'angular2/http';
import {TimelineService} from '../../services/timelineService';
import {OperationsService} from '../../services/operationsService';
import {MarkdownPipe} from '../../pipes/marked';

import {Location, RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'timeline',
  templateUrl: 'views/components/utils/timeline.html',
  providers: [TimelineService, OperationsService],
  directives: [ROUTER_DIRECTIVES],
  inputs: ['timelines', 'timelineIndex', 'operations'],
  pipes: [MarkdownPipe]
})
export class TimelineCmp{
  @Output() onUpdate = new EventEmitter<any>();
  timelines: any;
  operations: any;
  timelineIndex: any;

  constructor(private _operationsService: OperationsService, private _timelineService: TimelineService){}

  getClass(index: number){
    if(index%2 == 1){
      return "timeline-inverted";
    }else{
      return "";
    }
  }

  moveOperation(side: number, operationId: string, timelineId){
    let s = "up";
    if(side == -1){
      s = "down";
    }
    console.log("Move");
    this._timelineService.moveOperation(timelineId, operationId, s).subscribe(data => this.onUpdate.emit({'type':'message','message':'Opération déplacée'}), errors => this.onUpdate.emit({'type':'error','message':"Impossible de déplacer l'opération"}));
  }

  deleteOperationFromTimeline(timeline: any, operationId: string){
    let operation = null;
    for(let i = 0; i < this.operations.length; i++){
        if(this.operations[i]._id == operationId){
          operation = this.operations[i];
          break;
        }
      }
      if(operation != null){
        let index = this.findTimelineInOperation(timeline, operation);
        if(index != -1){
          operation.steps.splice(index, 1);
        }
        console.log(operation);
        this._operationsService.saveOperation(operation).subscribe(data =>
          this.onUpdate.emit({'type':'message', 'message':'L\'opération à été supprimée de la timeline'}),
          error => this.onUpdate.emit({'type':'error','message':'Impossible de supprimer l\'opération de la timeline'})
        );
      }else{
        this.onUpdate.emit({'type':'error', 'message':'L\'opération n\'éxiste pas'});
      }
  }

  findTimelineInOperation(timeline:any, operation: any){
    if(operation.steps !== undefined){
      for(let i = 0; i < operation.steps.length; i++){
        if(operation.steps[i].id === timeline._id){
          return i;
        }
      }
    }

    return -1;
  }

}
