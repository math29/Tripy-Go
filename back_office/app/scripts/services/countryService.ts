import {Injectable} from 'angular2/core';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import {Country} from '../classes/country';
import 'rxjs/add/operator/map'



@Injectable()
export class CountryService {

  public base_url = '/api/countries/';
  constructor(private _http: Http) {}

  /**
   * Récupére le cookie d'autorisation, puis crée le header qui permet
   * d'effectuer une requête
   */
  getHeaders(){
    let headers = new Headers();
  	  headers.append('Authorization', 'Bearer '+ Cookie.getCookie('token'));
  	  headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: headers });
      return options
  }

  getHeader(){
      let headers = new Headers();
    	  headers.append('Authorization', 'Bearer '+ Cookie.getCookie('token'));
        let options = new RequestOptions({ headers: headers });
        return options
    }



  /**
   * Récupère les timelines
   */
  getCountries(){
    return this._http.get(this.base_url, this.getHeaders())
            .map(res => <any> res.json());
  }

  /**
   * Sauvegarde une opération en base
   */
  saveCountry(country:Country){
    //let body = JSON.stringify({code: language.code, name: language.name, note: language.note});
    let body = JSON.stringify(country);
    // l'opération existe déjà
    if(country._id !== undefined && country._id !== ""){
      return this._http.put(this.base_url + country._id, body, this.getHeaders()).map(res => <any> res.json());
    }else{
      return this._http.post(this.base_url, body, this.getHeaders()).map(res => <any> res.json());
    }
  }

  /**
   * Supprime une opération de la base de donnée
   *
   * @param operation: Opération à supprimer
   */
  deleteCountry(country:Country){
    return this._http.delete(this.base_url + '/' + country._id, this.getHeader());
  }



  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
