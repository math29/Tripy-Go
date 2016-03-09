System.register(['angular2/core', '../utils/stats', '../../services/mongo.service', 'angular2/router'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, stats_1, mongo_service_1, router_1;
    var MongoCmp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (stats_1_1) {
                stats_1 = stats_1_1;
            },
            function (mongo_service_1_1) {
                mongo_service_1 = mongo_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            MongoCmp = (function () {
                function MongoCmp(router, mongoService) {
                    this.router = router;
                    this.mongoService = mongoService;
                }
                MongoCmp.prototype.ngOnInit = function () {
                    var _this = this;
                    this.mongoService.getHost()
                        .subscribe(function (response) {
                        _this.host = response;
                        _this.host = JSON.parse(_this.host._body);
                    }, function (errors) { return console.log(errors); });
                    this.mongoService.getDBInfo()
                        .subscribe(function (response) {
                        _this.db_info = response;
                        _this.db_info = JSON.parse(_this.db_info._body);
                        _this.db_info.avgObjSize = _this.avgSize(_this.db_info.avgObjSize);
                        _this.db_info.dataSize = _this.sizeToMb(_this.db_info.dataSize);
                    }, function (errors) { return console.log(errors); });
                    this.mongoService.getDBStatus()
                        .subscribe(function (response) {
                        _this.status = response;
                        _this.status = JSON.parse(_this.status._body);
                    }, function (errors) { return console.log(errors); });
                    this.mongoService.getDBStats()
                        .subscribe(function (response) {
                        _this.stats = response;
                        _this.stats = JSON.parse(_this.stats._body);
                        for (var i = 0; i < _this.stats.length; i++) {
                            _this.stats[i].avgObjSize = _this.avgSize(_this.stats[i].avgObjSize);
                            _this.stats[i].size = _this.sizeToMb(_this.stats[i].size);
                        }
                    }, function (errors) { return console.log(errors); });
                };
                MongoCmp.prototype.avgSize = function (data) {
                    return Math.ceil(data) + 'Kb';
                };
                MongoCmp.prototype.sizeToMb = function (data) {
                    return Math.floor(data / 10000) + 'Mb';
                };
                MongoCmp = __decorate([
                    core_1.Component({
                        selector: 'mongo',
                        templateUrl: 'views/components/mongo/main.html',
                        providers: [mongo_service_1.MongoService],
                        directives: [router_1.ROUTER_DIRECTIVES, stats_1.StatsCmp],
                        pipes: [],
                        inputs: []
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, mongo_service_1.MongoService])
                ], MongoCmp);
                return MongoCmp;
            })();
            exports_1("MongoCmp", MongoCmp);
        }
    }
});
//# sourceMappingURL=mongo.js.map