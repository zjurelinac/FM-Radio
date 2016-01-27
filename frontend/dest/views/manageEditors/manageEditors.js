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
var ManageEditors = (function () {
    function ManageEditors(http) {
        var _this = this;
        this.editors = new Array();
        this.closestMatches = new Array();
        this.editable = false;
        this.userSearch = "";
        this.http = http;
        http.get('/admin/editors/list', function (res) {
            _this.editors = new Array();
            for (var i in res) {
                _this.editors.push(new User(res[i]));
            }
        });
    }
    ManageEditors.prototype.toggleEditable = function () {
        this.editable = !this.editable;
        this.closestMatches = new Array();
        this.userSearch = "";
    };
    ManageEditors.prototype.onKeyPressed = function (charCode) {
        var _this = this;
        var query = "";
        if (charCode == 8)
            query = this.userSearch.slice(0, this.userSearch.length - 1);
        else
            query = this.userSearch ? (this.userSearch + String.fromCharCode(charCode)) : String.fromCharCode(charCode);
        if (query && query.length >= 3) {
            this.http.getNoError('/users/search/' + query, function (res) {
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
    ManageEditors.prototype.enterCheck = function (event) {
        var keyCode = event.keyCode;
        if (keyCode == 13 && this.closestMatches.length > 0) {
            this.addEditor();
        }
        else if (keyCode >= 65 && keyCode <= 90 || keyCode >= 97 && keyCode <= 122 || keyCode == 8)
            this.onKeyPressed(keyCode);
    };
    ManageEditors.prototype.addEditor = function () {
        if (this.closestMatches.length == 0)
            return;
        var id = this.closestMatches[0].id;
        this.http.post('/admin/editors/add/' + this.closestMatches[0].id, '');
        this.editors.push(this.closestMatches[0]);
        this.userSearch = "";
        this.closestMatches = new Array();
    };
    ManageEditors.prototype.removeEditor = function (removedEditorId) {
        for (var i in this.editors) {
            if (this.editors[i].id === removedEditorId) {
                this.editors.splice(i, 1);
                break;
            }
        }
        this.http.post('/admin/editors/remove/' + removedEditorId.toString(), '');
    };
    ManageEditors = __decorate([
        core_1.Component({
            selector: 'ManageEditors',
            templateUrl: './dest/views/manageEditors/manageEditors.html',
            directives: [common_1.COMMON_DIRECTIVES, common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [services_1.HttpAdvanced])
    ], ManageEditors);
    return ManageEditors;
})();
exports.ManageEditors = ManageEditors;
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
//# sourceMappingURL=manageEditors.js.map