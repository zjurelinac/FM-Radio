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
var http_1 = require('angular2/http');
var common_1 = require('angular2/common');
var ManageAdmins = (function () {
    function ManageAdmins(http) {
        var _this = this;
        this.editable = false;
        this.editable = false;
        this.admins = new Array();
        http.get('/owner/admins/list').map(function (res) { return res.json().data; }).subscribe(function (res) {
            for (var i in res) {
                var admin = new Admin(res[i]);
                _this.admins.push(admin);
            }
        });
    }
    ManageAdmins.prototype.toggleEditable = function () {
        this.editable = !this.editable;
    };
    ManageAdmins = __decorate([
        core_1.Component({
            selector: 'ManageAdmins',
            templateUrl: './dest/settings/manageAdmins/manageAdmins.html',
            directives: [common_1.NgSwitchWhen, common_1.NgSwitch, common_1.NgSwitchDefault, common_1.NgIf, common_1.NgFor, common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ManageAdmins);
    return ManageAdmins;
})();
exports.ManageAdmins = ManageAdmins;
var Admin = (function () {
    function Admin(obj) {
        this.id = obj['id'];
        this.first_name = obj['first_name'];
        this.last_name = obj['last_name'];
        this.email = obj['email'];
        this.year_of_birth = obj['year_of_birth'];
        this.occupation = obj['occupation'];
    }
    return Admin;
})();
//# sourceMappingURL=manageAdmins.js.map