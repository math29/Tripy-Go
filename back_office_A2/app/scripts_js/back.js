System.register(['angular2/core', './components/header/header', './components/login/login', './components/home/home', './services/user.service', 'angular2/http', 'angular2/router'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, header_1, login_1, home_1, user_service_1, http_1, router_1;
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
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            WTC_Back = (function () {
                function WTC_Back(_userService, _router) {
                    this._userService = _userService;
                    this._router = _router;
                }
                WTC_Back.prototype.getMe = function () {
                    var _this = this;
                    this._userService.getMe().subscribe(function (me) {
                        _this.me = me;
                        console.log("User");
                        console.log(me);
                    }, function (error) {
                        _this.errorMessage = error;
                        _this._router.navigate(['Login']);
                    });
                };
                WTC_Back.prototype.ngOnInit = function () {
                    this.getMe();
                };
                WTC_Back = __decorate([
                    core_1.Component({
                        selector: 'wtc-back',
                        templateUrl: 'views/dashboard/main.html',
                        providers: [http_1.HTTP_PROVIDERS, user_service_1.UserService],
                        directives: [router_1.ROUTER_DIRECTIVES, header_1.HeaderCmp, login_1.LoginCmp],
                        pipes: []
                    }),
                    router_1.RouteConfig([
                        { path: '/login', name: 'Login', component: login_1.LoginCmp },
                        { path: '/home', name: 'Home', component: home_1.HomeCmp, useAsDefault: true }
                    ]), 
                    __metadata('design:paramtypes', [user_service_1.UserService, router_1.Router])
                ], WTC_Back);
                return WTC_Back;
            })();
            exports_1("WTC_Back", WTC_Back);
        }
    }
});
//# sourceMappingURL=back.js.map