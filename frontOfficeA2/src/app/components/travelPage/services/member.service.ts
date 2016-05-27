import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthService } from '../../../tripy_go_lib/services/auth.service';


@Injectable()
export class MemberService {
  private base_url : string = '/api/users/search';
  options_post: RequestOptions;

  constructor(private http: Http, private _auth: AuthService) {
    this.options_post = new RequestOptions({ headers: _auth.getBearerHeaders() });
  }


  /**
   * Search a member by his name
   *
   * @param {name} name of the user to search
   *
   */
  searchMember(name : string) {
      return this.http.get(`${this.base_url}/${name}`, this.options_post).map(res => <any>res.json());
  }

}
