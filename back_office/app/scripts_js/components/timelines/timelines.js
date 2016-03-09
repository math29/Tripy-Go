/// <reference path="../../../../../typings/socket.io-client/socket.io-client.d.ts" />
System.register(['angular2/core', '../utils/stats', '../../services/timelineService', '../../services/operationsService', './timeline', '../../pipes/marked', 'angular2/router', 'socket.io-client'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, stats_1, timelineService_1, operationsService_1, timeline_1, marked_1, router_1, io;
    var TimelinesCmp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (stats_1_1) {
                stats_1 = stats_1_1;
            },
            function (timelineService_1_1) {
                timelineService_1 = timelineService_1_1;
            },
            function (operationsService_1_1) {
                operationsService_1 = operationsService_1_1;
            },
            function (timeline_1_1) {
                timeline_1 = timeline_1_1;
            },
            function (marked_1_1) {
                marked_1 = marked_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (io_1) {
                io = io_1;
            }],
        execute: function() {
            TimelinesCmp = (function () {
                function TimelinesCmp(_timelineService, _operationsService) {
                    this._timelineService = _timelineService;
                    this._operationsService = _operationsService;
                    this.errors = [];
                    this.messages = [];
                    this.operationEdit = null;
                    this.timelines = null;
                    this.operations = null;
                    this.timelineIndex = 0;
                    var host = window.location.origin;
                    this.socket = io.connect('', { path: '/socket.io-client' });
                }
                TimelinesCmp.prototype.getTimelines = function () {
                    var _this = this;
                    this._timelineService.getTimelines().subscribe(function (res) {
                        _this.timelines = res;
                        _this.timelines = JSON.parse(_this.timelines._body);
                        // création d'une timeline si il n'en éxiste pas
                        if (_this.timelines.length == 0) {
                            _this.createTimeline();
                        }
                        _this.socket.on('timeline:save', function (data) { return console.log(data); });
                    }, function (error) { _this.errors.push("Impossible de récupérer les timelines"); });
                };
                TimelinesCmp.prototype.ngOnDestroy = function () {
                    this.socket.removeAllListeners('operation:remove');
                    this.socket.removeAllListeners('operation:save');
                    this.socket.removeAllListeners('timeline:save');
                };
                /**
                 * Insertion d'une timeline via l'API
                 */
                TimelinesCmp.prototype.createTimelineAPI = function () {
                    var _this = this;
                    this._timelineService.createTimeline(this.newTimeline)
                        .subscribe(function (res) {
                        console.log(res);
                        if (res.status == 201) {
                            _this.messages.push('Timeline créée avec succès');
                            _this.newTimeline = null;
                        }
                    }, function (errors) { _this.errors.push('Impossible d\'insérer la timeline'); });
                };
                TimelinesCmp.prototype.createTimeline = function () {
                    this.newTimeline = { name: "", description: "" };
                };
                TimelinesCmp.prototype.getOperations = function () {
                    var _this = this;
                    this._operationsService.getOperations()
                        .subscribe(function (data) { return _this.operations = data; }, function (err) { _this.logError(err); _this.errors.push("Impossible de récupérer la liste des opérations."); });
                    //this.socket.syncUpdates('operation', this.operations);
                    this.socket.on('operation:save', function (data) {
                        console.log(data);
                    });
                    this.socket.on('operation:remove', function (data) {
                        console.log(data);
                    });
                };
                TimelinesCmp.prototype.logError = function (err) {
                    console.error('There was an error: ' + err);
                };
                TimelinesCmp.prototype.ngOnInit = function () {
                    this.getOperations();
                    this.getTimelines();
                };
                TimelinesCmp.prototype.textIsValid = function (text) {
                    var valid = true;
                    if (typeof text === 'undefined' || text.length === 0) {
                        valid = false;
                    }
                    return valid;
                };
                TimelinesCmp.prototype.createOperation = function () {
                    this.operationEdit = { title: "", content: "" };
                };
                TimelinesCmp.prototype.getIndexOfOperation = function (operation, list) {
                    for (var i = 0; i < list.length; i++) {
                        if (list[i]._id === operation._id) {
                            return i;
                        }
                    }
                    return -1;
                };
                TimelinesCmp.prototype.editOperation = function (operation) {
                    this.operationEdit = operation;
                };
                /**
                 * L'opération est elle déjà associée à la timeline?
                 *
                 * @param timeline  Timeline dans laquelle on recherche l'opération
                 * @param operation Opération à chercher
                 * @returns True si l'opération est associée à la timeline, False sinon
                 *
                 */
                TimelinesCmp.prototype.isTimelineOnOperation = function (timeline, operation) {
                    if (operation !== null) {
                        if (operation.steps !== undefined) {
                            for (var i = 0; i < operation.steps.length; i++) {
                                if (operation.steps[i].id === timeline._id) {
                                    return true;
                                }
                            }
                        }
                    }
                    return false;
                };
                /**
                 * Ajoute une opération à une timeline (Ne pas oublier de soumettre les informations)
                 *
                 * @param timeline  Timeline dans laquelle ajouter l'opération
                 */
                TimelinesCmp.prototype.addToTimeline = function (timeline) {
                    var tmline = { id: timeline._id, step: timeline.operations.length };
                    if (!this.isTimelineOnOperation(timeline, this.operationEdit)) {
                        if (this.operationEdit.steps === undefined) {
                            this.operationEdit.steps = [];
                        }
                        this.operationEdit.steps.push(tmline);
                    }
                };
                TimelinesCmp.prototype.removeFromTimeline = function (timeline) {
                    var index = this.findTimelineInOperation(timeline, this.operationEdit);
                    console.log(index);
                    if (index !== -1) {
                        this.operationEdit.steps.splice(index, 1);
                    }
                    console.log('removed');
                    console.log(this.operationEdit);
                };
                TimelinesCmp.prototype.findTimelineInOperation = function (timeline, operation) {
                    if (operation.steps !== undefined) {
                        for (var i = 0; i < operation.steps.length; i++) {
                            if (operation.steps[i].id === timeline._id) {
                                return i;
                            }
                        }
                    }
                    return -1;
                };
                TimelinesCmp.prototype.createThisTimeline = function () { };
                TimelinesCmp.prototype.saveOperation = function (operation) {
                    var _this = this;
                    this._operationsService.saveOperation(operation)
                        .subscribe(function (res) {
                        if (res.status == 201) {
                            _this.messages.push("L'opération à été créée");
                        }
                        else if (res.status == 200) {
                            _this.messages.push("L'opération à été modifiée");
                        }
                        _this.operationEdit = null;
                    }, function (error) {
                        _this.errors.push("Erreur lors de la modification/création de l'opération");
                    });
                };
                /**
                 * Supprime une opération de la base de données
                 *
                 * @param operation: Opération à supprimer
                 */
                TimelinesCmp.prototype.deleteOperation = function (operation) {
                    var _this = this;
                    this._operationsService.deleteOperation(operation)
                        .subscribe(function (res) {
                        _this.messages.push("L'opération à bien été supprimée");
                        var index = _this.getIndexOfOperation(operation, _this.operations);
                        if (index > -1) {
                            _this.operations.splice(index, 1);
                        }
                    }, function (error) { _this.errors.push("Impossible de supprimer l'opération"); });
                };
                TimelinesCmp = __decorate([
                    core_1.Component({
                        selector: 'timelines',
                        templateUrl: 'views/components/timelines/main.html',
                        providers: [timelineService_1.TimelineService, operationsService_1.OperationsService],
                        directives: [router_1.ROUTER_DIRECTIVES, stats_1.StatsCmp, timeline_1.TimelineCmp],
                        pipes: [marked_1.MarkdownPipe]
                    }), 
                    __metadata('design:paramtypes', [timelineService_1.TimelineService, operationsService_1.OperationsService])
                ], TimelinesCmp);
                return TimelinesCmp;
            })();
            exports_1("TimelinesCmp", TimelinesCmp);
        }
    }
});
//# sourceMappingURL=timelines.js.map