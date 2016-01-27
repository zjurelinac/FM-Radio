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
var SELF = null;
var AddTrack = (function () {
    function AddTrack(http, fb) {
        this.uploadUrl = "/admin/tracks/upload";
        this.uploader = new services_1.FileUploader({ url: this.uploadUrl });
        this.http = http;
        SELF = this;
        var controlNames = ['title', 'artist', 'album', 'genre', 'publisher',
            'carrier_type', 'bits_per_sample', 'sample_rate', 'file_format',
            'duration', 'year'];
        this.trackForm = fb.create(controlNames, '');
        this.uploader.onSuccessItem = function success(item, response, status, headers) {
            var res = JSON.parse(response);
            var data = SELF.trackForm.group.value;
            data.path = res.data.path;
            console.log(res);
            SELF.http.post('/admin/tracks/add', data);
            console.log(SELF.trackForm.group.value);
        };
    }
    AddTrack.prototype.onSubmit = function () {
        this.uploader.uploadAll();
    };
    AddTrack = __decorate([
        core_1.Component({
            selector: 'AddTrack',
            templateUrl: './dest/views/addTrack/addTrack.html',
            directives: [services_1.FILE_UPLOAD_DIRECTIVES, common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [services_1.HttpAdvanced, services_1.FormBuilderAdvanced])
    ], AddTrack);
    return AddTrack;
})();
exports.AddTrack = AddTrack;
//# sourceMappingURL=addTrack.js.map