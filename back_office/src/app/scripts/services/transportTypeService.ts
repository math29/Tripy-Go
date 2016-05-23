import {Injectable} from '@angular/core';
import {AuthService} from '../tripy-lib/services/auth.service';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/map'



@Injectable()
export class TransportTypeService {

  public base_url = '/api/transport/type/';
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
  getTransportTypes(){
    return this._http.get(this.base_url, this.getHeaders())
            .map(res => <any> res.json());
  }

  /**
   * Sauvegarde une opération en base
   */
  saveTransportType(transportType:any){
    //let body = JSON.stringify({code: language.code, name: language.name, note: language.note});
    let body = JSON.stringify(transportType);
    // l'opération existe déjà
    console.log(body);
    if(transportType._id !== undefined && transportType._id !== ""){
      return this._http.put(this.base_url + transportType._id, body, this.getHeaders()).map(res => <any> res.json());
    }else{
      return this._http.post(this.base_url + transportType.name, body, this.getHeaders()).map(res => <any> res.json());
    }
  }

  /**
   * Supprime une compagnie de la base de donnée
   *
   * @param operation: Compagnie à supprimer
   */
  deleteTransportType(transportType:any){
    return this._http.delete(this.base_url +  transportType._id, this.getHeaders());
  }


  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
