import {Injectable} from 'angular2/core';
import {AuthService} from '../tripy-lib/services/auth.service';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import {Transport} from '../classes/transport';
import 'rxjs/add/operator/map'



@Injectable()
export class AgregatorService {

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
  getTransportAgregation(agregateOptions: any){
    let headers = this._authService.getBearerHeaders();
    let options = new RequestOptions({ headers: headers ,
    search: new URLSearchParams(`min_dist=${agregateOptions.distance.min}&max_dist=${agregateOptions.distance.max}`)
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
