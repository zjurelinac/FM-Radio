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
var services_1 = require('../../services/services');
var Station = (function () {
    function Station(http) {
        var _this = this;
        this.http = http;
        this.http.get('/station/get', function (res) {
            _this.name = res.name;
            _this.oib = res.oib;
            _this.address = res.address;
            _this.email = res.email;
            _this.frequency = res.frequency;
        });
    }
    Station = __decorate([
        core_1.Component({
            selector: 'station',
            templateUrl: '/dest/components/station/station.html'
        }), 
        __metadata('design:paramtypes', [services_1.HttpAdvanced])
    ], Station);
    return Station;
})();
exports.Station = Station;
;
//# sourceMappingURL=station.js.map