/// <reference path="../../../../../typings/socket.io-client/socket.io-client.d.ts" />

import {Component, OnInit, OnDestroy} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {Response} from 'angular2/http';
import {CompanyService} from '../../services/company';
import {CountryService} from '../../services/countryService';
import {Location, RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import * as io from 'socket.io-client';

@Component({
  selector: 'companies',
  templateUrl: 'views/components/company/main.html',
  providers: [CompanyService, CountryService],
  directives: [ROUTER_DIRECTIVES],
  pipes: []
})
export class CompanyCmp{
    private errors: any=[];
    private messages: any=[];

    private companies: any = [];
    private countries: any = [];
    private companyEdit:any;
    private socket:any;

    constructor(private _companyService: CompanyService, private _countryService: CountryService){
      let host = window.location.origin;
      this.socket = io.connect('',{path:'/socket.io-client'});
    }



    logError(err) {
      console.error('There was an error: ' + err);
    }
    ngOnInit(){
      this.getCountries();
      this.getCompanies();
      // appelé lorsqu'un language est supprimé
      this.socket.on('company:remove',
        (data:any)=>{
          for(let i = 0; i < this.companies.length; i++){
            if(this.companies[i]._id == data._id){
              this.companies.splice(i,1);
              break;
            }
          }
        });

    }

    ngOnDestroy(){
      this.socket.removeAllListeners('company:remove');
      this.socket.removeAllListeners('company:save');
    }

   textIsValid(text){
      var valid = true;

      if(typeof text === 'undefined' || text.length === 0 ){
        valid = false;
      }

      return valid;
    }

    edit(company:any){
      this.companyEdit = company;
    }

    initNewCompany(){
      this.companyEdit = {};
    }

    getCompanies(){
      this._companyService.getCompanies()
        .subscribe(data =>
        {
          this.companies = data;

          // set socket to listen languages saved
          this.socket.on('company:save', (data:any)=>{
            let index = this.findCompanyIndex(data._id);
            if(index > -1){
              this.companies[index] = data;
            }else{
            this.companies.push(data);
            }
          });
        },
        errors => console.log(errors));
    }

    getCountries(){
      this._countryService.getCountries()
        .subscribe(data =>
        {
          this.countries = data;
        },
        errors => console.log(errors));
    }


    /**
     * Retourne l'index d'une entreprise dans la liste des entreprises
     *
     * @param id: id de l'entreprise à trouver
     *
     * @return index: index de l'entreprise ou -1 si non trouvée
     */
    findCompanyIndex(id:string):number{
      for(let i = 0; i < this.companies.length; i++){
        if(this.companies[i]._id == id){
          return i;
        }
      }
      return -1;
    }

    create(company:any){
      if(typeof company.country === 'object'){
        company.country = company.country._id;
      }
      this._companyService.saveCompany(company)
        .subscribe(data => {
          this.messages.push('L\'entreprise à bien été créée');
          this.companyEdit = null;
        }, errors => this.errors.push('Impossible de mettre à jour l\'entreprise'));
    }

    // Lorsque l'on selectionne un pays
    onChangeCountry(country){
      this.companyEdit.country = country;
    }
    
    deleteCompany(company:any){
      this._companyService.deleteCompany(company).subscribe();
    }


}
