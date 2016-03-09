System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var FilterLogPipe;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            /*
             * Filter log items which contains query
             * Usage:
             *   value | filterLog:query
             * Example:
             *   {{ 2 |  filterLog:DISCONNECTING}}
            */
            FilterLogPipe = (function () {
                function FilterLogPipe() {
                }
                FilterLogPipe.prototype.transform = function (value, args) {
                    return value.filter(function (item) { return item.message.indexOf(args) >= 0; });
                };
                FilterLogPipe = __decorate([
                    core_1.Pipe({
                        name: "filterLog"
                    }), 
                    __metadata('design:paramtypes', [])
                ], FilterLogPipe);
                return FilterLogPipe;
            })();
            exports_1("FilterLogPipe", FilterLogPipe);
        }
    }
});
//# sourceMappingURL=filter.js.map