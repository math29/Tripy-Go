import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { AuthService } from '../../../tripy_go_lib/services/auth.service';

@Injectable()
export class RateService {
  private options_post : RequestOptions;
  private base_url : string = '/api/rate';

  constructor(private http: Http, private _auth: AuthService) {
    this.options_post = new RequestOptions({ headers: _auth.getBearerHeaders() });
  }

  getMyRate(id : string ) {
    return this.http.get(`${this.base_url}/myRate/${id}`, this.options_post)
      .map(res => <any>res.json());
  }

  updateRate(rateId : string, rateValue : number) {
    return this.http.post(`${this.base_url}/vote/${rateValue}/${rateId}`, null, this.options_post)
      .map(res => <any>res.json());
  }

}
