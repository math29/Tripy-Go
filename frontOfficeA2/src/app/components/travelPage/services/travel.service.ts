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

  /**
   * Get local travel
   *
   * @param {id} id of local travel
   */
  getThisOne(id : string) {
    return this.http.get(`${this.base_url}/${id}`, this.postOptions)
      .map(res => <any>res.json());
  }

  /**
   * Add a partner to edit this site
   *
   * @param {travel_id} string id of local travel_id
   * @param {user_id} id of partner we want to add
   */
  addPartner(travel_id : string, user_id : string) {
    return this.http.put(`${this.base_url}/addPartner/${travel_id}/${user_id}`, null, this.postOptions)
      .map(res => <any>res.json());
  }

  /**
   * Add a site used to manage this travel
   *
   * @param {travel_id} id of local travel
   * @param {site_id} id of site we want to add
   * @param {type} type of prestation we want to use
   */
  addUsedSite(travel_id : string, site_id : string, type : string) {
    return this.http.put(`${this.base_url}/site/${type}/${site_id}/${travel_id}`, null, this.postOptions)
      .map(res => <any>res.json());
  }
}
