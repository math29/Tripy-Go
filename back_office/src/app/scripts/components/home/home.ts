import {Component, OnInit} from 'angular2/core';
import {Http, RequestOptions} from 'angular2/http';
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
  rate:any = '56e9504f47b2f14db28a3363';

  constructor(private _http:Http, private _authService: AuthService){//this.getRate();
  }

  ngOnInit(){
    /*if(!this._authService.isAdmin()){
      this.logout();
    }*/
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
}
