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
var ManageTracks = (function () {
    function ManageTracks(router, http) {
        var _this = this;
        this.editable = false;
        this.http = http;
        this.router = router;
        this.http.get('/tracks/list', function (res) {
            console.log(res);
            _this.tracks = new Array();
            for (var i in res) {
                _this.tracks.push(new Track(res[i]));
            }
        });
    }
    ManageTracks.prototype.toggleEditable = function () {
        this.editable = !this.editable;
    };
    ManageTracks.prototype.editTrack = function (track) {
        this.router.navigate(['EditTrack', { trackId: track.id }]);
    };
    ManageTracks.prototype.deleteTrack = function (track) {
        for (var i in this.tracks) {
            if (this.tracks[i].id == track.id) {
                this.tracks.splice(i, 1);
                break;
            }
        }
        this.http.postWithBothMsg('admin/tracks/' + track.id + '/delete', '');
    };
    ManageTracks = __decorate([
        core_1.Component({
            selector: 'ManageTracks',
            templateUrl: './dest/views/manageTracks/manageTracks.html',
            directives: [common_1.NgFor, router_1.RouterLink]
        }), 
        __metadata('design:paramtypes', [router_1.Router, services_1.HttpAdvanced])
    ], ManageTracks);
    return ManageTracks;
})();
exports.ManageTracks = ManageTracks;
var Track = (function () {
    function Track(values) {
        this.id = values.id;
        this.title = values.title;
        this.duration = values.duration;
        this.artist = values.artist;
        this.year = values.year;
        this.genre = values.genre;
    }
    return Track;
})();
//# sourceMappingURL=manageTracks.js.map