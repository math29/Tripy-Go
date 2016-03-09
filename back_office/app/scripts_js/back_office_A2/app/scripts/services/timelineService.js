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
    var TimelineService;
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
            TimelineService = (function () {
                function TimelineService(_http) {
                    this._http = _http;
                    this.base_url = '/api/timeline/';
                }
                /**
                 * Récupére le cookie d'autorisation, puis crée le header qui permet
                 * d'effectuer une requête
                 */
                TimelineService.prototype.getHeaders = function () {
                    var headers = new http_1.Headers();
                    headers.append('Authorization', 'Bearer ' + ng2_cookies_1.Cookie.getCookie('token'));
                    headers.append('Content-Type', 'application/json');
                    var options = new http_1.RequestOptions({ headers: headers });
                    return options;
                };
                TimelineService.prototype.getHeader = function () {
                    var headers = new http_1.Headers();
                    headers.append('Authorization', 'Bearer ' + ng2_cookies_1.Cookie.getCookie('token'));
                    var options = new http_1.RequestOptions({ headers: headers });
                    return options;
                };
                /**
                 * Récupère les timelines
                 */
                TimelineService.prototype.getTimelines = function () {
                    return this._http.get(this.base_url, this.getHeaders());
                };
                /**
                 * Requête de création de la timeline
                 */
                TimelineService.prototype.createTimeline = function (timeline) {
                    return this._http.post(this.base_url + '/' + timeline.name, JSON.stringify({ description: timeline.description }), this.getHeaders());
                };
                TimelineService.prototype.handleError = function (error) {
                    // in a real world app, we may send the server to some remote logging infrastructure
                    // instead of just logging it to the console
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                TimelineService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], TimelineService);
                return TimelineService;
            })();
            exports_1("TimelineService", TimelineService);
        }
    }
});
//# sourceMappingURL=timelineService.js.map