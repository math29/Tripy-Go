import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthService } from '../../tripy-lib/services/auth.service';

@Injectable()
export class SubscriberService {
  private options : RequestOptions;

  constructor(private http: Http, private authService: AuthService) {
    let headers = new Headers(this.authService.getBearerHeaders());
    this.options = new RequestOptions({ headers: headers });
  }

  getAll() {

    return this.http.get('/api/subscribe', this.options)
      .map(res => <any>res.json());
  }

}
