import {Injectable} from 'angular2/core';
import {AuthService} from '../tripy-lib/services/auth.service';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/map'



@Injectable()
export class TransportComparatorService{
  public base_url = '/api/transport/comparators';

  constructor(private _http: Http, private _authService:AuthService) {}

  /**
   * Récupère la liste des comparateurs de transports
   */
  getComparators(){
    let headers = this._authService.getBearerHeaders();
    let options = new RequestOptions({ headers: headers });
    return this._http.get(this.base_url, options)
            .map(res => <any> res.json());
  }

  /**
   * Crée un comparateur
   */
  createComparator(comparator:any){
    let headers = this._authService.getBearerHeaders();
    let options = new RequestOptions({ headers: headers });
    return this._http.get(this.base_url, options)
            .map(res => <any> res.json());
  }
}
