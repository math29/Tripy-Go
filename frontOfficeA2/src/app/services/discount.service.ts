import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';

@Injectable()
export class DiscountService {

  constructor(private http: Http) {
  }

  getDiscounts() {
    return this.http.get('/api/promos/')
      .map(res => <any>res.json());
  }

}
