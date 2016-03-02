/// <reference path="../../../../../typings/socket.io-client/socket.io-client.d.ts" />

import {Component, OnInit} from 'angular2/core';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Response} from 'angular2/http';
import {LanguageService} from '../../services/languageService';
import {MarkdownPipe} from '../../pipes/marked';
import {Language} from '../../classes/language';
import {Location, RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import * as io from 'socket.io-client';

@Component({
  selector: 'languages',
  templateUrl: 'views/components/language/main.html',
  providers: [LanguageService],
  directives: [ROUTER_DIRECTIVES],
  pipes: [MarkdownPipe]
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

    getLanguages(){
      this._languageService.getLanguages()
        .subscribe();
    }

    create(language:Language){
      this._languageService.saveLanguage(language);
    }

    deleteLanguage(language:Language){

    }


}
