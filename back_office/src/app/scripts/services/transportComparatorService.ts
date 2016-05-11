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
    return this._http.post(this.base_url, JSON.stringify(comparator), options);

  }

  /**
   * Met à jour un comparateur de transport
   *
   * @param comparator comparateur à modifier
   */
  updateComparator(comparator:any){
    let headers = this._authService.getBearerHeaders();
    let options = new RequestOptions({ headers: headers });
    return this._http.put(this.base_url + '/' + comparator._id , JSON.stringify(comparator), options)
            .map(res => <any> res.json());
  }

  /**
   * Supprime un comparateur de transport
   *
   * @param comparator comparateur de transport
   */
  removeComparator(comparator: any){
    let headers = this._authService.getBearerHeaders();
    let options = new RequestOptions({ headers: headers });
    return this._http.delete(this.base_url + '/' + comparator._id ,options);
  }
}
