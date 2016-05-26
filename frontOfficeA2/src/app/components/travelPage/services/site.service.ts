import { Injectable } from '@angular/core';
import { Http , RequestOptions } from '@angular/http';
import { AuthService } from '../../../tripy_go_lib/services/auth.service';

@Injectable()
export class SiteService {
  private postOptions : any;
  private base_url : string = '/api/comparators';
  constructor(private http : Http, private auth : AuthService) {
    this.postOptions = new RequestOptions({ headers: auth.getBearerHeaders() });
  }

  search(name : string) {
    return this.http.get(`${this.base_url}/search/${name}`, this.postOptions).map(res => <any>res.json());
  }

  /**
   * Get a comparator by Id
   *
   * @param {id} comparator id
   */
  getThisSite(id : string) {
    return this.http.get(`${this.base_url}/${id}`, this.postOptions)
      .map(res => <any>res.json());
  }
}
