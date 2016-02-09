import {Injectable} from 'angular2/core';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';


@Injectable()
export class UserService {

  constructor(private _http: Http) {}

	getMe(){
	  console.log(Cookie.getCookie('token'));
	  let headers = new Headers();
	  headers.append('Authorization', 'Bearer '+ Cookie.getCookie('token'));
	  headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this._http.get('/api/users/me', options);
  }

  login(user){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post('/auth/local/', JSON.stringify(user), options);
  }

  logout(){
    Cookie.deleteCookie('token');
  }

  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
