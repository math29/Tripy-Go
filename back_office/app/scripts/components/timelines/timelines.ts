/// <reference path="../../../../../typings/socket.io-client/socket.io-client.d.ts" />

import {Component, OnInit, OnDestroy} from 'angular2/core';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Response} from 'angular2/http';
import {StatsCmp} from '../utils/stats';
import {TimelineService} from '../../services/timelineService';
import {OperationsService} from '../../services/operationsService';
import {TimelineCmp} from './timeline';
import {MarkdownPipe} from '../../pipes/marked';

import {Location, RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import * as io from 'socket.io-client';

@Component({
  selector: 'timelines',
  templateUrl: 'views/components/timelines/main.html',
  providers: [TimelineService, OperationsService],
  directives: [ROUTER_DIRECTIVES, StatsCmp, TimelineCmp],
  pipes: [MarkdownPipe]
})
export class TimelinesCmp{
    private errors: any=[];
    private messages: any=[];

    private operationEdit:any = null;
    private newTimeline:any;
    private timelines: any = null;
    private operations:any = null;
    private timelineIndex: number = 0;
    private socket:any;

    constructor(private _timelineService: TimelineService, private _operationsService: OperationsService){
      let host = window.location.origin;
      this.socket = io.connect('',{path:'/socket.io-client'});
    }

    getTimelines(){
      this._timelineService.getTimelines().subscribe(res => {
        this.timelines = res;
        this.timelines = JSON.parse(this.timelines._body);

        // création d'une timeline si il n'en éxiste pas
        if(this.timelines.length == 0){
          this.createTimeline();
        }
        this.socket.on('timeline:save',(data:any)=>console.log('timeline :'+data));

        }, error => {this.errors.push("Impossible de récupérer les timelines");});
    }


    ngOnDestroy(){
      this.socket.removeAllListeners('operation:remove');
      this.socket.removeAllListeners('operation:save');
      this.socket.removeAllListeners('timeline:save');
    }
    /**
     * Insertion d'une timeline via l'API
     */
    createTimelineAPI(){
      this._timelineService.createTimeline(this.newTimeline)
        .subscribe(res => {console.log(res);
          if(res.status == 201){
            this.messages.push('Timeline créée avec succès');
            this.newTimeline = null;
          }
        }, errors => {this.errors.push('Impossible d\'insérer la timeline');})
    }

    createTimeline(){
      this.newTimeline = {name:"",description:""};
    }

    getOperations(){
      this._operationsService.getOperations()
        .subscribe(
          data => this.operations = data,
          err => {this.logError(err);this.errors.push("Impossible de récupérer la liste des opérations.")});
      //this.socket.syncUpdates('operation', this.operations);
        this.socket.on('operation:save',(data:any)=>{
          console.log('operation: '+data);
        });
        this.socket.on('operation:remove',(data:any)=>{
                  console.log('remove operation: '+data);
                });

    }

    onUpdate(response: any){
      if(response.type === 'message'){
        this.messages.push(response.message);
        this.getTimelines();
        this.getOperations();
      }else if(response.type === 'error'){
        this.errors.push(response.message);
      }
    }

    logError(err) {
      console.error('There was an error: ' + err);
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
      this.operationEdit = {title:"",content:""};
    }

    getIndexOfOperation(operation, list){
      for(var i = 0; i< list.length; i++){
        if(list[i]._id === operation._id){
          return i;
        }
      }
      return -1;
    }

    editOperation(operation:any){
      this.operationEdit = operation;
    }

    /**
     * L'opération est elle déjà associée à la timeline?
     *
     * @param timeline  Timeline dans laquelle on recherche l'opération
     * @param operation Opération à chercher
     * @returns True si l'opération est associée à la timeline, False sinon
     *
     */
    isTimelineOnOperation(timeline:any, operation:any){
      if(operation !== null){
        if(operation.steps !== undefined){
          for(let i = 0; i < operation.steps.length; i++){
            if(operation.steps[i].id === timeline._id){
              return true;
            }
          }
        }
      }
      return false;
    }

    /**
     * Ajoute une opération à une timeline (Ne pas oublier de soumettre les informations)
     *
     * @param timeline  Timeline dans laquelle ajouter l'opération
     */
    addToTimeline(timeline:any){
      let tmline = {id: timeline._id ,step:timeline.operations.length};
      if(!this.isTimelineOnOperation(timeline, this.operationEdit)){
        if(this.operationEdit.steps === undefined){
          this.operationEdit.steps = [];
        }
        this.operationEdit.steps.push(tmline);
      }
    }

    removeFromTimeline(timeline:any){
      let index = this.findTimelineInOperation(timeline, this.operationEdit);
      console.log(index);
      if(index !== -1){
        this.operationEdit.steps.splice(index, 1);
      }
      console.log('removed');
      console.log(this.operationEdit);
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

    createThisTimeline(){}

    saveOperation(operation:any){
      this._operationsService.saveOperation(operation)
        .subscribe(res => {
          if(res.status == 201){
            this.messages.push("L'opération à été créée");
          }else if(res.status == 200){
            this.messages.push("L'opération à été modifiée");
          }
          this.operationEdit = null;
        }, error => {
          this.errors.push("Erreur lors de la modification/création de l'opération");
        });
    }


    /**
     * Supprime une opération de la base de données
     *
     * @param operation: Opération à supprimer
     */
    deleteOperation(operation: any){
      this._operationsService.deleteOperation(operation)
        .subscribe(
          res => {
            this.messages.push("L'opération à bien été supprimée");
            let index = this.getIndexOfOperation(operation, this.operations);
            if(index > -1){
              this.operations.splice(index,1);
            }
          },
          error => {this.errors.push("Impossible de supprimer l'opération")});
    }
}
