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
var MakeWishlist = (function () {
    function MakeWishlist(http, router, msgService) {
        this.tracks = [];
        this.searchResults = new Array();
        this.editable = false;
        this.matching = false;
        this.can_confirm = false;
        this.http = http;
        this.router = router;
        this.msgService = msgService;
        this.loadData();
    }
    MakeWishlist.prototype.loadData = function () {
        var _this = this;
        this.http.get('/user/wishlist/get', function (res) {
            _this.tracks = [];
            for (var i in res)
                _this.tracks.push(new Track(res[i]));
        });
        this.http.get('/user/wishlist/can_confirm', function (res) {
            _this.can_confirm = res.can_confirm;
        });
    };
    MakeWishlist.prototype.toggleEditable = function () { this.editable = !this.editable; };
    MakeWishlist.prototype.addToWishlist = function (track) {
        if (this.tracks.length > 9) {
            this.msgService.setMessage('Na listi želja je već deset zapisa, nije moguće dodati još jedan.', 'error');
            return;
        }
        for (var i in this.tracks)
            if (this.tracks[i].id == track.id) {
                this.msgService.setMessage('Taj je zapis već na listi želja.', 'error');
                return;
            }
        this.tracks.push(track);
        this.trackSearch = '';
        this.searchResults = [];
    };
    MakeWishlist.prototype.onKeyPressed = function (charCode) {
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
    MakeWishlist.prototype.enterCheck = function (event) {
        var keyCode = event.keyCode;
        if (keyCode == 13 && this.searchResults.length > 0) {
            this.addToWishlist(this.searchResults[0]);
            this.searchResults = new Array();
            this.trackSearch = "";
        }
        else if (keyCode >= 65 && keyCode <= 90 || keyCode >= 97 && keyCode <= 122 || keyCode == 8)
            this.onKeyPressed(keyCode);
    };
    MakeWishlist.prototype.removeFromWishlist = function (track) {
        for (var i in this.tracks)
            if (this.tracks[i] == track)
                this.tracks.splice(i, 1);
    };
    MakeWishlist.prototype.saveWishlist = function () {
        var _this = this;
        var ids = [];
        for (var i in this.tracks)
            ids.push(this.tracks[i].id);
        var json_ids = JSON.stringify(ids);
        console.log(json_ids);
        this.http.postPure('/user/wishlist/set', json_ids, function (res) {
            _this.editable = false;
        });
    };
    MakeWishlist.prototype.confirmWishlist = function () {
        var _this = this;
        this.http.postWithRes('/user/wishlist/confirm', '', function (res) {
            _this.msgService.setMessage('Lista želja uspješno potvrđena', 'success');
            _this.loadData();
        });
    };
    MakeWishlist = __decorate([
        core_1.Component({
            selector: 'MakeWishlist',
            templateUrl: './dest/views/makeWishlist/makeWishlist.html',
            directives: [common_1.COMMON_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [services_1.HttpAdvanced, router_1.Router, services_1.MsgService])
    ], MakeWishlist);
    return MakeWishlist;
})();
exports.MakeWishlist = MakeWishlist;
var Track = (function () {
    function Track(values) {
        this.title = values.title;
        this.artist = values.artist;
        this.album = values.album;
        this.index = values.index;
        this.id = values.id;
        this.duration = values.duration;
    }
    return Track;
})();
//# sourceMappingURL=makeWishlist.js.map