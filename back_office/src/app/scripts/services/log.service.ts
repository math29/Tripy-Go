import {Injectable} from '@angular/core';
import {AuthService} from '../tripy-lib/services/auth.service';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable}     from 'rxjs/Observable';


@Injectable()
export class LogService {

  public base_url = '/api/back/log/';
  constructor(private _http: Http, private _authService:AuthService) {}

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
   * Supprime un log de la base de donnée
   */
	deleteLog(id: string){
    return this._http.delete(this.base_url + id, this.getHeaders());
  }

  /**
   * Supprime l'ensemble des logs
   */
  dropLogs(){
    return this._http.delete(this.base_url, this.getHeader());
  }

  /**
   * Récupère les logs par paquets de 50 par page
   * la page 1 étant les derniers logs
   */
  getLogsByPage(level: string, page: any){
    return this._http.get(this.base_url + level + '/' + page, this.getHeaders());
  }

  /**
   * Récupère l'ensemble des logs du serveur
   */
  getLogs(){
    return this._http.get(this.base_url , this.getHeaders());
  }

  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
