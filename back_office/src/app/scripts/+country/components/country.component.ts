import {Component, OnInit, OnDestroy} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {AuthService} from '../../tripy-lib/services/auth.service';
import {Response} from 'angular2/http';
import {LanguageService} from '../../services/languageService';
import {CountryService} from '../../services/countryService';
import {Language} from '../../classes/language';
import {Country} from '../../classes/country';
import {Location, RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {OrderByPipe} from '../../pipes/orderby';
import {SocketService} from '../../services/socket.service';


@Component({
  selector: 'countries',
  templateUrl: 'views/components/country/main.html',
  providers: [CountryService, LanguageService],
  directives: [ROUTER_DIRECTIVES],
  pipes: [OrderByPipe]
})
export class CountryCmp{
    private errors: any=[];
    private messages: any=[];

    private edit_country:Country;
    private keys:any;
    private orderby:string='';
    private orderOptions : string[] = ['+','-'];
    private orderType = this.orderOptions[0];
    private countries: Country[];
    private selection: any;
    private languages:any;

    private continentList: string[] = ["Europe","Asia","Oceania","Amérique du Nord","Amérique du Sud","Artique","Antartique"];

    constructor(private _countryService: CountryService, private _languageService: LanguageService, private socketService:SocketService){
      this.socketService.addListener('country:remove');
      this.socketService.addListener('country:save');
      this.socketService.socketObservable$.subscribe(socketResponse => {
        switch(socketResponse.channel){
          case 'country:remove':
            this.onCountryRemove(socketResponse.data);
            break;
          case 'country:save':
            this.onCountrySave(socketResponse.data);
            break;
          default:
        }
      });
    }

    /**
     * When a country is removed
     *
     * @param data: socket response data about removed country
     */
    onCountryRemove(data: any) {
      for(let i = 0; i < this.countries.length; i++){
        if(this.countries[i]._id == data._id){
          this.countries.splice(i,1);
          break;
        }
      }
    }

    onCountrySave(data: any) {
      let index = this.findCountryIndex(data._id);
      if(index > -1){
        this.countries[index] = data;
      }else{
      this.countries.push(data);
      }
    }

    logError(err) {
      console.error('There was an error: ' + err);
    }
    ngOnInit(){
      this.getLanguages();
      this.getCountries();
    }

    ngOnDestroy(){
      this.socketService.removeListener('country:remove', 'country:save');
    }

   textIsValid(text){
      var valid = true;

      if(typeof text === 'undefined' || text.length === 0 ){
        valid = false;
      }

      return valid;
    }

    edit(country:Country){
      this.edit_country = country;
    }

    initCountry(){
      this.edit_country = new Country("","","",this.continentList[0],0);
      this.edit_country.continent = this.continentList[0];
    }

    getCountries(){
      this._countryService.getCountries()
        .subscribe(data =>
        {
          this.countries = data;
          if(this.countries.length > 0){
            this.keys = Object.keys(this.countries[0]);
            this.keys.splice(0,1);
            this.selection = this.keys[1];
            this.orderby = this.keys[1];
          }
        },
        errors => console.log(errors));
    }

    /**
     * Récupère les différents languages disponible en base de données
     */
     getLanguages(){
      this._languageService.getLanguages()
        .subscribe((data:any)=>this.languages = data, errors => this.errors.push(errors));
     }

    /**
     * Retourne l'index d'un pays dans la liste des pays
     *
     * @param id: id du pays à trouver
     *
     * @return index: index du pays ou -1 si non trouvée
     */
    findCountryIndex(id:string):number{
      for(let i = 0; i < this.countries.length; i++){
        if(this.countries[i]._id == id){
          return i;
        }
      }
      return -1;
    }

    create(country:Country){
      this._countryService.saveCountry(country)
        .subscribe(data => {
          this.edit_country = undefined;
        }, errors => console.log(errors));
    }

    deleteCountry(country:Country){
      this._countryService.deleteCountry(country).subscribe();
    }


}
