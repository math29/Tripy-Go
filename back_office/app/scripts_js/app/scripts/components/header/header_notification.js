System.register(['angular2/core', '../../services/auth.service', 'angular2/router'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, auth_service_1, router_1;
    var HeaderNotificationCmp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            HeaderNotificationCmp = (function () {
                function HeaderNotificationCmp(_authService) {
                    this._authService = _authService;
                }
                HeaderNotificationCmp.prototype.logout = function () {
                    this._authService.logout();
                };
                HeaderNotificationCmp = __decorate([
                    core_1.Component({
                        selector: 'header-notification',
                        templateUrl: 'views/components/header/header-notification.html',
                        providers: [auth_service_1.AuthService],
                        directives: [router_1.ROUTER_DIRECTIVES],
                        pipes: [],
                        inputs: ["user"]
                    }), 
                    __metadata('design:paramtypes', [auth_service_1.AuthService])
                ], HeaderNotificationCmp);
                return HeaderNotificationCmp;
            })();
            exports_1("HeaderNotificationCmp", HeaderNotificationCmp);
        }
    }
});
//# sourceMappingURL=header_notification.js.map