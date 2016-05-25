import { Injectable } from '@angular/core';
import { AuthService } from '../../../tripy_go_lib/services/auth.service';
import { Http } from '@angular/http';

@Injectable()
export class TravelService {
  private base_url = '/api/travels';

  constructor(private auth_service: AuthService, private http: Http) {
  }

  getThisOne(id : string) {
    return this.http.get(`${this.base_url}/${id}`)
      .map(res => <any>res.json());
  }
}
