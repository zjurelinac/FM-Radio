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
var services_1 = require('../../services/services');
var AccountData = (function () {
    function AccountData(http, fb) {
        this.editable = false;
        this.http = http;
        var controlsNames = ["first_name", "last_name", "email", "year_of_birth", "occupation"];
        this.userForm = fb.create(controlsNames, 'user/account/modify');
        this.resetForm();
    }
    AccountData.prototype.resetForm = function () {
        var _this = this;
        this.http.get('user/account/get', function (res) {
            for (var name_1 in res) {
                if (name_1 == 'account_type') {
                    if (res.account_type == 1)
                        _this.account_type = "korisnik";
                    else if (res.account_type == 2)
                        _this.account_type = "urednik";
                    else if (res.account_type == 3)
                        _this.account_type = "administrator";
                    else if (res.account_type == 4)
                        _this.account_type = "vlasnik";
                }
                else if (name_1 == 'id')
                    continue;
                else
                    _this.userForm.controls[name_1].updateValue(res[name_1]);
            }
        });
    };
    AccountData.prototype.toggleEditable = function () {
        this.resetForm();
        this.editable = !this.editable;
    };
    AccountData.prototype.onSubmit = function (values) {
        var _this = this;
        console.log(values);
        this.http.postWithBothMsg('/user/account/modify', values, function (res) {
            _this.editable = false;
        });
    };
    AccountData = __decorate([
        core_1.Component({
            selector: 'AccountData',
            directives: common_1.COMMON_DIRECTIVES,
            templateUrl: './dest/views/accountData/accountData.html'
        }), 
        __metadata('design:paramtypes', [services_1.HttpAdvanced, services_1.FormBuilderAdvanced])
    ], AccountData);
    return AccountData;
})();
exports.AccountData = AccountData;
//# sourceMappingURL=accountData.js.map