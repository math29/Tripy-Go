import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class DiscountService {

  constructor(private http: Http) {
  }

  getDiscounts() {
    return this.http.get('/api/promos/')
      .map(res => <any>res.json());
  }

}
