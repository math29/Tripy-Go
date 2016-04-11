/// <reference path="../../../../../typings/socket.io-client/socket.io-client.d.ts" />

import {Component, OnInit, OnDestroy} from 'angular2/core';
import {Response} from 'angular2/http';
import {TransportComparatorService} from '../../services/transportComparatorService';
import {TransportTypeService} from '../../services/transportTypeService';

import {Location, RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import * as io from 'socket.io-client';

@Component({
  selector: 'timelines',
  templateUrl: 'views/components/timelines/main.html',
  providers: [TransportComparatorService, TransportTypeService],
  directives: [ROUTER_DIRECTIVES]
})
export class TimelinesCmp{
    private errors: any=[];
    private messages: any=[];

    private transportComparatorEdit:any = null;
    private comparators: any = [];
    private transportTypes:any = [];
    private socket:any;

    constructor(private _transportTypeService: TransportTypeService, private _transportComparatorService: TransportComparatorService){
      this.socket = io.connect('',{path:'/socket.io-client'});
    }

    getTransportComparators(){
      this._transportComparatorService.getComparators().subscribe(res => {
        this.comparators = res;

        // création d'une timeline si il n'en éxiste pas
        if(this.comparators.length == 0){
          this.createComparator();
        }
        this.socket.on('transportcomparator:save',(data:any)=>console.log('timeline :'+data));

      }, error => {this.errors.push("Impossible de récupérer les comparateurs de transports");});
    }


    ngOnDestroy(){
      this.socket.removeAllListeners('transportcomparator:remove');
      this.socket.removeAllListeners('transportcomparator:save');
    }
    /**
     * Insertion d'une timeline via l'API
     */
    createComparatorAPI(){
      this._transportComparatorService.createComparator(this.transportComparatorEdit)
        .subscribe(res => {console.log(res);
          if(res.status == 201){
            this.messages.push('Comparateur créé avec succès');
            this.transportComparatorEdit = null;
          }
        }, errors => {this.errors.push('Impossible d\'insérer la timeline');})
    }

    createComparator(){
      this.transportComparatorEdit = {};
    }

    getTransportTypes(){
      this._transportTypeService.getTransportTypes()
        .subscribe(
          data => this.transportTypes = data,
          err => {this.logError(err);this.errors.push("Impossible de récupérer la liste des moyens de transports.")});
    }

    logError(err) {
      console.error('There was an error: ' + err);
    }
    ngOnInit(){
      this.getTransportTypes();
      this.getTransportComparators();
    }

   textIsValid(text){
      var valid = true;

      if(typeof text === 'undefined' || text.length === 0 ){
        valid = false;
      }

      return valid;
    }

    editComparator(comparator:any){
      this.transportComparatorEdit = comparator;
    }
}
