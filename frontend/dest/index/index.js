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
var http_1 = require('angular2/http');
var utilities_1 = require('../utilities');
var Index = (function () {
    function Index(fb, http) {
        var formNames = ['first_name', 'last_name', 'email', 'password', 'password2', 'year_of_birth', 'occupation'];
        this.registerForm = new utilities_1.Form(fb, http, formNames, '/user/auth/register');
    }
    Index = __decorate([
        core_1.Component({
            selector: 'Index'
        }),
        core_1.View({
            templateUrl: './dest/index/index.html'
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder, http_1.Http])
    ], Index);
    return Index;
})();
exports.Index = Index;
//# sourceMappingURL=index.js.map