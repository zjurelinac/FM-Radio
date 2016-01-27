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
var services_1 = require('./../../services/services');
var Track = (function () {
    function Track(id, title, artist, album, genre, year, play_duration, play_location, editor) {
        this.id = id;
        this.title = title;
        this.artist = artist;
        this.album = album;
        this.genre = genre;
        this.year = year;
        this.play_duration = play_duration;
        this.play_location = play_location;
        this.editor = editor;
    }
    return Track;
})();
var Player = (function () {
    function Player(http) {
        var _this = this;
        this.sourceUrl = '/player/get';
        this.audio = { currentTime: 0, duration: 100 };
        this.http = http;
        this.track = new Track(-1, 'Nepostojeći zapis', 'n/a', 'n/a', 'n/a', 0, 0, 0, 'n/a');
        setTimeout(function () {
            _this.audio = document.getElementById('audio-player');
            _this.playing = false;
            if (_this.audio) {
                _this.audio.src = _this.sourceUrl;
                _this.playing = false;
                _this.loadTrackData();
            }
        }, 1000);
    }
    Player.prototype.calcDelta = function () {
        var delta = (this.track.play_duration - this.track.play_location);
        if (delta == 0)
            delta = 100;
        return delta * 1000;
    };
    Player.prototype.play = function () {
        var _this = this;
        this.audio.load();
        this.audio.onloadedmetadata = function () {
            _this.http.getNoError('/player/location', function (res) {
                _this.track.play_location = res.play_location;
                _this.audio.currentTime = _this.track.play_location;
                _this.audio.play();
                _this.playing = true;
            });
        };
    };
    Player.prototype.pause = function () {
        this.playing = false;
        this.audio.pause();
        clearTimeout(this.timeout);
    };
    Player.prototype.volumeUp = function () {
        this.audio.volume = Math.min(this.audio.volume + 0.1, 1);
    };
    Player.prototype.volumeDown = function () {
        this.audio.volume = Math.max(this.audio.volume - 0.1, 0);
    };
    Player.prototype.loadTrackData = function () {
        var _this = this;
        this.http.getNoError('/player/info', function (res) {
            _this.track = new Track(res.id, res.title, res.artist, res.album, res.genre, res.year, res.play_duration, res.play_location, res.editor);
            _this.http.getNoError('/player/location', function (res) {
                _this.track.play_location = res.play_location;
            });
            setTimeout(function () { return _this.loadTrackData(); }, _this.calcDelta());
        });
    };
    Player = __decorate([
        core_1.Component({
            selector: 'player',
            templateUrl: './dest/components/player/player.html',
            directives: [common_1.NgIf]
        }), 
        __metadata('design:paramtypes', [services_1.HttpAdvanced])
    ], Player);
    return Player;
})();
exports.Player = Player;
//# sourceMappingURL=player.js.map