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
var GlobalWishlist = (function () {
    function GlobalWishlist(http) {
        var _this = this;
        this.wishes = [];
        this.http = http;
        this.http.getNoError('/stats/tracks/wishlist', function (data) {
            var end = Math.min(10, data.length);
            for (var i = 0; i < end; ++i)
                _this.wishes.push(new Wish(data[i]));
        });
    }
    GlobalWishlist = __decorate([
        core_1.Component({
            selector: 'global-wishlist',
            templateUrl: './dest/components/stats/globalWishlist/globalWishlist.html',
            directives: [common_1.COMMON_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [services_1.HttpAdvanced])
    ], GlobalWishlist);
    return GlobalWishlist;
})();
exports.GlobalWishlist = GlobalWishlist;
var Wish = (function () {
    function Wish(values) {
        this.title = values.title;
        this.artist = values.artist;
        this.count = values.count;
    }
    return Wish;
})();
//# sourceMappingURL=globalWishlist.js.map