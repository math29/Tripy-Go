import {Injectable} from '@angular/core';
import {AuthService} from '../tripy-lib/services/auth.service';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import {Country} from '../classes/country';
import 'rxjs/add/operator/map'



@Injectable()
export class CountryService {

  public base_url = '/api/countries/';
  constructor(private _http: Http, private _authService:AuthService) {}

  /**
   * Récupère les timelines
   */
  getCountries(){
    let headers = new Headers(this._authService.getBearerHeaders());
    let options = new RequestOptions({ headers: headers });
    return this._http.get(this.base_url, options)
            .map(res => <any> res.json());
  }

  /**
   * Sauvegarde une opération en base
   */
  saveCountry(country:Country){
    let headers = new Headers(this._authService.getBearerHeaders());
    let options = new RequestOptions({ headers: headers });
    //let body = JSON.stringify({code: language.code, name: language.name, note: language.note});
    let body = JSON.stringify(country);
    // l'opération existe déjà
    if(country._id !== undefined && country._id !== ""){
      return this._http.put(this.base_url + country._id, body, options).map(res => <any> res.json());
    }else{
      return this._http.post(this.base_url, body, options).map(res => <any> res.json());
    }
  }

  /**
   * Supprime une opération de la base de donnée
   *
   * @param operation: Opération à supprimer
   */
  deleteCountry(country:Country){
    let headers = new Headers(this._authService.getBearerHeaders());
    let options = new RequestOptions({ headers: headers });
    return this._http.delete(this.base_url + '/' + country._id, options);
  }



  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
