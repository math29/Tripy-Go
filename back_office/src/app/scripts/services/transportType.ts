import {Injectable} from '@angular/core';
import {AuthService} from '../tripy-lib/services/auth.service';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import {TransportType} from '../classes/transportType';
import 'rxjs/add/operator/map'



@Injectable()
export class TransportTypeService {

  public base_url = '/api/transportType/';
  constructor(private _http: Http, private _authService:AuthService) {}

  /**
   * Récupére le cookie d'autorisation, puis crée le header qui permet
   * d'effectuer une requête
   */
  getHeaders(){
    let headers = new Headers(this._authService.getBearerHeaders());
  	  //headers.append('Authorization', 'Bearer '+ Cookie.getCookie('token'));
      let options = new RequestOptions({ headers: headers });
      return options
  }

  getHeader(){
      let headers = new Headers(this._authService.getBearerHeaders());
    	  //headers.append('Authorization', 'Bearer '+ Cookie.getCookie('token'));
        let options = new RequestOptions({ headers: headers });
        return options
    }



  /**
   * Récupère les timelines
   */
  getTransports(){

    return this._http.get(this.base_url, this.getHeaders())
            .map(res => <any> res.json());
  }

  /**
   * Sauvegarde une opération en base
   */
  saveTransport(transport:TransportType){
    //let body = JSON.stringify({code: language.code, name: language.name, note: language.note});
    let body = JSON.stringify(transport);
    // l'opération existe déjà
    if(transport._id !== undefined && transport._id !== ""){
      return this._http.put(this.base_url + transport._id, body, this.getHeaders()).map(res => <any> res.json());
    }else{
      return this._http.post(this.base_url, body, this.getHeaders()).map(res => <any> res.json());
    }
  }

  /**
   * Supprime une opération de la base de donnée
   *
   * @param operation: Opération à supprimer
   */
  deleteTransportType(transportType:TransportType){
    return this._http.delete(this.base_url + '/' + transportType._id, this.getHeaders());
  }



  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
