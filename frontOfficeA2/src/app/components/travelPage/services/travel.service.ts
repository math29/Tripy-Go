import { Injectable } from '@angular/core';
import { AuthService } from '../../../tripy_go_lib/services/auth.service';
import { Http , RequestOptions} from '@angular/http';

@Injectable()
export class TravelService {
  private base_url = '/api/travels';
  private postOptions : RequestOptions;

  constructor(private auth: AuthService, private http: Http) {
    this.postOptions = new RequestOptions({ headers: auth.getBearerHeaders() });
  }

  getThisOne(id : string) {
    return this.http.get(`${this.base_url}/${id}`, this.postOptions)
      .map(res => <any>res.json());
  }

  addPartner(travel_id : string, user_id : string) {
    return this.http.put(`${this.base_url}/addPartner/${travel_id}/${user_id}`, null, this.postOptions)
      .map(res => <any>res.json());
  }
}
