System.register(['angular2/core', 'ng2-cookies/ng2-cookies', 'angular2/http', 'rxjs/Observable'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, ng2_cookies_1, http_1, Observable_1;
    var MongoService;
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
            }],
        execute: function() {
            MongoService = (function () {
                function MongoService(_http) {
                    this._http = _http;
                    this.base_url = '/api/back/db/';
                }
                /**
                 * Récupére le cookie d'autorisation, puis crée le header qui permet
                 * d'effectuer une requête
                 */
                MongoService.prototype.getHeaders = function () {
                    var headers = new http_1.Headers();
                    headers.append('Authorization', 'Bearer ' + ng2_cookies_1.Cookie.getCookie('token'));
                    headers.append('Content-Type', 'application/json');
                    var options = new http_1.RequestOptions({ headers: headers });
                    return options;
                };
                /**
                 * Récupére les informations Host de la DB
                 */
                MongoService.prototype.getHost = function () {
                    return this._http.get(this.base_url + 'hostInfos', this.getHeaders());
                };
                /**
                 * Récupére les informations de la DB
                 */
                MongoService.prototype.getDBInfo = function () {
                    return this._http.get(this.base_url, this.getHeaders());
                };
                /**
                 * Récupére le status de la DB
                 */
                MongoService.prototype.getDBStatus = function () {
                    return this._http.get(this.base_url + 'status', this.getHeaders());
                };
                /**
                 * Récupère les stats de la DB
                 */
                MongoService.prototype.getDBStats = function () {
                    return this._http.get(this.base_url + 'stats', this.getHeaders());
                };
                MongoService.prototype.handleError = function (error) {
                    // in a real world app, we may send the server to some remote logging infrastructure
                    // instead of just logging it to the console
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                MongoService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], MongoService);
                return MongoService;
            })();
            exports_1("MongoService", MongoService);
        }
    }
});
//# sourceMappingURL=mongo.service.js.map