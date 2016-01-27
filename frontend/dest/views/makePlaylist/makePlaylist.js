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
var router_1 = require('angular2/router');
var services_1 = require('../../services/services');
var MakePlaylist = (function () {
    function MakePlaylist(http, routeParams, msgService) {
        var _this = this;
        this.editable = false;
        this.playlist = new Array();
        this.wishes = [];
        this.searchResults = new Array();
        this.barPercentage = 0;
        this.minutesSpent = '00';
        this.secondsSpent = '00';
        this.matching = false;
        this.http = http;
        this.msgService = msgService;
        this.slotId = routeParams.get('slotId');
        this.http.get('/editor/slots/' + this.slotId + '/get_list', function (res) {
            _this.playlist = new Array();
            for (var i in res) {
                _this.playlist.push(new Track(res[i]));
            }
            _this.updateBar();
        });
        this.http.get('/tracks/wishlist', function (res) {
            var end = Math.min(res.length, 10);
            for (var i = 0; i < end; ++i)
                _this.wishes.push(new Track(res[i]));
        });
    }
    MakePlaylist.prototype.toggleEditable = function () {
        this.editable = !this.editable;
    };
    MakePlaylist.prototype.resetPlaylist = function () {
        this.toggleEditable();
        this.updateBar();
    };
    MakePlaylist.prototype.enterCheck = function (event) {
        var keyCode = event.keyCode;
        if (keyCode == 13 && this.searchResults.length > 0) {
            this.addTrackToPlaylist(this.searchResults[0]);
            this.searchResults = new Array();
            this.trackSearch = "";
        }
        else if (keyCode >= 65 && keyCode <= 90 || keyCode >= 97 && keyCode <= 122 || keyCode == 8)
            this.onKeyPressed(keyCode);
    };
    MakePlaylist.prototype.removeTrack = function (track) {
        for (var i in this.playlist) {
            if (this.playlist[i] == track) {
                this.playlist.splice(i, 1);
            }
        }
        this.updateBar();
    };
    MakePlaylist.prototype.getTotalTime = function () {
        var totalTime = 0;
        for (var i in this.playlist)
            totalTime += this.playlist[i].duration;
        return totalTime;
    };
    MakePlaylist.prototype.updateBar = function () {
        console.log(this.playlist);
        var durationSum = this.getTotalTime();
        this.barPercentage = durationSum / 60 / 60 * 100;
        var tminutesSpent = ~~(durationSum / 60);
        var tsecondsSpent = durationSum % 60;
        this.minutesSpent = (tminutesSpent < 10 ? '0' : '') + tminutesSpent;
        this.secondsSpent = (tsecondsSpent < 10 ? '0' : '') + tsecondsSpent;
    };
    MakePlaylist.prototype.addTrackToPlaylist = function (track) {
        var totalTime = this.getTotalTime();
        if (totalTime > 60 * 60) {
            this.msgService.setMessage('Nije moguće dodati novi zapis - već je prekoračeno dozvoljeno vrijeme trajanja liste za reprodukciju.', 'error');
            this.trackSearch = '';
            this.searchResults = [];
            return;
        }
        var delta = 60 * 60 - totalTime - track.duration;
        if (delta > 0 && delta < 15) {
            this.msgService.setMessage('Dodani zapis reproducirao bi se kraće od 15 sekundi, stoga ga nije moguće dodati.', 'error');
            this.trackSearch = '';
            this.searchResults = [];
            return;
        }
        if (delta < 0)
            track.duration = 60 * 60 - totalTime;
        track.calculateMS();
        this.playlist.push(track);
        this.trackSearch = "";
        this.searchResults = new Array();
        this.updateBar();
    };
    MakePlaylist.prototype.onKeyPressed = function (charCode) {
        var _this = this;
        var query = "";
        if (charCode == 8)
            query = this.trackSearch.slice(0, this.trackSearch.length - 1);
        else
            query = this.trackSearch ? (this.trackSearch + String.fromCharCode(charCode)) : String.fromCharCode(charCode);
        if (query && query.length >= 3) {
            this.http.getNoError('/tracks/search/' + query, function (res) {
                _this.searchResults = new Array();
                for (var i in res) {
                    _this.searchResults.push(new Track(res[i]));
                }
            });
        }
        else {
            this.searchResults = new Array();
        }
    };
    MakePlaylist.prototype.submitPlaylist = function () {
        this.editable = false;
        if (this.getTotalTime() < 60 * 60) {
            this.msgService.setMessage('Lista za reprodukciju nije dovoljno duga - treba trajati točno 1 sat.', 'error');
            return;
        }
        var track_list = new Array();
        for (var track in this.playlist) {
            track_list.push([track, this.playlist[track].id, this.playlist[track].duration]);
        }
        var track_list2 = JSON.stringify(track_list);
        this.http.postPure('/editor/slots/' + this.slotId + '/set_list', track_list2);
    };
    MakePlaylist = __decorate([
        core_1.Component({
            selector: 'MakePlaylist',
            templateUrl: './dest/views/makePlaylist/makePlaylist.html',
            directives: [common_1.COMMON_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [services_1.HttpAdvanced, router_1.RouteParams, services_1.MsgService])
    ], MakePlaylist);
    return MakePlaylist;
})();
exports.MakePlaylist = MakePlaylist;
var Track = (function () {
    function Track(values) {
        this.title = values.title;
        this.artist = values.artist;
        this.album = values.album;
        this.index = values.index;
        this.id = values.id;
        this.duration = values.duration;
        this.calculateMS();
    }
    Track.prototype.calculateMS = function () {
        var tminutes = ~~(this.duration / 60);
        var tseconds = this.duration % 60;
        this.minutes = (tminutes < 10 ? '0' : '') + tminutes;
        this.seconds = (tseconds < 10 ? '0' : '') + tseconds;
    };
    Track.prototype.copy = function () {
        return new Track(this);
    };
    return Track;
})();
//# sourceMappingURL=makePlaylist.js.map