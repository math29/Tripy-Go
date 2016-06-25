import {Injectable} from '@angular/core';
import {AuthService} from '../tripy-lib/services/auth.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map'



@Injectable()
export class PromoService {

  public base_url = '/api/promos/';
  constructor(private _http: Http, private _authService:AuthService) {}

  /**
   * Récupére le cookie d'autorisation, puis crée le header qui permet
   * d'effectuer une requête
   */
  getHeaders(){
    let headers = new Headers(this._authService.getBearerHeaders());
  	  //headers.append('Authorization', 'Bearer '+ Cookie.getCookie('token'));
      let options = new RequestOptions({ headers: headers });
      return options
  }

  getHeader(){
      let headers = new Headers(this._authService.getBearerHeaders());
    	  //headers.append('Authorization', 'Bearer '+ Cookie.getCookie('token'));
        let options = new RequestOptions({ headers: headers });
        return options
    }

    notifyFb() {
      return this._http.patch(this.base_url + 'notify',null, this.getHeaders())
        .map(res => <any>res.json());
    }


  /**
   * Récupère les promotions
   */
  getPromos(){
    return this._http.get(this.base_url, this.getHeaders())
            .map(res => <any> res.json());
  }

  /**
   * Sauvegarde une opération en base
   */
  savePromo(promo:any){
    //let body = JSON.stringify({code: language.code, name: language.name, note: language.note});
    let body = JSON.stringify(promo);
    // l'opération existe déjà
    if(promo._id !== undefined && promo._id !== ""){
      return this._http.put(this.base_url + promo._id, body, this.getHeaders()).map(res => <any> res.json());
    }else{
      return this._http.post(this.base_url, body, this.getHeaders()).map(res => <any> res.json());
    }
  }

  /**
   * Archive une promotion de la base de donnée
   *
   * @param operation: Promotion à archiver
   */
  archivePromo(promo:string){
    return this._http.delete(this.base_url +  promo, this.getHeaders());
  }

}
