System.register(['angular2/core', '../../services/auth.service', '../../singletons/user.singleton', 'ng2-cookies/ng2-cookies', 'angular2/router'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, auth_service_1, user_singleton_1, ng2_cookies_1, router_1;
    var LoginCmp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (user_singleton_1_1) {
                user_singleton_1 = user_singleton_1_1;
            },
            function (ng2_cookies_1_1) {
                ng2_cookies_1 = ng2_cookies_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            LoginCmp = (function () {
                function LoginCmp(_authService, _router) {
                    this._authService = _authService;
                    this._router = _router;
                    this.user = { email: "", password: "" };
                }
                LoginCmp.prototype.showData = function () {
                    var _this = this;
                    this._authService.login(this.user)
                        .subscribe(function (response) {
                        _this.response = response;
                        if (_this.response.status == 200) {
                            ng2_cookies_1.Cookie.setCookie('token', JSON.parse(_this.response._body).token);
                            var cookie = ng2_cookies_1.Cookie.getCookie('token');
                            _this._authService.getMe();
                            _this._router.navigate(['Home']);
                        }
                    }, function (errors) { return _this.errors = errors; });
                };
                LoginCmp.prototype.ngOnInit = function () {
                    var _this = this;
                    this._authService.userObservable$
                        .subscribe(function (updateUser) {
                        _this.user = updateUser;
                        user_singleton_1.UserSingleton.getInstance().setUser(_this.user);
                    });
                };
                LoginCmp = __decorate([
                    core_1.Component({
                        selector: 'login',
                        templateUrl: 'views/pages/login.html',
                        providers: [auth_service_1.AuthService],
                        directives: [router_1.ROUTER_DIRECTIVES],
                        pipes: []
                    }), 
                    __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.Router])
                ], LoginCmp);
                return LoginCmp;
            })();
            exports_1("LoginCmp", LoginCmp);
        }
    }
});
//# sourceMappingURL=login.js.map