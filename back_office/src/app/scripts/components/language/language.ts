import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgForm} from '@angular/common';
import {Response} from '@angular/http';
import {LanguageService} from '../../services/languageService';
import {Language} from '../../classes/language';
import {RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {OrderByPipe} from '../../pipes/orderby';
import {SocketService} from '../../tripy-lib/index';

@Component({
  selector: 'languages',
  templateUrl: 'views/components/language/main.html',
  providers: [LanguageService],
  directives: [ROUTER_DIRECTIVES],
  pipes: [OrderByPipe]
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

    constructor(private _languageService: LanguageService, private socketService: SocketService){
      this.socketService.socketObservable$.subscribe(socketResponse => {
        switch(socketResponse.channel) {
          case 'language:remove':
            this.onRemoveLanguage(socketResponse.data);
            break;
          case 'language:save':
            this.onSaveLanguage(socketResponse.data);
            break;
          default:
        }
      });
      this.socketService.addListener('language:save');
      this.socketService.addListener('language:remove');
    }

    onRemoveLanguage(data) {
      for(let i = 0; i < this.languages.length; i++){
        if(this.languages[i]._id == data._id){
          this.languages.splice(i,1);
          break;
        }
      }
    }

    onSaveLanguage(data) {
      let index = this.findLanguageIndex(data._id);
      if(index > -1){
        this.languages[index] = data;
      }else{
      this.languages.push(data);
      }
    }

    logError(err) {
      console.error('There was an error: ' + err);
    }
    ngOnInit(){
      this.getLanguages();
      // appelé lorsqu'un language est supprimé
    }

    ngOnDestroy(){
      this.socketService.removeListener('language:remove','language:save');
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
            console.log(this.orderType+this.orderby);
          }
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
