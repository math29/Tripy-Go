/// <reference path="../../../../../typings/socket.io-client/socket.io-client.d.ts" />

import {Component, OnInit} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Response} from 'angular2/http';
import {LanguageService} from '../../services/languageService';
import {Language} from '../../classes/language';
import {Location, RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import * as io from 'socket.io-client';

@Component({
  selector: 'languages',
  templateUrl: 'views/components/language/main.html',
  providers: [LanguageService],
  directives: [ROUTER_DIRECTIVES],
  pipes: []
})
export class LanguageCmp{
    private errors: any=[];
    private messages: any=[];

    private new_language:Language;
    private keys:any;
    private orderby:string='';
    private orderOptions : string[] = ['+','-'];
    private orderType = this.orderOptions[0];
    private languages: Language[];
    private selection: any;
    private socket:any;

    constructor(private _languageService: LanguageService){
      let host = window.location.origin;
      this.socket = io.connect('',{path:'/socket.io-client'});
    }



    logError(err) {
      console.error('There was an error: ' + err);
    }
    ngOnInit(){
      this.getLanguages();
      // appelé lorsqu'un language est supprimé
      this.socket.on('language:remove',
        (data:any)=>{
          for(let i = 0; i < this.languages.length; i++){
            if(this.languages[i]._id == data._id){
              this.languages.splice(i,1);
              break;
            }
          }
        });

    }

   textIsValid(text){
      var valid = true;

      if(typeof text === 'undefined' || text.length === 0 ){
        valid = false;
      }

      return valid;
    }

    edit(language:Language){
      this.new_language = language;
      // TODO
      // add scroll to
    }

    initNewLanguage(){
      this.new_language = new Language("","","");
    }

    getLanguages(){
      this._languageService.getLanguages()
        .subscribe(data =>
        {
          this.languages = data;
          if(this.languages.length > 0){
            this.keys = Object.keys(this.languages[0]);
            this.keys.splice(0,1);
            this.selection = this.keys[1];
            this.orderby = this.keys[1];
          }
          // set socket to listen languages saved
          this.socket.on('language:save', (data:any)=>{
            let index = this.findLanguageIndex(data._id);
            if(index > -1){
              this.languages[index] = data;
            }else{
            this.languages.push(data);
            }
          });
        },
        errors => console.log(errors));
    }


    /**
     * Retourne l'index d'une langue dans la liste des langues
     *
     * @param id: id de la langue à trouver
     *
     * @return index: index de la langue ou -1 si non trouvée
     */
    findLanguageIndex(id:string):number{
      for(let i = 0; i < this.languages.length; i++){
        if(this.languages[i]._id == id){
          return i;
        }
      }
      return -1;
    }

    create(language:Language){
      this._languageService.saveLanguage(language)
        .subscribe(data => {

          this.new_language = null;
        }, errors => console.log(errors));
    }

    deleteLanguage(language:Language){
      this._languageService.deleteLanguage(language).subscribe();
    }


}
