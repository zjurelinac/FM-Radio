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
var ManageRadiostation = (function () {
    function ManageRadiostation(fb, http, authService) {
        this.name = new common_1.Control('', common_1.Validators.required);
        this.description = new common_1.Control('', common_1.Validators.required);
        this.oib = new common_1.Control('', common_1.Validators.required);
        this.address = new common_1.Control('', common_1.Validators.required);
        this.email = new common_1.Control('', common_1.Validators.required);
        this.frequency = new common_1.Control('', common_1.Validators.required);
        this.isOwner = false;
        this.http = http;
        this.isOwner = authService.isOwner();
        this.myForm = fb.group({
            'name': this.name,
            'description': this.description,
            'oib': this.oib,
            'address': this.address,
            'email': this.email,
            'frequency': this.frequency
        });
        this.resetRadiostation();
    }
    ManageRadiostation.prototype.onSubmit = function (value) {
        console.log(value);
        this.http.postWithBothMsg('/owner/station/modify', value);
    };
    ManageRadiostation.prototype.toggleEditing = function () {
        if (this.isOwner)
            this.isFormDisabled = !this.isFormDisabled;
    };
    ManageRadiostation.prototype.resetRadiostation = function () {
        var _this = this;
        this.isFormDisabled = true;
        this.http.get('/station/get', function (response) {
            var stationObj = response;
            console.log(stationObj);
            for (var name_1 in stationObj) {
                _this[name_1].updateValue(stationObj[name_1]);
            }
        });
    };
    ManageRadiostation = __decorate([
        core_1.Component({
            selector: 'ManageRadiostation',
            templateUrl: './dest/views/manageRadiostation/manageRadiostation.html',
            directives: [common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder, services_1.HttpAdvanced, services_1.AuthService])
    ], ManageRadiostation);
    return ManageRadiostation;
})();
exports.ManageRadiostation = ManageRadiostation;
//# sourceMappingURL=manageRadiostation.js.map