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
var common_1 = require('angular2/common');
var router_1 = require('angular2/router');
var services_1 = require('../../services/services');
var HeaderBar = (function () {
    function HeaderBar(fb, http, authService) {
        this.http = http;
        this.authService = authService;
        this.authService.updateLoginStatus();
        var loginEntities = ['email', 'password'];
        this.loginForm = fb.create(loginEntities, '/user/auth/login');
    }
    HeaderBar.prototype.onSubmit = function (value) {
        this.authService.loginX(value.email, value.password);
    };
    HeaderBar = __decorate([
        core_1.Component({
            selector: 'header-bar',
            templateUrl: './dest/components/headerBar/headerBar.html',
            directives: [common_1.FORM_DIRECTIVES, common_1.COMMON_DIRECTIVES, router_1.RouterLink]
        }), 
        __metadata('design:paramtypes', [services_1.FormBuilderAdvanced, services_1.HttpAdvanced, services_1.AuthService])
    ], HeaderBar);
    return HeaderBar;
})();
exports.HeaderBar = HeaderBar;
//# sourceMappingURL=headerBar.js.map