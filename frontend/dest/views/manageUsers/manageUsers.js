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
var ManageUsers = (function () {
    function ManageUsers(http, router) {
        var _this = this;
        this.editable = false;
        this.http = http;
        this.router = router;
        http.get('/admin/users/list', function (res) {
            _this.users = new Array();
            for (var i in res)
                _this.users.push(res[i]);
        });
    }
    ManageUsers.prototype.toggleEditable = function () { this.editable = !this.editable; };
    ManageUsers.prototype.editUser = function (userId) {
        this.router.navigate(['/Settings', 'EditUser', { userId: userId }]);
    };
    ManageUsers.prototype.deleteUser = function (userId) {
        for (var i in this.users) {
            if (this.users[i].id.toString() === userId.toString()) {
                this.users.splice(i, 1);
            }
        }
        this.http.postWithBothMsg('admin/users/' + userId + '/delete', '');
    };
    ManageUsers = __decorate([
        core_1.Component({
            selector: 'ManageUsers',
            templateUrl: './dest/views/manageUsers/manageUsers.html'
        }), 
        __metadata('design:paramtypes', [services_1.HttpAdvanced, router_1.Router])
    ], ManageUsers);
    return ManageUsers;
})();
exports.ManageUsers = ManageUsers;
//# sourceMappingURL=manageUsers.js.map