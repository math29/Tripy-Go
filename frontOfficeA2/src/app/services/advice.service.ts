import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class AdviceService {

  constructor(private http: Http) {
  }

  getAdvices() {
    return this.http.get('/api/advices/')
      .map(res => <any>res.json());
  }

}
