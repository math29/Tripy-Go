System.register(['angular2/core', './header_notification', '../sidebar/sidebar', 'angular2/router'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, header_notification_1, sidebar_1, router_1;
    var HeaderCmp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (header_notification_1_1) {
                header_notification_1 = header_notification_1_1;
            },
            function (sidebar_1_1) {
                sidebar_1 = sidebar_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            HeaderCmp = (function () {
                function HeaderCmp() {
                }
                HeaderCmp = __decorate([
                    core_1.Component({
                        selector: 'header',
                        templateUrl: 'views/components/header/main.html',
                        providers: [],
                        directives: [router_1.ROUTER_DIRECTIVES, header_notification_1.HeaderNotificationCmp, sidebar_1.SidebarCmp],
                        pipes: [],
                        inputs: ['user']
                    }), 
                    __metadata('design:paramtypes', [])
                ], HeaderCmp);
                return HeaderCmp;
            })();
            exports_1("HeaderCmp", HeaderCmp);
        }
    }
});
//# sourceMappingURL=header.js.map