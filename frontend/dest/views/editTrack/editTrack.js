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
var common_1 = require('angular2/common');
var services_1 = require('../../services/services');
var EditTrack = (function () {
    function EditTrack(http, routeParams, fb) {
        this.id = new common_1.Control('', common_1.Validators.required);
        this.title = new common_1.Control('', common_1.Validators.required);
        this.duration = new common_1.Control('', common_1.Validators.required);
        this.artist = new common_1.Control('', common_1.Validators.required);
        this.year = new common_1.Control('', common_1.Validators.required);
        this.genre = new common_1.Control('', common_1.Validators.required);
        this.album = new common_1.Control('', common_1.Validators.required);
        this.file_format = new common_1.Control('', common_1.Validators.required);
        this.sample_rate = new common_1.Control('', common_1.Validators.required);
        this.bits_per_sample = new common_1.Control('', common_1.Validators.required);
        this.publisher = new common_1.Control('', common_1.Validators.required);
        this.carrier_type = new common_1.Control('', common_1.Validators.required);
        this.path = new common_1.Control('', common_1.Validators.required);
        this.editable = false;
        this.http = http;
        this.trackId = routeParams.get('trackId');
        this.trackForm = fb.group({
            id: this.id,
            title: this.title,
            duration: this.duration,
            artist: this.artist,
            year: this.year,
            genre: this.genre,
            album: this.album,
            file_format: this.file_format,
            sample_rate: this.sample_rate,
            bits_per_sample: this.bits_per_sample,
            publisher: this.publisher,
            carrier_type: this.carrier_type,
            path: this.path
        });
        this.resetForm();
    }
    EditTrack.prototype.resetForm = function () {
        var _this = this;
        this.http.get('/admin/tracks/' + this.trackId + '/get', function (res) {
            console.log(res);
            _this.track = new Track(res);
            for (var name_1 in res) {
                _this[name_1].updateValue(res[name_1]);
            }
        });
    };
    EditTrack.prototype.onSubmit = function (values) {
        var _this = this;
        this.http.postWithRes('/admin/tracks/' + this.trackId + '/edit', values, function (res) {
            console.log(res);
            _this.editable = false;
        });
    };
    EditTrack.prototype.toggleEditable = function () {
        this.resetForm();
        this.editable = !this.editable;
    };
    EditTrack = __decorate([
        core_1.Component({
            selector: 'AddTrack',
            templateUrl: './dest/views/editTrack/editTrack.html',
            directives: [common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [services_1.HttpAdvanced, router_1.RouteParams, common_1.FormBuilder])
    ], EditTrack);
    return EditTrack;
})();
exports.EditTrack = EditTrack;
var Track = (function () {
    function Track(values) {
        this.id = values.id;
        this.title = values.title;
        this.duration = values.duration;
        this.artist = values.artist;
        this.year = values.year;
        this.genre = values.genre;
        this.album = values.album;
        this.file_format = values.file_format;
        this.sample_rate = values.sample_rate;
        this.bits_per_sample = values.bits_per_sample;
        this.publisher = values.publisher;
        this.carrier_type = values.carrier_type;
        this.path = values.path;
    }
    return Track;
})();
//# sourceMappingURL=editTrack.js.map