import {Injectable} from 'angular2/core';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';


@Injectable()
export class MongoService {

  public base_url = '/api/back/db/';
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