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
var Popular = (function () {
    function Popular(http) {
        var _this = this;
        this.tracks = [];
        this.http = http;
        this.http.get('/tracks/popular', function (res) {
            var max_popularity;
            max_popularity = 0;
            for (var i in res)
                max_popularity = Math.max(max_popularity, res[i].popularity);
            for (var i in res)
                _this.tracks.push({ 'title': res[i].title, 'artist': res[i].artist, 'popularity': Math.round(res[i].popularity / max_popularity * 20) });
        });
    }
    Popular = __decorate([
        core_1.Component({
            selector: 'popular',
            directives: [common_1.COMMON_DIRECTIVES],
            templateUrl: '/dest/components/popular/popular.html'
        }), 
        __metadata('design:paramtypes', [services_1.HttpAdvanced])
    ], Popular);
    return Popular;
})();
exports.Popular = Popular;
//# sourceMappingURL=popular.js.map