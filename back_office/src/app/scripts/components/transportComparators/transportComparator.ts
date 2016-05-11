/// <reference path="../../../../../../typings/socket.io-client/socket.io-client.d.ts" />

import {Component, OnInit, OnDestroy} from 'angular2/core';
import {Response} from 'angular2/http';
import {TransportComparatorService} from '../../services/transportComparatorService';
import {TransportTypeService} from '../../services/transportTypeService';
import {CompanyService} from '../../services/company';

import {Location, RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import * as io from 'socket.io-client';
import * as _ from 'lodash';

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

      // mise à jour du comparateur
      this.socket.on('transportComparator:save',(data:any)=>{
        data.company = _.find(this.companies, { '_id': data.company });
        for(let i = 0; i < data.type.length; i++){
          data.type[i] = _.find(this.transportTypes, { '_id': data.type[i] });
        }
        let index = this.getComparatorIndex(data._id);

        if(index > -1){
          this.comparators[index] = data;
        }else{
          this.comparators.push(data);
        }

      });

      this.socket.on('transportComparator:remove',(data:any)=>{
        let index = this.getComparatorIndex(data._id);
        if(index > -1){
          this.comparators.splice(index, 1);
        }
      });

    }

    getTransportComparators(){
      this._transportComparatorService.getComparators().subscribe(res => {
        this.comparators = res;

        // création d'une timeline si il n'en éxiste pas
        if(this.comparators.length == 0){
          this.createComparator();
        }
      }, error => {this.errors.push("Impossible de récupérer les comparateurs de transports");});
    }

    getCompanies() {
      this._companyService.getCompanies()
        .subscribe(success => this.companies = success, error => this.errors.push(error));
    }

    selectCompany(company: any){
      this.transportComparatorEdit.company = company;
    }

    ngOnDestroy(){
      this.socket.removeAllListeners('transportComparator:remove');
      this.socket.removeAllListeners('transportComparator:save');
    }

    /**
     * Insertion d'une timeline via l'API
     */
    createComparatorAPI(){
      if(typeof this.transportComparatorEdit.company !== 'string'){
        this.transportComparatorEdit.company = this.transportComparatorEdit.company._id;
      }

      /*
       * Pour chaque type de transport du comparateur,
       * On vérifie qu'on à bien l'id de l'objet en base, et non l'objet
       */
      for(let i = 0; i < this.transportComparatorEdit.type.length; i++){
        if(typeof this.transportComparatorEdit.type[i] !== 'string'){
          console.log(this.transportComparatorEdit.type[i]);
          this.transportComparatorEdit.type[i] = this.transportComparatorEdit.type[i]._id;
        }
      }
      console.log('create comparator');
      this._transportComparatorService.createComparator(this.transportComparatorEdit)
        .subscribe(res => {
          console.log(res);
          console.log(res.status);
          if(res.status == 201){
            this.messages.push('Comparateur créé avec succès');
            this.transportComparatorEdit = null;
          }
        }, errors => {this.errors.push('Impossible d\'insérer le comparateur');})
    }

    /**
     * mise à jour d'un comparateur via l'API
     */
    updateComparatorAPI(comparator){
      let transformComparator = JSON.parse(JSON.stringify(comparator));
      /*
       * Si l'entreprise n'est pas une string, on  prend la valeur de _id de l'objet
       */
      if(typeof transformComparator.company !== 'string'){
        transformComparator.company = transformComparator.company._id;
      }
      /*
       * Pour chaque type de transport du comparateur,
       * On vérifie qu'on à bien l'id de l'objet en base, et non l'objet
       */
      for(let i = 0; i < transformComparator.type.length; i++){
        if(typeof transformComparator.type[i] !== 'string'){
          console.log(transformComparator.type[i]);
          transformComparator.type[i] = transformComparator.type[i]._id;
        }
      }

      // Requête de mise à jour
      this._transportComparatorService.updateComparator(transformComparator)
        .subscribe(res => {
          this.messages.push('Comparateur mis à jour avec succès');
          this.transportComparatorEdit = null;
        }, errors => {this.errors.push('Impossible de mettre à jour le comparateur');})
    }

    /**
     * Create a comparator
     */
    createComparator(){
      this.transportComparatorEdit = {comments: [], company:{}, type:[]};
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
      this.getCompanies();
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

    addType(type:any){
      this.transportComparatorEdit.type[this.transportComparatorEdit.type.length] = type;
    }

    removeType(type:any){
      let index = this.indexOfType(type);
      if(index > -1){
        this.transportComparatorEdit.type.splice(index, 1);
      }
    }

    typeInArray(type){
      return this.indexOfType(type) > -1 ? true: false;
    }

    indexOfType(type){
      for(let i = 0; i < this.transportComparatorEdit.type.length; i++){
        if(this.transportComparatorEdit.type[i]._id === type._id)return i;
      }
      return -1;
    }

    getComparatorIndex(id:string){
      console.log(this.comparators.length);
      for(let i = 0; i < this.comparators.length; i++){
        console.log('bidon');
        console.log(this.comparators[i]._id + ' ?= ' + id);
        if(this.comparators[i]._id == id)return i;
      }
      return -1;
    }

    /**
     * Edit a comparator
     *
     * @param comparator to edit
     */
    edit(comparator:any){
      this.transportComparatorEdit = comparator;
    }

    deleteComparator(comparator: any){
      this._transportComparatorService.removeComparator(comparator)
        .subscribe();
    }
}
