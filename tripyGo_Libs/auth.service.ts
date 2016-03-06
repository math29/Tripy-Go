import {Injectable, EventEmitter} from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Router} from 'angular2/router';
import 'rxjs/add/operator/share';

// DONT MODIFY THIS FILE IF YOU ARE NOT IN REAL TRIPYGO LIB FOLDER (./)

@Injectable()
export class AuthService {
  user:any;
  _token:string;
  errors: EventEmitter<any> = new EventEmitter();

  constructor(private _http: Http, private _router: Router) {
  }

  /**
   * Store les informations de l'utilisateur actuel dans le local storage
   */
	storeMe(){
	  let headers = new Headers();
	  headers.append('Authorization', 'Bearer '+ localStorage.getItem('jwt'));
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this._http.get('/api/users/me', options)
      .subscribe(data => {
        this.user = data;
        this.user = this.user._body;
        this.user = JSON.parse(this.user);
        console.log(this.user);
        localStorage.setItem('jwt-local-user', JSON.stringify(this.user));
    }, errors => console.log('Could not retrieve user'));
  }

  /**
   * Récupère l'utilisateur courant dans le local Storage
   *
   * @return {User}
   */
  getMe() {
    return JSON.parse(localStorage.getItem('jwt-local-user'));
  }


  /**
   * Login de l'utilisateur
   *
   * @param user: objet utilisateur contenant le mot de passe et l'email de l'utilisateur
   */
  login(user){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post('/auth/local/', JSON.stringify(user), options)
      .subscribe(
          response => {
            localStorage.setItem('jwt', response.json().token);
            this.storeMe();
            this._router.navigate( ['Home'] );
          },
          error => {
            console.log(JSON.stringify(error));
          }
      );
  }

  /**
   * Check if User is connected
   *
   * Return True if connected, False Else
   */
  isLoggedIn() {
    if (localStorage.getItem('jwt') && localStorage.getItem('jwt-local-user')) return true;
    return false;
  }

  /**
   * Create a new user
   *
   * @param  {Object}   user     - user info
   * @return {Promise}
   */
  createUser(user) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this._http.post('/api/users', JSON.stringify(user), options)
      .subscribe(
        response => {
          localStorage.setItem('jwt', response.json().token);
          this.storeMe();
          this._router.navigate(['Home']);
        },
        error => {
          this.errors.emit(error);
        }
      );
    return this.errors;
  }

  /**
   * Get Errors Promise
   *
   * @return {Promise}
   */
  getErrorsPromise(){
    return this.errors;
  }

  /**
   * Logout de l'utilisateur
   *
   * supprime le cookie du navigateur
   **/
  logout(){
    localStorage.clear();
    this._router.navigate( ['Login'] );
  }


}
