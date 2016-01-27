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
var services_1 = require('../../../services/services');
var PopularTrack = (function () {
    function PopularTrack(http, authService) {
        var _this = this;
        this.count = -1;
        this.http = http;
        this.track = new Track({ title: '', artist: '', album: '', genre: '', year: 0 });
        if (authService.isAdmin())
            this.http.getNoError('/stats/tracks/most_wanted', function (res) { return _this.track = new Track(res); });
    }
    PopularTrack.prototype.onSubmit = function () {
        var _this = this;
        this.http.getNoError('/stats/tracks/most_wanted/wish_count/' + this.start_date + '/' + this.end_date, function (res) { return _this.count = res.count; });
    };
    PopularTrack = __decorate([
        core_1.Component({
            selector: 'popular-track',
            templateUrl: './dest/components/stats/popularTrack/popularTrack.html',
            directives: [common_1.COMMON_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [services_1.HttpAdvanced, services_1.AuthService])
    ], PopularTrack);
    return PopularTrack;
})();
exports.PopularTrack = PopularTrack;
var Track = (function () {
    function Track(values) {
        this.title = values.title;
        this.artist = values.artist;
        this.album = values.album;
        this.genre = values.genre;
        this.year = values.year;
    }
    return Track;
})();
//# sourceMappingURL=popularTrack.js.map