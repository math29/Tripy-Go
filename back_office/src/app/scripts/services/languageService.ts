import {Injectable} from '@angular/core';
import {AuthService} from '../tripy-lib/services/auth.service';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import {Language} from '../classes/language';
import 'rxjs/add/operator/map'



@Injectable()
export class LanguageService {

  public base_url = '/api/languages/';
  constructor(private _http: Http, private _authService: AuthService) {}

  /**
   * Récupére le cookie d'autorisation, puis crée le header qui permet
   * d'effectuer une requête
   */
  getHeaders(){
    let headers = new Headers(this._authService.getBearerHeaders());
      let options = new RequestOptions({ headers: headers });
      return options
  }

  getHeader(){
    let headers = new Headers(this._authService.getBearerHeaders());
        let options = new RequestOptions({ headers: headers });
        return options
    }



  /**
   * Récupère les timelines
   */
  getLanguages(){
    return this._http.get(this.base_url, this.getHeaders())
            .map(res => <any> res.json());
  }

  /**
   * Sauvegarde une opération en base
   */
  saveLanguage(language:Language){
    let body = JSON.stringify({code: language.code, name: language.name, note: language.note});
    // l'opération existe déjà
    if(language._id !== undefined && language._id !== ""){
      return this._http.put(this.base_url + language._id, body, this.getHeaders()).map(res => <any> res.json());
    }else{
      return this._http.post(this.base_url, body, this.getHeaders()).map(res => <any> res.json());
    }
  }

  /**
   * Supprime une opération de la base de donnée
   *
   * @param operation: Opération à supprimer
   */
  deleteLanguage(language:Language){
    return this._http.delete(this.base_url + '/' + language._id, this.getHeader());
  }



  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
