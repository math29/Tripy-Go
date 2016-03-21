import {Component} from 'angular2/core';
import {Http, RequestOptions} from 'angular2/http';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Location, RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {AuthService} from '../../tripy-lib/services/auth.service';
import {StarsRateCmp} from '../../tripy-lib/components/rate/starsRate';

@Component({
  selector: 'home',
  templateUrl: 'views/dashboard/home.html',
  providers: [],
  directives: [ROUTER_DIRECTIVES, StarsRateCmp],
  pipes: []
})
export class HomeCmp{
  rate:any;

  constructor(private _http:Http, private _authService: AuthService){//this.getRate();
  }

  logout(){
    this._authService.logout();
  }

  getHeaders(){
    let headers = this._authService.getBearerHeaders();
  	  //headers.append('Authorization', 'Bearer '+ Cookie.getCookie('token'));
      let options = new RequestOptions({ headers: headers });
      return options
  }

  getRate(){
    this._http.get('/api/rate/56e9504f47b2f14db28a3363', this.getHeaders())
            .map(res => <any> res.json()).subscribe(data => this.rate = data, error => console.log('error'));
  }
}
