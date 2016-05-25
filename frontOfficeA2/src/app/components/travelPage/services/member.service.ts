import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';


@Injectable()
export class Service {
  private base_url : string = '/api/users/search';

  constructor(private http: Http) {
  }

}
