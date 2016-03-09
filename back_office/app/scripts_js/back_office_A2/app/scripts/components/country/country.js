/// <reference path="../../../../../typings/socket.io-client/socket.io-client.d.ts" />
System.register(['angular2/core', '../../services/languageService', '../../services/countryService', '../../classes/country', 'angular2/router', '../../pipes/orderby', 'socket.io-client'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, languageService_1, countryService_1, country_1, router_1, orderby_1, io;
    var CountryCmp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (languageService_1_1) {
                languageService_1 = languageService_1_1;
            },
            function (countryService_1_1) {
                countryService_1 = countryService_1_1;
            },
            function (country_1_1) {
                country_1 = country_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (orderby_1_1) {
                orderby_1 = orderby_1_1;
            },
            function (io_1) {
                io = io_1;
            }],
        execute: function() {
            CountryCmp = (function () {
                function CountryCmp(_countryService, _languageService) {
                    this._countryService = _countryService;
                    this._languageService = _languageService;
                    this.errors = [];
                    this.messages = [];
                    this.orderby = '';
                    this.orderOptions = ['+', '-'];
                    this.orderType = this.orderOptions[0];
                    this.continentList = ["Europe", "Asia", "Oceania", "Amérique du Nord", "Amérique du Sud", "Artique", "Antartique"];
                    var host = window.location.origin;
                    this.socket = io.connect('', { path: '/socket.io-client' });
                }
                CountryCmp.prototype.logError = function (err) {
                    console.error('There was an error: ' + err);
                };
                CountryCmp.prototype.ngOnInit = function () {
                    var _this = this;
                    this.getLanguages();
                    this.getCountries();
                    // appelé lorsqu'un language est supprimé
                    this.socket.on('country:remove', function (data) {
                        for (var i = 0; i < _this.countries.length; i++) {
                            if (_this.countries[i]._id == data._id) {
                                _this.countries.splice(i, 1);
                                break;
                            }
                        }
                    });
                };
                CountryCmp.prototype.ngOnDestroy = function () {
                    this.socket.removeAllListeners('country:remove');
                    this.socket.removeAllListeners('country:save');
                };
                CountryCmp.prototype.textIsValid = function (text) {
                    var valid = true;
                    if (typeof text === 'undefined' || text.length === 0) {
                        valid = false;
                    }
                    return valid;
                };
                CountryCmp.prototype.edit = function (country) {
                    this.edit_country = country;
                };
                CountryCmp.prototype.initCountry = function () {
                    this.edit_country = new country_1.Country("", "", "", this.continentList[0], 0);
                    this.edit_country.continent = this.continentList[0];
                };
                CountryCmp.prototype.getCountries = function () {
                    var _this = this;
                    this._countryService.getCountries()
                        .subscribe(function (data) {
                        _this.countries = data;
                        if (_this.countries.length > 0) {
                            _this.keys = Object.keys(_this.countries[0]);
                            _this.keys.splice(0, 1);
                            _this.selection = _this.keys[1];
                            _this.orderby = _this.keys[1];
                        }
                        // set socket to listen languages saved
                        _this.socket.on('country:save', function (data) {
                            var index = _this.findCountryIndex(data._id);
                            if (index > -1) {
                                _this.countries[index] = data;
                            }
                            else {
                                _this.countries.push(data);
                            }
                        });
                    }, function (errors) { return console.log(errors); });
                };
                /**
                 * Récupère les différents languages disponible en base de données
                 */
                CountryCmp.prototype.getLanguages = function () {
                    var _this = this;
                    this._languageService.getLanguages()
                        .subscribe(function (data) { return _this.languages = data; }, function (errors) { return _this.errors.push(errors); });
                };
                /**
                 * Retourne l'index d'un pays dans la liste des pays
                 *
                 * @param id: id du pays à trouver
                 *
                 * @return index: index du pays ou -1 si non trouvée
                 */
                CountryCmp.prototype.findCountryIndex = function (id) {
                    for (var i = 0; i < this.countries.length; i++) {
                        if (this.countries[i]._id == id) {
                            return i;
                        }
                    }
                    return -1;
                };
                CountryCmp.prototype.create = function (country) {
                    var _this = this;
                    this._countryService.saveCountry(country)
                        .subscribe(function (data) {
                        _this.edit_country = undefined;
                    }, function (errors) { return console.log(errors); });
                };
                CountryCmp.prototype.deleteCountry = function (country) {
                    this._countryService.deleteCountry(country).subscribe();
                };
                CountryCmp = __decorate([
                    core_1.Component({
                        selector: 'countries',
                        templateUrl: 'views/components/country/main.html',
                        providers: [countryService_1.CountryService, languageService_1.LanguageService],
                        directives: [router_1.ROUTER_DIRECTIVES],
                        pipes: [orderby_1.OrderByPipe]
                    }), 
                    __metadata('design:paramtypes', [countryService_1.CountryService, languageService_1.LanguageService])
                ], CountryCmp);
                return CountryCmp;
            })();
            exports_1("CountryCmp", CountryCmp);
        }
    }
});
//# sourceMappingURL=country.js.map