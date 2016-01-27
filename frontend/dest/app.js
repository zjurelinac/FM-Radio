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
var headerBar_1 = require('./components/headerBar/headerBar');
var messages_1 = require('./components/messages/messages');
var index_1 = require('./views/index/index');
var settings_1 = require('./settings');
var App = (function () {
    function App(router, location) {
        this.router = router;
    }
    ;
    App = __decorate([
        core_1.Component({
            selector: 'App',
            templateUrl: './dest/app.html',
            styles: [],
            directives: [router_1.ROUTER_DIRECTIVES, common_1.COMMON_DIRECTIVES, headerBar_1.HeaderBar, messages_1.Messages]
        }),
        router_1.RouteConfig([
            { path: '/', name: 'Index', component: index_1.Index, useAsDefault: true },
            { path: '/settings/...', name: 'Settings', component: settings_1.Settings }
        ]), 
        __metadata('design:paramtypes', [router_1.Router, router_1.Location])
    ], App);
    return App;
})();
exports.App = App;
//# sourceMappingURL=app.js.map