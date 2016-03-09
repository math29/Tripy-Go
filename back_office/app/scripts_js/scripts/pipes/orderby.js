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
    var OrderByPipe;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            OrderByPipe = (function () {
                function OrderByPipe() {
                }
                OrderByPipe.prototype.transform = function (array, args) {
                    if (typeof args[0] === "undefined") {
                        console.log('return');
                        return array;
                    }
                    var direction = args[0][0];
                    var column = args[0].slice(1);
                    array.sort(function (a, b) {
                        var left = a[column];
                        var right = b[column];
                        console.log(left);
                        console.log(right);
                        return (direction === "-") ? right - left : left - right;
                    });
                    return array;
                };
                OrderByPipe = __decorate([
                    core_1.Pipe({
                        name: "orderBy"
                    }), 
                    __metadata('design:paramtypes', [])
                ], OrderByPipe);
                return OrderByPipe;
            })();
            exports_1("OrderByPipe", OrderByPipe);
        }
    }
});
//# sourceMappingURL=orderby.js.map