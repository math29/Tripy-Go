import {Component,EventEmitter, Output} from '@angular/core';
import {Response} from '@angular/http';
import {TimelineService} from '../../services/timelineService';
import {OperationsService} from '../../services/operationsService';
import {MarkdownPipe} from '../../tripy-lib/pipes/marked';

import {RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

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

  /**
   * Récupére la classe de l'opération dans la timeline
   *
   */
  getClass(index: number){
    if(index%2 == 1){
      return "timeline-inverted";
    }else{
      return "";
    }
  }

  /**
   * Monte ou descend une opération dans la timeline
   *
   * @param side -1 pour descendre l'opération, 1 pour monter l'opération
   * @param operationId opération à bouger
   * @param timelineId dans quelle timeline bouger l'opération
   *
   */
  moveOperation(side: number, operationId: string, timelineId){
    let s = "up";
    if(side == -1){
      s = "down";
    }
    this._timelineService.moveOperation(timelineId, operationId, s)
      .subscribe(data => this.onUpdate.emit({'type':'message','message':'Opération déplacée'}),
      errors => this.onUpdate.emit({'type':'error','message':"Impossible de déplacer l'opération"}));
  }

  /**
   * Supprime une opération d'une timeline
   *
   * @param timeline timeline de laquelle on veut supprimer l'opération
   * @param operationId opération à supprimer
   *
   */
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
        this._operationsService.saveOperation(operation).subscribe(data =>
          this.onUpdate.emit({'type':'message', 'message':'L\'opération à été supprimée de la timeline'}),
          error => this.onUpdate.emit({'type':'error','message':'Impossible de supprimer l\'opération de la timeline'})
        );
      }else{
        this.onUpdate.emit({'type':'error', 'message':'L\'opération n\'éxiste pas'});
      }
  }

  /**
   * Trouve l'index de l'opération dans la timeline
   *
   * @param timeline objet timeline dans lequel on doit chercher l'opération
   * @param operation opération à chercher
   *
   * @return index de l'opération ou -1 si elle n'est pas dans la timeline
   */
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
