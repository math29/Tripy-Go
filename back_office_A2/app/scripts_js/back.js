System.register(['angular2/core', './components/header/header', './components/login/login', './components/home/home', './components/mongo/mongo', './components/timelines/timelines', './components/log/log', './services/auth.service', 'angular2/http', 'angular2/router', './singletons/user.singleton'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, header_1, login_1, home_1, mongo_1, timelines_1, log_1, auth_service_1, http_1, router_1, user_singleton_1;
    var WTC_Back;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (header_1_1) {
                header_1 = header_1_1;
            },
            function (login_1_1) {
                login_1 = login_1_1;
            },
            function (home_1_1) {
                home_1 = home_1_1;
            },
            function (mongo_1_1) {
                mongo_1 = mongo_1_1;
            },
            function (timelines_1_1) {
                timelines_1 = timelines_1_1;
            },
            function (log_1_1) {
                log_1 = log_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (user_singleton_1_1) {
                user_singleton_1 = user_singleton_1_1;
            }],
        execute: function() {
            WTC_Back = (function () {
                function WTC_Back(_authService, _router) {
                    var _this = this;
                    this._authService = _authService;
                    this._router = _router;
                    this.lastRoute = 'home';
                    this.userSingleton = user_singleton_1.UserSingleton.getInstance();
                    _router.subscribe(function (val) {
                        if (_this.lastRoute == 'login') {
                        }
                        _this.lastRoute = val;
                    });
                    if (!this.me) {
                        this._router.navigate(['Login']);
                    }
                }
                WTC_Back.prototype.ngOnInit = function () {
                    var _this = this;
                    this.userSingleton.userObservable$.subscribe(function (updateUser) { _this.me = updateUser; });
                };
                WTC_Back = __decorate([
                    core_1.Component({
                        selector: 'wtc-back',
                        templateUrl: 'views/dashboard/main.html',
                        providers: [http_1.HTTP_PROVIDERS, auth_service_1.AuthService],
                        directives: [router_1.ROUTER_DIRECTIVES, header_1.HeaderCmp, login_1.LoginCmp, mongo_1.MongoCmp, log_1.LogCmp, timelines_1.TimelinesCmp],
                        pipes: []
                    }),
                    router_1.RouteConfig([
                        { path: '/login', name: 'Login', component: login_1.LoginCmp },
                        { path: '/home', name: 'Home', component: home_1.HomeCmp, useAsDefault: true },
                        { path: '/mongo', name: 'Mongo', component: mongo_1.MongoCmp },
                        { path: '/countries', name: 'Countries', component: home_1.HomeCmp },
                        { path: '/langues', name: 'Langues', component: home_1.HomeCmp },
                        { path: '/logs', name: 'Logs', component: log_1.LogCmp },
                        { path: '/timelines', name: 'Timelines', component: timelines_1.TimelinesCmp }
                    ]), 
                    __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.Router])
                ], WTC_Back);
                return WTC_Back;
            })();
            exports_1("WTC_Back", WTC_Back);
        }
    }
});
//# sourceMappingURL=back.js.map