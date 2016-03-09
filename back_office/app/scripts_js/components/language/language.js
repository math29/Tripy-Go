/// <reference path="../../../../../typings/socket.io-client/socket.io-client.d.ts" />
System.register(['angular2/core', '../../services/languageService', '../../classes/language', 'angular2/router', '../../pipes/orderby', 'socket.io-client'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, languageService_1, language_1, router_1, orderby_1, io;
    var LanguageCmp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (languageService_1_1) {
                languageService_1 = languageService_1_1;
            },
            function (language_1_1) {
                language_1 = language_1_1;
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
            LanguageCmp = (function () {
                function LanguageCmp(_languageService) {
                    this._languageService = _languageService;
                    this.errors = [];
                    this.messages = [];
                    this.orderby = '';
                    this.orderOptions = ['+', '-'];
                    this.orderType = this.orderOptions[0];
                    var host = window.location.origin;
                    this.socket = io.connect('', { path: '/socket.io-client' });
                }
                LanguageCmp.prototype.logError = function (err) {
                    console.error('There was an error: ' + err);
                };
                LanguageCmp.prototype.ngOnInit = function () {
                    var _this = this;
                    this.getLanguages();
                    // appelé lorsqu'un language est supprimé
                    this.socket.on('language:remove', function (data) {
                        for (var i = 0; i < _this.languages.length; i++) {
                            if (_this.languages[i]._id == data._id) {
                                _this.languages.splice(i, 1);
                                break;
                            }
                        }
                    });
                };
                LanguageCmp.prototype.ngOnDestroy = function () {
                    this.socket.removeAllListeners('language:remove');
                    this.socket.removeAllListeners('language:save');
                };
                LanguageCmp.prototype.textIsValid = function (text) {
                    var valid = true;
                    if (typeof text === 'undefined' || text.length === 0) {
                        valid = false;
                    }
                    return valid;
                };
                LanguageCmp.prototype.edit = function (language) {
                    this.new_language = language;
                };
                LanguageCmp.prototype.initNewLanguage = function () {
                    this.new_language = new language_1.Language("", "", "");
                };
                LanguageCmp.prototype.getLanguages = function () {
                    var _this = this;
                    this._languageService.getLanguages()
                        .subscribe(function (data) {
                        _this.languages = data;
                        if (_this.languages.length > 0) {
                            _this.keys = Object.keys(_this.languages[0]);
                            _this.keys.splice(0, 1);
                            _this.selection = _this.keys[1];
                            _this.orderby = _this.keys[1];
                            console.log(_this.orderType + _this.orderby);
                        }
                        // set socket to listen languages saved
                        _this.socket.on('language:save', function (data) {
                            var index = _this.findLanguageIndex(data._id);
                            if (index > -1) {
                                _this.languages[index] = data;
                            }
                            else {
                                _this.languages.push(data);
                            }
                        });
                    }, function (errors) { return console.log(errors); });
                };
                /**
                 * Retourne l'index d'une langue dans la liste des langues
                 *
                 * @param id: id de la langue à trouver
                 *
                 * @return index: index de la langue ou -1 si non trouvée
                 */
                LanguageCmp.prototype.findLanguageIndex = function (id) {
                    for (var i = 0; i < this.languages.length; i++) {
                        if (this.languages[i]._id == id) {
                            return i;
                        }
                    }
                    return -1;
                };
                LanguageCmp.prototype.create = function (language) {
                    var _this = this;
                    this._languageService.saveLanguage(language)
                        .subscribe(function (data) {
                        _this.new_language = null;
                    }, function (errors) { return console.log(errors); });
                };
                LanguageCmp.prototype.deleteLanguage = function (language) {
                    this._languageService.deleteLanguage(language).subscribe();
                };
                LanguageCmp = __decorate([
                    core_1.Component({
                        selector: 'languages',
                        templateUrl: 'views/components/language/main.html',
                        providers: [languageService_1.LanguageService],
                        directives: [router_1.ROUTER_DIRECTIVES],
                        pipes: [orderby_1.OrderByPipe]
                    }), 
                    __metadata('design:paramtypes', [languageService_1.LanguageService])
                ], LanguageCmp);
                return LanguageCmp;
            })();
            exports_1("LanguageCmp", LanguageCmp);
        }
    }
});
//# sourceMappingURL=language.js.map