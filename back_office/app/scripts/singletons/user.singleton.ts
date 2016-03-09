import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';

export class UserSingleton
{
    user:any;
    static instance:UserSingleton;
    static isCreating:Boolean = false;

    userObservable$: Observable<any>;
    _userObserver: any;

    constructor() {
        if (!UserSingleton.isCreating) {
            throw new Error("You can't call new in Singleton instances!");
        }
        this.userObservable$ = new Observable(observer => this._userObserver = observer).share();
    }

    static getInstance() {
        if (UserSingleton.instance == null) {
            UserSingleton.isCreating = true;
            UserSingleton.instance = new UserSingleton();
            UserSingleton.isCreating = false;
        }

        return UserSingleton.instance;
    }

    setUser(user:any) {
        this.user = user;
        this._userObserver.next(this.user);
    }

    getUser() {
        return this.user;
    }

    isAdmin(){
      if(this.user){
        return this.user.role == 'admin' || this.user.role == 'adminInfo';
      }
      return false;
    }

    isAdminInfo(){
      if(this.user){
        return this.user.role == 'adminInfo';
      }
      return false;
    }
}
