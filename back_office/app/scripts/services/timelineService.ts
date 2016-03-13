import {Injectable} from 'angular2/core';
import {AuthService} from '../tripy-lib/services/auth.service';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';


@Injectable()
export class TimelineService {

  public base_url = '/api/timeline/';
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
        return this.getHeaders();
    }



  /**
   * Récupère les timelines
   */
  getTimelines(){
    return this._http.get(this.base_url, this.getHeaders());
  }

  /**
   * Requête de création de la timeline
   */
  createTimeline(timeline:any){
    return this._http.post(this.base_url + '/' + timeline.name, JSON.stringify({description:timeline.description}), this.getHeaders());
  }

  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
