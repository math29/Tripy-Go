import {Injectable} from '@angular/core';
import {AuthService} from '../tripy-lib/services/auth.service';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable}     from 'rxjs/Observable';


@Injectable()
export class MongoService {

  public base_url = '/api/back/db/';
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

  /**
   * Récupére les informations Host de la DB
   */
	getHost(){
    return this._http.get(this.base_url + 'hostInfos', this.getHeaders());
  }

  /**
   * Récupére les informations de la DB
   */
  getDBInfo(){
    return this._http.get(this.base_url, this.getHeaders());
  }

  /**
   * Récupére le status de la DB
   */
  getDBStatus(){
    return this._http.get(this.base_url + 'status', this.getHeaders());
  }

  /**
   * Récupère les stats de la DB
   */
  getDBStats(){
    return this._http.get(this.base_url + 'stats', this.getHeaders());
  }

  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
