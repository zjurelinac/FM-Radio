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
var common_1 = require('angular2/common');
var services_1 = require('../../services/services');
var EditUser = (function () {
    function EditUser(http, routeParams, fb, msgService) {
        this.first_name = new common_1.Control('', common_1.Validators.required);
        this.last_name = new common_1.Control('', common_1.Validators.required);
        this.email = new common_1.Control('', common_1.Validators.required);
        this.year_of_birth = new common_1.Control('', common_1.Validators.required);
        this.occupation = new common_1.Control('', common_1.Validators.required);
        this.editable = false;
        this.http = http;
        this.msgService = msgService;
        this.userId = routeParams.get('userId');
        this.userForm = fb.group({
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            year_of_birth: this.year_of_birth,
            occupation: this.occupation
        });
        this.resetForm();
    }
    EditUser.prototype.resetForm = function () {
        var _this = this;
        this.http.get('admin/users/' + this.userId + '/get', function (res) {
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
                    _this[name_1].updateValue(res[name_1]);
            }
        });
    };
    EditUser.prototype.toggleEditable = function () {
        this.resetForm();
        this.editable = !this.editable;
    };
    EditUser.prototype.onSubmit = function (values) {
        var _this = this;
        this.http.postWithRes('/admin/users/' + this.userId + '/modify', values, function (res) {
            _this.msgService.setMessage(res.success_message);
            _this.editable = false;
        });
    };
    EditUser = __decorate([
        core_1.Component({
            selector: 'EditUser',
            templateUrl: './dest/views/editUser/editUser.html',
            directives: [common_1.COMMON_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [services_1.HttpAdvanced, router_1.RouteParams, common_1.FormBuilder, services_1.MsgService])
    ], EditUser);
    return EditUser;
})();
exports.EditUser = EditUser;
//# sourceMappingURL=editUser.js.map