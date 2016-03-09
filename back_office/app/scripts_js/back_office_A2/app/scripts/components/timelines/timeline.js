System.register(['angular2/core', '../../services/timelineService', '../../services/operationsService', '../../pipes/marked', 'angular2/router'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, timelineService_1, operationsService_1, marked_1, router_1;
    var TimelineCmp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (timelineService_1_1) {
                timelineService_1 = timelineService_1_1;
            },
            function (operationsService_1_1) {
                operationsService_1 = operationsService_1_1;
            },
            function (marked_1_1) {
                marked_1 = marked_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            TimelineCmp = (function () {
                function TimelineCmp() {
                }
                TimelineCmp.prototype.getClass = function (index) {
                    if (index % 2 == 1) {
                        return "timeline-inverted";
                    }
                    else {
                        return "";
                    }
                };
                TimelineCmp = __decorate([
                    core_1.Component({
                        selector: 'timeline',
                        templateUrl: 'views/components/utils/timeline.html',
                        providers: [timelineService_1.TimelineService, operationsService_1.OperationsService],
                        directives: [router_1.ROUTER_DIRECTIVES],
                        inputs: ['timelines', 'timelineIndex'],
                        pipes: [marked_1.MarkdownPipe]
                    }), 
                    __metadata('design:paramtypes', [])
                ], TimelineCmp);
                return TimelineCmp;
            })();
            exports_1("TimelineCmp", TimelineCmp);
        }
    }
});
//# sourceMappingURL=timeline.js.map