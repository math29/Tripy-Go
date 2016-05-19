import {Injectable} from '@angular/core';
import {AuthService} from '../tripy-lib/services/auth.service';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import {Transport} from '../classes/transport';
import 'rxjs/add/operator/map'



@Injectable()
export class AgregatorService {
  private header: Headers;

  constructor(private _http: Http, private _authService:AuthService) {}

  /**
   * Récupére le cookie d'autorisation, puis crée le header qui permet
   * d'effectuer une requête
   */
  getHeaders(){
    this.header = new Headers(this._authService.getBearerHeaders());
    let options = new RequestOptions({
      headers: this.header
     });
    return options
  }

  getHeader(){
      let header = new Headers(this._authService.getBearerHeaders());
      let options = new RequestOptions({ headers: header });
      return options
    }



  /**
   * Récupère les timelines
   */
  getTransportAgregation(agregateOptions: any){
    let queryString = '';
    if(agregateOptions.distance){
      queryString += `min_dist=${agregateOptions.distance.min}&max_dist=${agregateOptions.distance.max}`;
    }
    if(agregateOptions.date){
      if(queryString != '')queryString +="&";
      queryString += `min_date=${agregateOptions.date.min}&max_date=${agregateOptions.date.max}`;
    }
    let headers = new Headers(this._authService.getBearerHeaders());
    let options = new RequestOptions({ headers: headers ,
    search: new URLSearchParams(queryString)
  }
  );
    return this._http.get('/api/transport/aggregator', options)
            .map(res => <any> res.json());
  }

  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
