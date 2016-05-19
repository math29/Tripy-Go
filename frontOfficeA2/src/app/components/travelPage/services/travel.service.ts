import { Injectable } from 'angular2/core';
import { AuthService } from '../../../tripy_go_lib/services/auth.service';
import { Http } from 'angular2/http';

@Injectable()
export class TravelService {
  private base_url = '/api/travel';

  constructor(private auth_service: AuthService, private http: Http) {
  }

}
