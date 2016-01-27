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
var services_1 = require('../../../services/services');
var AdminsList = (function () {
    function AdminsList(http) {
        var _this = this;
        this.admins = [];
        this.http = http;
        this.http.getNoError('/stats/active_admins/list', function (res) { return _this.admins = res; });
    }
    AdminsList = __decorate([
        core_1.Component({
            selector: 'admins-list',
            templateUrl: './dest/components/stats/adminsList/adminsList.html',
            directives: [common_1.COMMON_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [services_1.HttpAdvanced])
    ], AdminsList);
    return AdminsList;
})();
exports.AdminsList = AdminsList;
//# sourceMappingURL=adminsList.js.map