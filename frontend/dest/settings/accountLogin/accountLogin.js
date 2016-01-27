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
var angular2_jwt_1 = require('angular2-jwt');
var AccountLogin = (function () {
    function AccountLogin() {
        this.lock = new Auth0Lock('9MZBhjM9RwmZSXcFFWvoc2PKcqzwCpIz', 'bananablade.eu.auth0.com');
    }
    AccountLogin.prototype.login = function () {
        this.lock.show(function (err, profile, id_token) {
            if (err) {
                throw new Error(err);
            }
            localStorage.setItem('profile', JSON.stringify(profile));
            localStorage.setItem('id_token', id_token);
        });
    };
    AccountLogin.prototype.logout = function () {
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
    };
    AccountLogin.prototype.loggedIn = function () {
        return angular2_jwt_1.tokenNotExpired();
    };
    AccountLogin = __decorate([
        core_1.Component({
            selector: 'AccountLogin',
            template: "\n    <h1>Welcome to Angular2 with Auth0</h1>\n    <button *ngIf=\"!loggedIn()\" (click)=\"login()\">Login</button>\n    <button *ngIf=\"loggedIn()\" (click)=\"logout()\">Logout</button>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], AccountLogin);
    return AccountLogin;
})();
exports.AccountLogin = AccountLogin;
//# sourceMappingURL=accountLogin.js.map