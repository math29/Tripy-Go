import {Injectable, EventEmitter} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router-deprecated';
import { SocketService } from './socket.service';
import 'rxjs/add/operator/share';

// DONT MODIFY THIS FILE IF YOU ARE NOT IN REAL TRIPYGO LIB FOLDER (./)

@Injectable()
export class AuthService {
  user:any;
  _token:string;
  userObservable$: Observable<any>;
  _userObserver: any;
  errors: EventEmitter<any> = new EventEmitter();

  constructor(private _http: Http, private _router: Router, private socketService : SocketService) {
    this.userObservable$ = new Observable(observer => this._userObserver = observer).share();
  }

  /**
   * Génére le header d'autorisation
   *
   * @retuen Headers headers contenant les données d'identification
   */
  getBearerHeaders():Headers{
    let headers = new Headers();
    headers.append('Authorization', 'Bearer '+ localStorage.getItem('jwt'));
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  /**
   * Store les informations de l'utilisateur actuel dans le local storage
   */
	storeMe():any{
	  let headers = this.getBearerHeaders();
    let options = new RequestOptions({ headers: headers });
    return this._http.get('/api/users/me', options)
      .subscribe(data => {
        this.user = data;
        this.user = this.user._body;
        this.user = JSON.parse(this.user);
        localStorage.setItem('jwt-local-user', JSON.stringify(this.user));
        this.socketService.connexion();
        if(this._userObserver){
          this._userObserver.next(this.user);
        }
    }, errors => console.log('Could not retrieve user'));
  }

  /**
   * Récupère l'utilisateur courant dans le local Storage
   *
   * @return {User}
   */
  getMe():any{
    return JSON.parse(localStorage.getItem('jwt-local-user'));
  }


  /**
   * Login de l'utilisateur
   *
   * @param user: objet utilisateur contenant le mot de passe et l'email de l'utilisateur
   */
  login(user):any{
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
  isLoggedIn():boolean {
    if (localStorage.getItem('jwt') && localStorage.getItem('jwt-local-user')) return true;
    return false;
  }

  isAdminInfo():boolean{
    if(localStorage.getItem('jwt') && localStorage.getItem('jwt-local-user') && JSON.parse(localStorage.getItem('jwt-local-user')).role === 'adminInfo'){
      return true;
    }
    return false;
  }

  isAdmin():boolean {
    if(localStorage.getItem('jwt')
      && localStorage.getItem('jwt-local-user')
      && (JSON.parse(localStorage.getItem('jwt-local-user')).role == 'admin' || JSON.parse(localStorage.getItem('jwt-local-user')).role === 'adminInfo')){
      return true;
    }
    return false;
  }

  /**
   * Create a new user
   *
   * @param  {Object}   user     - user info
   * @return {Promise}
   */
  createUser(user):any {
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
  getErrorsPromise():any{
    return this.errors;
  }

  /**
   * Avatar User Gesture
   *
   * @return Avatar URL
   */
  getUserAvatar() :string{
    if (this.getMe().picture) {
      return this.getMe().picture;
    }
    return "/assets/images/user.png";
  }

  /**
   * Logout de l'utilisateur
   *
   * supprime le cookie du navigateur
   **/
  logout():void{
    localStorage.clear();
    if(this._userObserver){
      this._userObserver.next(null);
    }
    this._router.navigate( ['Login'] );
  }

  checkJWTValid():void {
    if(this.isLoggedIn()){
      let headers = this.getBearerHeaders();
      let options = new RequestOptions({ headers: headers });
      this._http.get('/api/users/me', options)
        .subscribe(data => {
          this.user = data;
          this.user = this.user._body;
          this.user = JSON.parse(this.user);
          if(this._userObserver){
            this._userObserver.next(this.user);
          }
      }, errors => {
        console.log('Could not retrieve user');
        this.logout();
      });
    }
  }

  parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
  }

  getToken() {
    return localStorage['jwt'];
  }

  isAuthed() {
    var token = this.getToken();
    if (token) {
      var params = this.parseJwt(token);
      return Math.round(new Date().getTime() / 1000) <= params.exp;
    } else {
      return false;
    }
  }
}
