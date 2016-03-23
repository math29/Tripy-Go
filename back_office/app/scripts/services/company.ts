import {Injectable} from 'angular2/core';
import {AuthService} from '../tripy-lib/services/auth.service';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import {Company} from '../classes/company';
import 'rxjs/add/operator/map'



@Injectable()
export class TransportService {

  public base_url = '/api/company/';
  constructor(private _http: Http, private _authService:AuthService) {}

  /**
   * Récupére le cookie d'autorisation, puis crée le header qui permet
   * d'effectuer une requête
   */
  getHeaders(){
    let headers = this._authService.getBearerHeaders();
  	  //headers.append('Authorization', 'Bearer '+ Cookie.getCookie('token'));
      let options = new RequestOptions({ headers: headers });
      return options
  }

  getHeader(){
      let headers = this._authService.getBearerHeaders();
    	  //headers.append('Authorization', 'Bearer '+ Cookie.getCookie('token'));
        let options = new RequestOptions({ headers: headers });
        return options
    }



  /**
   * Récupère les timelines
   */
  getCompanies(){
    let headers = this._authService.getBearerHeaders();
    let options = new RequestOptions({ headers: headers });
    return this._http.get(this.base_url, options)
            .map(res => <any> res.json());
  }

  /**
   * Sauvegarde une opération en base
   */
  saveCompany(company:Company){
    let headers = this._authService.getBearerHeaders();
    let options = new RequestOptions({ headers: headers });
    //let body = JSON.stringify({code: language.code, name: language.name, note: language.note});
    let body = JSON.stringify(company);
    // l'opération existe déjà
    if(company._id !== undefined && company._id !== ""){
      return this._http.put(this.base_url + company._id, body, options).map(res => <any> res.json());
    }else{
      return this._http.post(this.base_url, body, options).map(res => <any> res.json());
    }
  }

  /**
   * Supprime une compagnie de la base de donnée
   *
   * @param operation: Compagnie à supprimer
   */
  deleteCompany(company:Company){
    let headers = this._authService.getBearerHeaders();
    let options = new RequestOptions({ headers: headers });
    return this._http.delete(this.base_url + '/' + company._id, options);
  }



  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
