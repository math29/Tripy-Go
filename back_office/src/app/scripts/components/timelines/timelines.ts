import {Component, OnInit, OnDestroy} from '@angular/core';
import {Response} from '@angular/http';
import {StatsCmp} from '../utils/stats';
import {TimelineService} from '../../services/timelineService';
import {OperationsService} from '../../services/operationsService';
import {TimelineCmp} from './timeline';
import {MarkdownPipe} from '../../tripy-lib/pipes/marked';
import {MdEditor} from '../../tripy-lib/components/md-editor/md-editor';

import {RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {SocketService} from '../../services/socket.service';

declare var to_markdown:any;


@Component({
  selector: 'timelines',
  templateUrl: 'views/components/timelines/main.html',
  providers: [TimelineService, OperationsService],
  directives: [ROUTER_DIRECTIVES, StatsCmp, TimelineCmp, MdEditor],
  pipes: [MarkdownPipe]
})
export class TimelinesCmp{
    private errors: any=[];
    private messages: any=[];

    private operationEdit:any = null;
    private editTimelineName:boolean = false;
    private contentEdit:string = null;
    private newTimeline:any;
    private timelines: any = null;
    private operations:any = null;
    private timelineIndex: number = 0;

    constructor(private _timelineService: TimelineService, private _operationsService: OperationsService, private socketService: SocketService){
      this.socketService.socketObservable$.subscribe(socketResponse => {
        switch(socketResponse.channel){
          case 'timeline:save':
            this.getTimelines();
            break;
          case 'operation:save':
            this.onSaveOperation(socketResponse.data);
            break;
          case 'operation:remove':
            this.onRemoveOperation(socketResponse.data);
            break;
          default:
        }
      });
      this.socketService.addListener('timeline:save');
      this.socketService.addListener('operation:save');
      this.socketService.addListener('operation:remove');

    }
    onRemoveOperation(data: any) {
      let index = this.getIndexOfOperation(data, this.operations);
      if(index > -1){
        this.operations.splice(index,1);
      }
      this.getTimelines();
    }

    onSaveOperation(data: any) {
      //console.log(data);
      for(let i = 0; i < this.operations.length; i++){
        if(this.operations[i]._id == data._id){
          this.operations[i] == data;
          data = null;
        }
      }
      if(data != null){
        this.operations.push(data);
      }
      this.getTimelines();
    }

    newTimelineName(){
      this._timelineService.editName(this.timelines[this.timelineIndex]._id, this.timelines[this.timelineIndex].name)
        .subscribe(success => {
          this.messages.push("Le nom de la timeline à été modifié");
          this.editTimelineName = false;
        }, error => this.errors.push("Impossible d'éditer le nom de la timeline"));
    }

    descriptionChanged(newDescription) {
      this.operationEdit.content = to_markdown.toMarkdown(newDescription);
    }

    /**
     * Récupére les timelines en BDD
     *
     */
    getTimelines(){
      this._timelineService.getTimelines().subscribe(res => {
        this.timelines = res;
        this.timelines = JSON.parse(this.timelines._body);

        // création d'une timeline si il n'en éxiste pas
        if(this.timelines.length == 0){
          this.createTimeline();
        }

        }, error => {this.errors.push("Impossible de récupérer les timelines");});
    }


    /*
     * Désallocation des sockets
     *
     */
    ngOnDestroy(){
      this.socketService.removeListener('timeline:save','operation:save','operation:remove');
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

    /**
     * Crée une nouvelle timeline
     *
     */
    createTimeline(){
      this.newTimeline = {name:"",description:""};
    }

    /**
     * Récupération des opérations en base de donnée
     *
     */
    getOperations(){
      this._operationsService.getOperations()
        .subscribe(
          data => this.operations = data,
          err => {this.logError(err);this.errors.push("Impossible de récupérer la liste des opérations.")});
    }

    /**
     * Losqu'il y à une mise à jour
     *
     */
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
      // on vérifie que l'opération existe
      if(operation !== null){
        // si l'opération est associée à une ou plusieurs timelines
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
     * Par défaut l'opération est ajoutée à la fin de la timeline
     *
     * @param timeline  Timeline dans laquelle ajouter l'opération
     */
    addToTimeline(timeline:any){
      let tmline = {id: timeline._id ,step:timeline.operations.length};
      // on vérifie que l'opération n'est pas déjà dans la timeline
      if(!this.isTimelineOnOperation(timeline, this.operationEdit)){
        if(this.operationEdit.steps === undefined){
          this.operationEdit.steps = [];
        }
        this.operationEdit.steps.push(tmline);
      }
    }

    /**
     * Supprime une opération de la timeline
     *
     */
    removeFromTimeline(timeline:any, operation: any){
      let index = this.findTimelineInOperation(timeline, operation);

      if(index !== -1){
        this.operationEdit.steps.splice(index, 1);
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

    /**
     * Insertion / Mise à jour d'une opération
     *
     * @param operation: Operation à insérer/mettre à jour
     */
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
