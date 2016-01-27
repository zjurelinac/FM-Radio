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
var utilities_1 = require('../../utilities');
var ManageRadiostation = (function () {
    function ManageRadiostation(fb, http) {
        var radioFormNames = ['name', 'description', 'oib', 'address', 'email', 'frequency'];
        var submitUrl = '/owner/station/modify';
        var getUrl = '/station/get';
        this.radioForm = new utilities_1.Form(fb, http, radioFormNames, submitUrl, getUrl);
        this.isFormDisabled = true;
    }
    ManageRadiostation = __decorate([
        core_1.Component({
            selector: 'ManageRadiostation',
            templateUrl: './dest/settings/manageRadiostation/manageRadiostation.html',
            directives: [common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder, http_1.Http])
    ], ManageRadiostation);
    return ManageRadiostation;
})();
exports.ManageRadiostation = ManageRadiostation;
//# sourceMappingURL=manageRadiostation.js.map