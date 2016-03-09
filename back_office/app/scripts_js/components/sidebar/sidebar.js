System.register(['angular2/core', './sidebar_element', '../../singletons/user.singleton', 'angular2/router'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, sidebar_element_1, user_singleton_1, router_1;
    var SidebarCmp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (sidebar_element_1_1) {
                sidebar_element_1 = sidebar_element_1_1;
            },
            function (user_singleton_1_1) {
                user_singleton_1 = user_singleton_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            SidebarCmp = (function () {
                function SidebarCmp(router) {
                    this.router = router;
                    this.items = [];
                    this.userSingleton = user_singleton_1.UserSingleton.getInstance();
                }
                SidebarCmp.prototype.ngOnInit = function () {
                    var _this = this;
                    this.user = this.userSingleton.getUser();
                    this.userSingleton.userObservable$.subscribe(function (updateUser) { _this.user = updateUser; _this.updateItems(); });
                    this.updateItems();
                };
                SidebarCmp.prototype.updateItems = function () {
                    var dashboard = { "route": "Home", "icon": "fa-dashboard", "content": "Dashboard" };
                    var mongo = { "route": "Mongo", "icon": "fa-database", "content": "Mongo stats" };
                    var countries = { "route": "Countries", "icon": "fa-table", "content": "Pays" };
                    var langues = { "route": "Langues", "icon": "fa-table", "content": "Langues" };
                    var logs = { "route": "Logs", "icon": "fa-filter", "content": "Logs" };
                    var timelines = { "route": "Timelines", "icon": "fa-table", "content": "Timelines" };
                    this.items = [];
                    this.items.push(dashboard);
                    this.items.push(countries);
                    this.items.push(langues);
                    this.items.push(timelines);
                    if (user_singleton_1.UserSingleton.getInstance().isAdminInfo()) {
                        this.items.push(mongo);
                        this.items.push(logs);
                    }
                };
                SidebarCmp = __decorate([
                    core_1.Component({
                        selector: 'sidebar',
                        templateUrl: 'views/components/sidebar/sidebar.html',
                        directives: [router_1.ROUTER_DIRECTIVES, sidebar_element_1.SidebarElementCmp],
                        pipes: []
                    }), 
                    __metadata('design:paramtypes', [router_1.Router])
                ], SidebarCmp);
                return SidebarCmp;
            })();
            exports_1("SidebarCmp", SidebarCmp);
        }
    }
});
//# sourceMappingURL=sidebar.js.map