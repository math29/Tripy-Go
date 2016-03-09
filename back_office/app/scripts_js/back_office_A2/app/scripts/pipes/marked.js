/// <reference path="../../../../typings/marked/marked.d.ts" />
System.register(['angular2/core', 'marked'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, marked;
    var MarkdownPipe;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (marked_1) {
                marked = marked_1;
            }],
        execute: function() {
            /*
             * Filter log items which contains query
             * Usage:
             *   value | filterLog:query
             * Example:
             *   {{ 2 |  filterLog:DISCONNECTING}}
            */
            MarkdownPipe = (function () {
                function MarkdownPipe() {
                }
                MarkdownPipe.prototype.transform = function (value, args) {
                    return marked.parse(value);
                };
                MarkdownPipe = __decorate([
                    core_1.Pipe({
                        name: "markdown"
                    }), 
                    __metadata('design:paramtypes', [])
                ], MarkdownPipe);
                return MarkdownPipe;
            })();
            exports_1("MarkdownPipe", MarkdownPipe);
        }
    }
});
//# sourceMappingURL=marked.js.map