import {Injectable} from 'angular2/core';
import {AuthService} from '../../services/auth.service';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/map'



@Injectable()
export class RateService {

  public base_url = '/api/rate/';
  constructor(private _http: Http, private _authService:AuthService) {}

  /**
   * Récupére le cookie d'autorisation, puis crée le header qui permet
   * d'effectuer une requête
   */
  getHeaders(){
    let headers = this._authService.getBearerHeaders();

      let options = new RequestOptions({ headers: headers });
      return options
  }

  getHeader(){
     let headers = this._authService.getBearerHeaders();

        let options = new RequestOptions({ headers: headers });
        return options
    }



  /**
   * Récupère les timelines
   */
  getRate(id: string){
    return this._http.get(this.base_url + id, this.getHeaders())
            .map(res => <any> res.json());
  }

  /**
   * Sauvegarde une opération en base
   */
  vote(side:any, id:string){
    // l'opération existe déjà
    return this._http.post(this.base_url + side + '/' + id, null, this.getHeaders());
  }

  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
