import {Injectable} from 'angular2/core';
import {AuthService} from '../tripy-lib/services/auth.service';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/map'



@Injectable()
export class UserService {

  public base_url = '/api/users';
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
  getUsers(){
    let headers = this._authService.getBearerHeaders();
    let options = new RequestOptions({ headers: headers });
    return this._http.get(this.base_url, options)
            .map(res => <any> res.json());
  }

  /**
   * Sauvegarde une opération en base
   */
  saveUser(user:any){
    let headers = this._authService.getBearerHeaders();
    let options = new RequestOptions({ headers: headers });
    //let body = JSON.stringify({code: language.code, name: language.name, note: language.note});
    let body = JSON.stringify(user);
    // l'opération existe déjà
    if(user._id !== undefined && user._id !== ""){
      return this._http.put(this.base_url + user._id, body, options).map(res => <any> res.json());
    }else{
      return this._http.post(this.base_url, body, options).map(res => <any> res.json());
    }
  }

  /**
   * Supprime une compagnie de la base de donnée
   *
   * @param operation: Compagnie à supprimer
   */
  deleteUser(user:any){
    let headers = this._authService.getBearerHeaders();
    let options = new RequestOptions({ headers: headers });
    return this._http.delete(this.base_url + '/' + user._id, options);
  }

  /**
   * Supprime une compagnie de la base de donnée
   *
   * @param operation: Compagnie à supprimer
   */
  changeUserRole(user:any, role:string){
    let headers = this._authService.getBearerHeaders();
    let options = new RequestOptions({ headers: headers });
    return this._http.put(this.base_url + '/' + user._id + '/' + role,null,options).map(res => <any> res.json());
  }

  getRoles(){
    let headers = this._authService.getBearerHeaders();
    let options = new RequestOptions({headers: headers});
    return this._http.get(this.base_url + '/roles', options).map(res => <any> res.json());
  }


  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
