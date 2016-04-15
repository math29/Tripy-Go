/// <reference path="../../../../../typings/socket.io-client/socket.io-client.d.ts" />

import {Component, OnInit, OnDestroy} from 'angular2/core';
import {Response} from 'angular2/http';
import {TransportComparatorService} from '../../services/transportComparatorService';
import {TransportTypeService} from '../../services/transportTypeService';
import {CompanyService} from '../../services/company';

import {Location, RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import * as io from 'socket.io-client';

@Component({
  selector: 'timelines',
  templateUrl: 'views/components/transports/comparators/main.html',
  providers: [TransportComparatorService, TransportTypeService, CompanyService],
  directives: [ROUTER_DIRECTIVES]
})
export class TransportComparatorCmp{
    private errors: any=[];
    private messages: any=[];

    private transportComparatorEdit:any = null;
    private comparators: any = [];
    private companies:any = [];
    private filteredCompanies:any = [];
    private transportTypes:any = [];
    private socket:any;

    constructor(private _transportTypeService: TransportTypeService,
      private _transportComparatorService: TransportComparatorService,
      private _companyService: CompanyService){
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

    getCompanies(){
      this._companyService.getCompanies()
        .subscribe(success => this.companies = success, error => this.errors.push(error));
    }

    filter() {
        if (this.transportComparatorEdit.company !== ""){
            this.filteredCompanies = this.companies.filter(function(el){
                return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        }else{
            this.filteredCompanies = [];
        }
    }

    select(item){
        this.transportComparatorEdit.company = item;
        this.filteredCompanies = [];
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

    /**
     * Create a comparator
     */
    createComparator(){
      this.transportComparatorEdit = {};
    }

    /**
     * Get different transports types
     *
     */
    getTransportTypes(){
      this._transportTypeService.getTransportTypes()
        .subscribe(
          data => this.transportTypes = data,
          err => {this.logError(err);this.errors.push("Impossible de récupérer la liste des moyens de transports.")});
    }

    logError(err) {
      console.error('There was an error: ' + err);
    }

    /**
     * On init, get TransportTypes and comparators
     *
     */
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

    /**
     * Edit a comparator
     *
     * @param comparator to edit
     */
    editComparator(comparator:any){
      this.transportComparatorEdit = comparator;
    }

    deleteComparator(comparator: any){}
}
