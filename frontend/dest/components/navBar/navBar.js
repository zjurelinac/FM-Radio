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
var NavBar = (function () {
    function NavBar(authService, router) {
        this.authService = authService;
        this.navigation = services_1.NavigationProvider.getNavigationArray();
        this.router = router;
    }
    NavBar.prototype.isVisible = function (at) {
        return ((1 << this.authService.getAuthLevel()) & at) != 0;
    };
    NavBar.prototype.logout = function () {
        var _this = this;
        this.authService.logout(function () { return _this.router.navigate(['/Index']); });
    };
    NavBar = __decorate([
        core_1.Component({
            selector: 'nav-bar',
            templateUrl: './dest/components/navBar/navBar.html',
            directives: [common_1.FORM_DIRECTIVES, common_1.COMMON_DIRECTIVES, router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [services_1.AuthService, router_1.Router])
    ], NavBar);
    return NavBar;
})();
exports.NavBar = NavBar;
//# sourceMappingURL=navBar.js.map