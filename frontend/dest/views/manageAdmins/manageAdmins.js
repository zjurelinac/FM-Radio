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
var ManageAdmins = (function () {
    function ManageAdmins(http, msgService) {
        var _this = this;
        this.admins = new Array();
        this.closestMatches = new Array();
        this.editable = false;
        this.userSearch = "";
        this.http = http;
        this.msgService = msgService;
        http.get('/owner/admins/list', function (res) {
            _this.admins = new Array();
            for (var i in res) {
                _this.admins.push(new User(res[i]));
            }
        });
    }
    ManageAdmins.prototype.toggleEditable = function () {
        this.editable = !this.editable;
        this.closestMatches = new Array();
        this.userSearch = "";
    };
    ManageAdmins.prototype.onKeyPressed = function (charCode) {
        var _this = this;
        var query = "";
        if (charCode == 8)
            query = this.userSearch.slice(0, this.userSearch.length - 1);
        else
            query = this.userSearch ? (this.userSearch + String.fromCharCode(charCode)) : String.fromCharCode(charCode);
        if (query && query.length >= 3) {
            this.http.get('/users/search/' + query, function (res) {
                _this.closestMatches = new Array();
                for (var i in res) {
                    _this.closestMatches.push(new User(res[i]));
                }
            });
        }
        else {
            this.closestMatches = new Array();
        }
    };
    ManageAdmins.prototype.enterCheck = function (event) {
        var keyCode = event.keyCode;
        if (keyCode == 13 && this.closestMatches.length > 0) {
            this.addAdmin();
        }
        else if (keyCode >= 65 && keyCode <= 90 || keyCode >= 97 && keyCode <= 122 || keyCode == 8)
            this.onKeyPressed(keyCode);
    };
    ManageAdmins.prototype.addAdmin = function () {
        if (this.closestMatches.length == 0)
            return;
        if (this.admins.length > 9) {
            this.msgService.setMessage('U sustavu već postoji 10 administratora, nije moguće dodati još jednog.', 'error');
            this.userSearch = "";
            this.closestMatches = new Array();
            return;
        }
        var id = this.closestMatches[0].id;
        this.http.postWithBothMsg('/owner/admins/add/' + id, '');
        this.admins.push(this.closestMatches[0]);
        this.userSearch = "";
        this.closestMatches = new Array();
    };
    ManageAdmins.prototype.removeAdmin = function (removedAdminId) {
        for (var i in this.admins) {
            if (this.admins[i].id === removedAdminId) {
                this.admins.splice(i, 1);
                break;
            }
        }
        this.http.post('/owner/admins/remove/' + removedAdminId.toString(), '');
    };
    ManageAdmins = __decorate([
        core_1.Component({
            selector: 'ManageAdmins',
            templateUrl: './dest/views/manageAdmins/manageAdmins.html',
            directives: [common_1.COMMON_DIRECTIVES, common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [services_1.HttpAdvanced, services_1.MsgService])
    ], ManageAdmins);
    return ManageAdmins;
})();
exports.ManageAdmins = ManageAdmins;
var User = (function () {
    function User(obj) {
        this.id = obj['id'];
        this.first_name = obj['first_name'];
        this.last_name = obj['last_name'];
        this.email = obj['email'];
        this.year_of_birth = obj['year_of_birth'];
        this.occupation = obj['occupation'];
        this.account_type = obj['account_type'];
    }
    return User;
})();
//# sourceMappingURL=manageAdmins.js.map