import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgForm, FORM_DIRECTIVES, CORE_DIRECTIVES} from '@angular/common';
import {Response} from '@angular/http';
import {CompanyService} from '../../services/company';
import {CountryService} from '../../services/countryService';
import { ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import { FILE_UPLOAD_DIRECTIVES, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import {SocketService} from '../../services/socket.service';

import * as _ from 'lodash';
const fileAPI = "/api/files";


@Component({
  selector: 'companies',
  templateUrl: 'views/components/company/main.html',
  providers: [CompanyService, CountryService],
  directives: [ROUTER_DIRECTIVES, FILE_UPLOAD_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES],
  pipes: []
})
export class CompanyCmp implements OnInit{
    private errors: any=[];
    private messages: any=[];

    private companies: any = [];
    private countries: any = [];
    private companyEdit:any;

    /*
     * Uploader
     */
    uploader: FileUploader ;
    hasBaseDropZoneOver: boolean = false;
    hasAnotherDropZoneOver: boolean = false;

    constructor(private _companyService: CompanyService,
      private _countryService: CountryService,
      private socketService: SocketService){
      this.uploader = new FileUploader({ url: fileAPI, queueLimit: 1 });

      // Necessary to not have an error
  		//this.uploader.queueLimit = 1;
  		this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
  			let responsePath = JSON.parse(response);
        console.log(responsePath);
  			this.updateCompanyPicture(responsePath);// the url will be in the response
  		};

      this.socketService.socketObservable$.subscribe(updateCompany => {
        let response = updateCompany;
        switch(response.channel){
          case 'company:save':
            this.onCompanySave(response.data);
            break;
          case 'company:remove':
            this.onCompanyRemove(response.data);
            break;
          default:

        }
      });
    }

    onCompanySave(data: any){
      data.country = _.find(this.countries, { '_id': data.country });
      let index = this.findCompanyIndex(data._id);

      if(index > -1){
        this.companies[index] = data;
      }else{
      this.companies.push(data);
      }
    }

    onCompanyRemove(data: any){
      for(let i = 0; i < this.companies.length; i++){
        if(this.companies[i]._id == data._id){
          this.companies.splice(i,1);
          break;
        }
      }
    }

    // ****************************************
    // GESTION UPLOAD NEW PICTURES
    // ****************************************

    updateCompanyPicture(responsePath: any) {
      this.companyEdit.img = "/api/files/" + responsePath.file._id ;
      // "/api/files/" + $scope.user.picture + "?_ts=" + new Date().getTime();
      console.log(this.companyEdit.img);
    }

    fileOverBase(e: any) {
      this.hasBaseDropZoneOver = e;
    }


    logError(err) {
      console.error('There was an error: ' + err);
    }
    ngOnInit(){
      this.getCountries();
      this.getCompanies();
      // appelé lorsqu'un language est supprimé
      this.socketService.addListener('company:remove');
      this.socketService.addListener('company:save');

    }

    ngOnDestroy(){
      this.socketService.removeListener('company:remove', 'company:save');
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

      public fileOverAnother(e:any):void {
        this.hasAnotherDropZoneOver = e;
      }

}
