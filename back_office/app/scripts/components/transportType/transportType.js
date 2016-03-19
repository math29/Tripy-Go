"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var transportTypeService_1 = require('../../services/transportTypeService');
var router_1 = require('angular2/router');
var io = require('socket.io-client');
var TransportTypeCmp = (function () {
    function TransportTypeCmp(el, _transportTypeService) {
        this.el = el;
        this._transportTypeService = _transportTypeService;
        this.errors = [];
        this.messages = [];
        this.orderby = '';
        this.orderOptions = ['+', '-'];
        this.orderType = this.orderOptions[0];
        var host = window.location.origin;
        this.socket = io.connect('', { path: '/socket.io-client' });
    }
    TransportTypeCmp.prototype.ngOnInit = function () {
        var _this = this;
        this.getTransportTypes();
        this.socket.on('transportType:remove', function (data) {
            for (var i = 0; i < _this.transportTypes.length; i++) {
                if (_this.transportTypes[i]._id == data._id) {
                    _this.transportTypes.splice(i, 1);
                    break;
                }
            }
        });
    };
    TransportTypeCmp.prototype.ngAfterViewInit = function () {
        console.log('HERE');
    };
    TransportTypeCmp.prototype.initNewTransportType = function () {
        this.typeEdit = { name: "", img: "" };
        var millisecondsToWait = 250;
        var test = this.typeEdit;
        setTimeout(function () {
            var iconPicker = $('#typeIcon').iconpicker({ icon: 'car', iconset: 'fontawesome' });
            iconPicker.on('change', function (e) {
                test.img = e.icon;
            });
        }, millisecondsToWait);
    };
    TransportTypeCmp.prototype.ngOnDestroy = function () {
        this.socket.removeAllListeners('transportType:remove');
        this.socket.removeAllListeners('transportType:save');
    };
    TransportTypeCmp.prototype.textIsValid = function (text) {
        var valid = true;
        if (typeof text === 'undefined' || text.length === 0) {
            valid = false;
        }
        return valid;
    };
    TransportTypeCmp.prototype.edit = function (type) {
        this.typeEdit = type;
    };
    TransportTypeCmp.prototype.saveTransportType = function (transportType) {
        var _this = this;
        this._transportTypeService.saveTransportType(transportType)
            .subscribe(function (data) { return _this.messages.push("Moyen de transport sauvegardé"); }, function (errors) { return _this.errors.push("Impossible de sauvegarder le moyen de transport"); });
    };
    TransportTypeCmp.prototype.getTransportTypes = function () {
        var _this = this;
        this._transportTypeService.getTransportTypes()
            .subscribe(function (data) {
            _this.transportTypes = data;
            if (_this.transportTypes.length > 0) {
                _this.keys = Object.keys(_this.transportTypes[0]);
                _this.keys.splice(0, 1);
                _this.selection = _this.keys[1];
                _this.orderby = _this.keys[1];
            }
            _this.socket.on('user:save', function (data) {
                var index = _this.findTransportIndex(data._id);
                if (index > -1) {
                    _this.transportTypes[index] = data;
                }
                else {
                    _this.transportTypes.push(data);
                }
            });
        }, function (errors) { return console.log(errors); });
    };
    TransportTypeCmp.prototype.findTransportIndex = function (id) {
        for (var i = 0; i < this.transportTypes.length; i++) {
            if (this.transportTypes[i]._id == id) {
                return i;
            }
        }
        return -1;
    };
    TransportTypeCmp.prototype.deleteTransportType = function (transportType) {
        this._transportTypeService.deleteTransportType(transportType).subscribe();
    };
    TransportTypeCmp = __decorate([
        core_1.Component({
            selector: 'transport-type',
            templateUrl: 'views/components/transportType/main.html',
            styleUrls: ['back/lib/bootstrap-iconpicker/bootstrap-iconpicker/css/bootstrap-iconpicker.min.css'],
            providers: [transportTypeService_1.TransportTypeService],
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, transportTypeService_1.TransportTypeService])
    ], TransportTypeCmp);
    return TransportTypeCmp;
}());
exports.TransportTypeCmp = TransportTypeCmp;
