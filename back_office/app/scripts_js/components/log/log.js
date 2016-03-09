System.register(['angular2/core', '../../services/log.service', '../../pipes/orderby', '../../pipes/filter', '../../pipes/selectLevel', 'ng2-charts/ng2-charts', 'angular2/router'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, log_service_1, orderby_1, filter_1, selectLevel_1, ng2_charts_1, router_1;
    var LogCmp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (log_service_1_1) {
                log_service_1 = log_service_1_1;
            },
            function (orderby_1_1) {
                orderby_1 = orderby_1_1;
            },
            function (filter_1_1) {
                filter_1 = filter_1_1;
            },
            function (selectLevel_1_1) {
                selectLevel_1 = selectLevel_1_1;
            },
            function (ng2_charts_1_1) {
                ng2_charts_1 = ng2_charts_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            LogCmp = (function () {
                function LogCmp(_logService) {
                    this._logService = _logService;
                    this.errors = [];
                    this.messages = [];
                    this.keys = [];
                    this.orderby = '';
                    this.orderOptions = ['+', '-'];
                    this.orderType = this.orderOptions[0];
                    this.level = 'All';
                    this.pagination = { maxPage: 1 };
                    this.query = '';
                    this.page = 1;
                    this.chartOptions = {
                        animation: false,
                        responsive: false,
                        legend: true
                    };
                    this.legend = true;
                }
                LogCmp.prototype.range = function (num) {
                    var array = new Array(num);
                    return array;
                };
                LogCmp.prototype.createDownloadURL = function () {
                    var blob = new Blob([JSON.stringify(this.logs)], { type: 'application/json' });
                    this.url = window.URL.createObjectURL(blob);
                };
                LogCmp.prototype.get = function () {
                    var _this = this;
                    var getQuery = this.page + '';
                    if (this.query.length > 0) {
                        getQuery = getQuery + '/' + this.query;
                    }
                    this._logService.getLogsByPage(this.level, getQuery)
                        .subscribe(function (getResponse) {
                        _this.temp = getResponse;
                        _this.temp = JSON.parse(_this.temp._body);
                        _this.stats = _this.temp.stats;
                        _this.pagination = _this.temp.pagination;
                        _this.logs = _this.temp.logs;
                        _this.createDownloadURL();
                        _this.keys = Object.keys(_this.logs[0]);
                        _this.keys.splice(_this.keys.length - 1, 1);
                        _this.orderby = _this.keys[0];
                    }, function (errors) {
                        //console.log(errors);
                        _this.errors.push("Erreur lors de la récupération des logs");
                    });
                };
                LogCmp.prototype.drop = function () {
                    var _this = this;
                    this._logService.dropLogs()
                        .subscribe(function (success) {
                        _this.messages.push('Base des logs vidée');
                        _this.logs = [];
                    }, function (errors) {
                        _this.errors.push('Erreur inconnue');
                    });
                };
                LogCmp.prototype.deleteLog = function (log) {
                    var _this = this;
                    this._logService.deleteLog(log._id)
                        .subscribe(function (success) {
                        _this.messages.push('Log ' + log._id + ' supprimé avec succés');
                        for (var i = 0; i < _this.logs.length; i++) {
                            if (_this.logs[i]._id == log._id) {
                                _this.logs.splice(i, 1);
                            }
                        }
                    }, function (errors) {
                        _this.errors.push('Impossible de supprimer le log ' + log._id);
                    });
                };
                LogCmp.prototype.ngOnInit = function () {
                    this.get();
                };
                LogCmp.prototype.scrollTo = function (id) {
                    var anchor = document.getElementById(id);
                    //var container = angular.element(document.getElementById('scroll-container'));
                    //window.container.scrollToElement(anchor, 0, 800);
                };
                ;
                LogCmp.prototype.getClassFromInfo = function (log) {
                    if (typeof log !== 'undefined') {
                        if (!this.textIsValid(log.message) || !this.textIsValid(log.timestamp) || !this.textIsValid(log.level)) {
                            return 'danger';
                        }
                    }
                    else {
                        return 'danger';
                    }
                };
                ;
                LogCmp.prototype.textIsValid = function (text) {
                    var valid = true;
                    if (typeof text === 'undefined' || text.length === 0) {
                        valid = false;
                    }
                    return valid;
                };
                LogCmp = __decorate([
                    core_1.Component({
                        selector: 'log',
                        templateUrl: 'views/components/logs/main.html',
                        providers: [log_service_1.LogService],
                        directives: [router_1.ROUTER_DIRECTIVES, ng2_charts_1.CHART_DIRECTIVES],
                        pipes: [orderby_1.OrderByPipe, filter_1.FilterLogPipe, selectLevel_1.SelectLevelPipe]
                    }), 
                    __metadata('design:paramtypes', [log_service_1.LogService])
                ], LogCmp);
                return LogCmp;
            })();
            exports_1("LogCmp", LogCmp);
        }
    }
});
//# sourceMappingURL=log.js.map