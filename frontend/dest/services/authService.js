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
var services_1 = require('./../services/services');
var ACCOUNT_TYPE = "accountType";
var UNLOGGED = '-1';
var USER = '1';
var EDITOR = '2';
var ADMIN = '3';
var OWNER = '4';
var AuthService = (function () {
    function AuthService(http) {
        this.accountType = 0;
        this.http = http;
        this.storeUserAuthentication();
    }
    AuthService.prototype.storeUserAuthentication = function (callback) {
        this.http.get('/user/account/type', function (res) {
            if (res.account_type && res.account_type > 0)
                sessionStorage.setItem(ACCOUNT_TYPE, res.account_type);
            else if (res.account_type === 0)
                sessionStorage.setItem(ACCOUNT_TYPE, UNLOGGED);
            if (callback)
                callback();
        });
    };
    AuthService.prototype.isInitialized = function () {
        return !!sessionStorage.getItem(ACCOUNT_TYPE);
    };
    AuthService.prototype.getAuthLevel = function () {
        if (!this.isInitialized())
            this.storeUserAuthentication();
        return sessionStorage.getItem(ACCOUNT_TYPE);
    };
    AuthService.prototype.isLoggedInFn = function () {
        return this.isUser() || this.isEditor() || this.isAdmin() || this.isOwner();
    };
    AuthService.prototype.isUser = function () {
        return this.getAuthLevel() == USER;
    };
    AuthService.prototype.isEditor = function () {
        return this.getAuthLevel() == EDITOR;
    };
    AuthService.prototype.isAdmin = function () {
        return this.getAuthLevel() == ADMIN;
    };
    AuthService.prototype.isOwner = function () {
        return this.getAuthLevel() == OWNER;
    };
    AuthService.isUserInjector = function () {
        return function (next, prev) { return core_1.Injector.resolveAndCreate([AuthService, core_1.provide(services_1.HttpAdvanced, { useClass: services_1.HttpAdvanced })]).get(AuthService).isUser(); };
    };
    AuthService.isEditorInjector = function () {
        return function (next, prev) { return core_1.Injector.resolveAndCreate([AuthService, core_1.provide(services_1.HttpAdvanced, { useClass: services_1.HttpAdvanced })]).get(AuthService).isEditor(); };
    };
    AuthService.isAdminInjector = function () {
        return function (next, prev) { return core_1.Injector.resolveAndCreate([AuthService, core_1.provide(services_1.HttpAdvanced, { useClass: services_1.HttpAdvanced })]).get(AuthService).isAdmin(); };
    };
    AuthService.isOwnerInjector = function () {
        return function (next, prev) { return core_1.Injector.resolveAndCreate([AuthService, core_1.provide(services_1.HttpAdvanced, { useClass: services_1.HttpAdvanced })]).get(AuthService).isOwner(); };
    };
    AuthService.prototype.updateLoginStatus = function () {
        var _this = this;
        this.isLoggedIn = this.isLoggedInFn();
        this.storeUserAuthentication(function () {
            _this.isLoggedIn = _this.isLoggedInFn();
            if (_this.isLoggedInFn()) {
                _this.http.getNoError('/user/account/get', function (data) {
                    _this.userName = data.first_name + ' ' + data.last_name;
                    var role = data.account_type;
                    _this.accountType = role;
                    if (role == 1)
                        _this.userRole = "korisnik";
                    if (role == 2)
                        _this.userRole = "urednik";
                    if (role == 3)
                        _this.userRole = "administrator";
                    if (role == 4)
                        _this.userRole = "vlasnik";
                });
            }
        });
    };
    AuthService.prototype.logout = function (callback) {
        var _this = this;
        if (this.isLoggedInFn()) {
            this.http.getNoError('/user/auth/signout', function () {
                _this.isLoggedInFn();
                _this.storeUserAuthentication(callback);
            });
        }
    };
    AuthService.prototype.loginX = function (mail, password) {
        var _this = this;
        console.log(this.isLoggedInFn());
        if (this.isLoggedInFn()) {
            this.logout(function () {
                _this.http.postWithRes('/user/auth/login', { email: mail, password: password }, function () {
                    _this.updateLoginStatus();
                });
            });
        }
        else {
            this.http.postWithRes('/user/auth/login', { email: mail, password: password }, function () {
                _this.updateLoginStatus();
            });
        }
    };
    AuthService.prototype.loginAdmin = function () {
        this.loginX('dito@dito.ninja', '1dominik');
    };
    AuthService.prototype.loginOwner = function () {
        this.loginX('xdwarrior@gmail.com', 'NeprobojnaLozinka');
    };
    AuthService.prototype.loginEditor = function () {
        this.loginX('dominik.ivosevic@gmail.com', '1dominik');
    };
    AuthService.prototype.loginUser = function () {
        this.loginX('dominik.ivosevic@dito.ninja', '1dominik');
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [services_1.HttpAdvanced])
    ], AuthService);
    return AuthService;
})();
exports.AuthService = AuthService;
//# sourceMappingURL=authService.js.map