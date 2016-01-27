var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var common_1 = require('angular2/common');
var core_1 = require('angular2/core');
var services_1 = require('./services');
var Form = (function () {
    function Form(fb, http, controlNames, submissionUrl, getter) {
        var _this = this;
        this.http = http;
        this.submissionUrl = submissionUrl;
        var groupObj = {};
        for (var i in controlNames) {
            var control = new common_1.Control('', common_1.Validators.required);
            groupObj[controlNames[i]] = control;
        }
        this.group = fb.group(groupObj);
        this.controls = groupObj;
        if (getter) {
            if (typeof getter === "string") {
                this.http.get(getter, function (data) {
                    console.log(data);
                    for (var name_1 in data) {
                        _this.controls[name_1].updateValue(data[name_1]);
                    }
                });
            }
            else {
                for (var name_2 in getter) {
                    this.controls[name_2].updateValue(getter[name_2]);
                }
            }
        }
    }
    Form.prototype.onSubmit = function (values) {
        this.http.post(this.submissionUrl, values);
    };
    return Form;
})();
exports.Form = Form;
var FormBuilderAdvanced = (function () {
    function FormBuilderAdvanced(fb, http) {
        this.fb = fb;
        this.http = http;
    }
    FormBuilderAdvanced.prototype.create = function (controlNames, submissionUrl, getter) {
        return new Form(this.fb, this.http, controlNames, submissionUrl, getter);
    };
    FormBuilderAdvanced = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [common_1.FormBuilder, services_1.HttpAdvanced])
    ], FormBuilderAdvanced);
    return FormBuilderAdvanced;
})();
exports.FormBuilderAdvanced = FormBuilderAdvanced;
//# sourceMappingURL=form.js.map