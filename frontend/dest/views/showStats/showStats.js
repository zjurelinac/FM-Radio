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
var authService_1 = require('../../services/authService');
var usersCount_1 = require('../../components/stats/usersCount/usersCount');
var adminsList_1 = require('../../components/stats/adminsList/adminsList');
var globalWishlist_1 = require('../../components/stats/globalWishlist/globalWishlist');
var popularTrack_1 = require('../../components/stats/popularTrack/popularTrack');
var ShowStats = (function () {
    function ShowStats(authService) {
        this.authService = authService;
    }
    ShowStats = __decorate([
        core_1.Component({
            selector: 'ShowStats',
            templateUrl: './dest/views/showStats/showStats.html',
            directives: [common_1.COMMON_DIRECTIVES, usersCount_1.UsersCount, adminsList_1.AdminsList, globalWishlist_1.GlobalWishlist, popularTrack_1.PopularTrack]
        }), 
        __metadata('design:paramtypes', [authService_1.AuthService])
    ], ShowStats);
    return ShowStats;
})();
exports.ShowStats = ShowStats;
//# sourceMappingURL=showStats.js.map