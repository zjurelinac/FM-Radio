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
var services_1 = require('../../services/services');
var AccountPassword = (function () {
    function AccountPassword(http, authService, msgService) {
        this.old_password = "";
        this.new_password1 = "";
        this.new_password2 = "";
        this.http = http;
        this.authService = authService;
        this.msgService = msgService;
    }
    AccountPassword.prototype.submitChange = function () {
        var _this = this;
        this.http.postWithBothMsg('/user/account/change_password', {
            old_password: this.old_password,
            new_password1: this.new_password1,
            new_password2: this.new_password2 }, function (res) {
            _this.old_password = "";
            _this.new_password1 = "";
            _this.new_password2 = "";
        });
    };
    AccountPassword = __decorate([
        core_1.Component({
            selector: 'AccountPassword',
            templateUrl: './dest/views/accountPassword/accountPassword.html'
        }), 
        __metadata('design:paramtypes', [services_1.HttpAdvanced, services_1.AuthService, services_1.MsgService])
    ], AccountPassword);
    return AccountPassword;
})();
exports.AccountPassword = AccountPassword;
//# sourceMappingURL=accountPassword.js.map