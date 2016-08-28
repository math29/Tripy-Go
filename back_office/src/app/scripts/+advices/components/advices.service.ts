import { Injectable } from '@angular/core';
import {AuthService} from '../../tripy-lib/services/auth.service';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/map'


@Injectable()
export class AdviceService {

    public base_url = '/api/advices/';

  constructor(private http: Http, private authService: AuthService) {
  }

  saveAdvice(advice) {
      let headers = new Headers(this.authService.getBearerHeaders());
      let options = new RequestOptions({ headers: headers });
      //let body = JSON.stringify({code: language.code, name: language.name, note: language.note});
      let body = JSON.stringify(advice);
      // l'opération existe déjà
      if(advice._id !== undefined && advice._id !== ""){
        return this.http.put(this.base_url + advice._id, body, options).map(res => <any> res.json());
      }else{
        return this.http.post(this.base_url, body, options).map(res => <any> res.json());
      }
  }

  getAdvices() {
      let headers = new Headers(this.authService.getBearerHeaders());
      let options = new RequestOptions({ headers: headers });
      return this.http.get(this.base_url, options)
              .map(res => <any> res.json());
  }

  /**
   * Supprime une opération de la base de donnée
   *
   * @param operation: Opération à supprimer
   */
  deleteAdvice(advice){
    let headers = new Headers(this.authService.getBearerHeaders());
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.base_url + advice._id, options);
  }

}
