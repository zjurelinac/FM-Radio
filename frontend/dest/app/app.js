var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("angular2/core");
var common_1 = require("angular2/common");
var router_1 = require('angular2/router');
var headerBar_1 = require('../app/headerBar');
var navBar_1 = require('../app/navBar');
var index_1 = require('../index/index');
var accountData_1 = require('../settings/accountData/accountData');
var accountDelete_1 = require('../settings/accountDelete/accountDelete');
var accountPassword_1 = require('../settings/accountPassword/accountPassword');
var makePlaylist_1 = require('../settings/makePlaylist/makePlaylist');
var makeWishlist_1 = require('../settings/makeWishlist/makeWishlist');
var manageAdmins_1 = require('../settings/manageAdmins/manageAdmins');
var manageEditors_1 = require('../settings/manageEditors/manageEditors');
var manageRequests_1 = require('../settings/manageRequests/manageRequests');
var manageRadiostation_1 = require('../settings/manageRadiostation/manageRadiostation');
var manageTracks_1 = require('../settings/manageTracks/manageTracks');
var manageUsers_1 = require('../settings/manageUsers/manageUsers');
var App = (function () {
    function App(router) {
        this.router = router;
    }
    ;
    App = __decorate([
        core_1.Component({
            selector: 'App',
            templateUrl: './dest/app/app.html',
            styles: [],
            directives: [router_1.ROUTER_DIRECTIVES, common_1.COMMON_DIRECTIVES, headerBar_1.HeaderBar, navBar_1.NavBar]
        }),
        router_1.RouteConfig([
            { 'path': '/', 'name': 'Index', 'component': index_1.Index },
            { 'path': '/settings/account_data', 'name': 'AccountData', 'component': accountData_1.AccountData },
            { 'path': '/settings/account_password', 'name': 'AccountPassword', 'component': accountPassword_1.AccountPassword },
            { 'path': '/settings/account_delete', 'name': 'AccountDelete', 'component': accountDelete_1.AccountDelete },
            { 'path': '/settings/wishlist', 'name': 'MakeWishlist', 'component': makeWishlist_1.MakeWishlist },
            { 'path': '/settings/playlist', 'name': 'MakePlaylist', 'component': makePlaylist_1.MakePlaylist },
            { 'path': '/settings/tracks', 'name': 'ManageTracks', 'component': manageTracks_1.ManageTracks },
            { 'path': '/settings/editors', 'name': 'ManageEditors', 'component': manageEditors_1.ManageEditors },
            { 'path': '/settings/requests', 'name': 'ManageRequests', 'component': manageRequests_1.ManageRequests },
            { 'path': '/settings/users', 'name': 'ManageUsers', 'component': manageUsers_1.ManageUsers },
            { 'path': '/settings/admins', 'name': 'ManageAdmins', 'component': manageAdmins_1.ManageAdmins },
            { 'path': '/settings/station', 'name': 'ManageRadiostation', 'component': manageRadiostation_1.ManageRadiostation }
        ]), 
        __metadata('design:paramtypes', [router_1.Router])
    ], App);
    return App;
})();
exports.App = App;
//# sourceMappingURL=app.js.map