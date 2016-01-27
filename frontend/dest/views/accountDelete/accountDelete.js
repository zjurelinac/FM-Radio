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
var router_1 = require('angular2/router');
var services_1 = require('../../services/services');
var AccountDelete = (function () {
    function AccountDelete(http, router) {
        this.password = "";
        this.http = http;
        this.router = router;
    }
    AccountDelete.prototype.submitDelete = function () {
        var _this = this;
        if (this.password) {
            this.http.postWithBothMsg('/user/account/delete', { password: this.password }, function (res) {
                _this.router.navigate(['Index']);
            });
        }
    };
    AccountDelete = __decorate([
        core_1.Component({
            selector: 'AccountDelete',
            templateUrl: './dest/views/accountDelete/accountDelete.html'
        }), 
        __metadata('design:paramtypes', [services_1.HttpAdvanced, router_1.Router])
    ], AccountDelete);
    return AccountDelete;
})();
exports.AccountDelete = AccountDelete;
//# sourceMappingURL=accountDelete.js.map