System.register(['angular2/core', 'ng2-cookies/ng2-cookies', 'angular2/http', 'rxjs/Observable', '../singletons/user.singleton', 'angular2/router', 'rxjs/add/operator/share'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, ng2_cookies_1, http_1, Observable_1, user_singleton_1, router_1;
    var AuthService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ng2_cookies_1_1) {
                ng2_cookies_1 = ng2_cookies_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (user_singleton_1_1) {
                user_singleton_1 = user_singleton_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (_1) {}],
        execute: function() {
            AuthService = (function () {
                function AuthService(_http, _router) {
                    var _this = this;
                    this._http = _http;
                    this._router = _router;
                    this.userObservable$ = new Observable_1.Observable(function (observer) { return _this._userObserver = observer; }).share();
                }
                /**
                 * Récupére les informations de l'utilisateur actuel
                 */
                AuthService.prototype.getMe = function () {
                    var _this = this;
                    var headers = new http_1.Headers();
                    headers.append('Authorization', 'Bearer ' + ng2_cookies_1.Cookie.getCookie('token'));
                    headers.append('Content-Type', 'application/json');
                    var options = new http_1.RequestOptions({ headers: headers });
                    this._http.get('/api/users/me', options)
                        .subscribe(function (data) {
                        _this.user = data;
                        _this.user = _this.user._body;
                        _this.user = JSON.parse(_this.user);
                        _this._userObserver.next(_this.user);
                    }, function (errors) { return console.log('Could not retrieve user'); });
                };
                /**
                 * Login de l'utilisateur
                 *
                 * @param user: objet utilisateur contenant le mot de passe et l'email de l'utilisateur
                 */
                AuthService.prototype.login = function (user) {
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this._http.post('/auth/local/', JSON.stringify(user), options);
                };
                /**
                 * Logout de l'utilisateur
                 *
                 * supprime le cookie du navigateur
                 **/
                AuthService.prototype.logout = function () {
                    user_singleton_1.UserSingleton.getInstance().setUser(null);
                    ng2_cookies_1.Cookie.deleteCookie('token');
                    this._router.navigate(['Login']);
                };
                AuthService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, router_1.Router])
                ], AuthService);
                return AuthService;
            })();
            exports_1("AuthService", AuthService);
        }
    }
});
//# sourceMappingURL=auth.service.js.map