System.register(['angular2/core', 'ng2-cookies/ng2-cookies', 'angular2/http', 'rxjs/Observable', 'rxjs/add/operator/map'], function(exports_1) {
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
    var OperationsService;
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
            function (_1) {}],
        execute: function() {
            OperationsService = (function () {
                function OperationsService(_http) {
                    this._http = _http;
                    this.base_url = '/api/operations/';
                }
                /**
                 * Récupére le cookie d'autorisation, puis crée le header qui permet
                 * d'effectuer une requête
                 */
                OperationsService.prototype.getHeaders = function () {
                    var headers = new http_1.Headers();
                    headers.append('Authorization', 'Bearer ' + ng2_cookies_1.Cookie.getCookie('token'));
                    headers.append('Content-Type', 'application/json');
                    var options = new http_1.RequestOptions({ headers: headers });
                    return options;
                };
                OperationsService.prototype.getHeader = function () {
                    var headers = new http_1.Headers();
                    headers.append('Authorization', 'Bearer ' + ng2_cookies_1.Cookie.getCookie('token'));
                    var options = new http_1.RequestOptions({ headers: headers });
                    return options;
                };
                /**
                 * Récupère les timelines
                 */
                OperationsService.prototype.getOperations = function () {
                    return this._http.get(this.base_url, this.getHeaders())
                        .map(function (res) { return res.json(); });
                };
                /**
                 * Sauvegarde une opération en base
                 */
                OperationsService.prototype.saveOperation = function (operation) {
                    var body = JSON.stringify({ content: operation.content, steps: operation.steps });
                    // l'opération existe déjà
                    if (operation._id !== undefined) {
                        return this._http.put(this.base_url + operation._id + '/' + operation.title, body, this.getHeaders());
                    }
                    else {
                        return this._http.post(this.base_url + operation.title, body, this.getHeaders());
                    }
                };
                /**
                 * Supprime une opération de la base de donnée
                 *
                 * @param operation: Opération à supprimer
                 */
                OperationsService.prototype.deleteOperation = function (operation) {
                    return this._http.delete(this.base_url + '/' + operation._id, this.getHeader());
                };
                OperationsService.prototype.handleError = function (error) {
                    // in a real world app, we may send the server to some remote logging infrastructure
                    // instead of just logging it to the console
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                OperationsService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], OperationsService);
                return OperationsService;
            })();
            exports_1("OperationsService", OperationsService);
        }
    }
});
//# sourceMappingURL=operationsService.js.map