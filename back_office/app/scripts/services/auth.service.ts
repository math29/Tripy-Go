import {Injectable} from 'angular2/core';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {UserSingleton} from '../singletons/user.singleton';
import {Router} from 'angular2/router';
import 'rxjs/add/operator/share';



@Injectable()
export class AuthService {
  user:any;
  userObservable$: Observable<any>;
  _userObserver: any;

  _token:string;

  constructor(private _http: Http, private _router: Router) {
    this.userObservable$ = new Observable(observer => this._userObserver = observer).share();
  }

  /**
   * Récupére les informations de l'utilisateur actuel
   */
	getMe(){
	  let headers = new Headers();
	  headers.append('Authorization', 'Bearer '+ Cookie.getCookie('token'));
	  headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    this._http.get('/api/users/me', options)
      .subscribe(data => {
        this.user = data;
        this.user = this.user._body;
        this.user = JSON.parse(this.user);
        this._userObserver.next(this.user);
    }, errors => console.log('Could not retrieve user'));
  }

  /**
   * Login de l'utilisateur
   *
   * @param user: objet utilisateur contenant le mot de passe et l'email de l'utilisateur
   */
  login(user){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post('/auth/local/', JSON.stringify(user), options);
  }

  /**
   * Logout de l'utilisateur
   *
   * supprime le cookie du navigateur
   **/
  logout(){
    UserSingleton.getInstance().setUser(null);
    Cookie.deleteCookie('token');
    this._router.navigate( ['Login'] );
  }


}
