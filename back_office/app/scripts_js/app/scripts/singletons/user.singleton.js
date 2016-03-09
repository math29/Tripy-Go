System.register(['rxjs/Observable', 'rxjs/add/operator/share'], function(exports_1) {
    var Observable_1;
    var UserSingleton;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {}],
        execute: function() {
            UserSingleton = (function () {
                function UserSingleton() {
                    var _this = this;
                    if (!UserSingleton.isCreating) {
                        throw new Error("You can't call new in Singleton instances!");
                    }
                    this.userObservable$ = new Observable_1.Observable(function (observer) { return _this._userObserver = observer; }).share();
                }
                UserSingleton.getInstance = function () {
                    if (UserSingleton.instance == null) {
                        UserSingleton.isCreating = true;
                        UserSingleton.instance = new UserSingleton();
                        UserSingleton.isCreating = false;
                    }
                    return UserSingleton.instance;
                };
                UserSingleton.prototype.setUser = function (user) {
                    this.user = user;
                    this._userObserver.next(this.user);
                };
                UserSingleton.prototype.getUser = function () {
                    return this.user;
                };
                UserSingleton.prototype.isAdmin = function () {
                    if (this.user) {
                        return this.user.role == 'admin' || this.user.role == 'adminInfo';
                    }
                    return false;
                };
                UserSingleton.prototype.isAdminInfo = function () {
                    if (this.user) {
                        return this.user.role == 'adminInfo';
                    }
                    return false;
                };
                UserSingleton.isCreating = false;
                return UserSingleton;
            })();
            exports_1("UserSingleton", UserSingleton);
        }
    }
});
//# sourceMappingURL=user.singleton.js.map