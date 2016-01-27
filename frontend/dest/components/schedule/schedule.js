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
var Schedule = (function () {
    function Schedule(http) {
        this.items = [];
        this.http = http;
        this.getItems();
    }
    Schedule.prototype.getItems = function (self) {
        var _this = this;
        if (!self)
            self = this;
        self.http.get('/player/schedule', function (res) {
            console.log(res);
            self.items = [];
            for (var i in res) {
                self.items.push(new ScheduleItem(res[i].editor, res[i].time));
            }
        });
        var dt;
        dt = 60 - (new Date()).getMinutes();
        if (dt == 0)
            dt = 60;
        setTimeout(function () { return _this.getItems(_this); }, dt * 60 * 1000);
    };
    Schedule = __decorate([
        core_1.Component({
            selector: 'schedule',
            directives: [common_1.COMMON_DIRECTIVES],
            templateUrl: '/dest/components/schedule/schedule.html'
        }), 
        __metadata('design:paramtypes', [services_1.HttpAdvanced])
    ], Schedule);
    return Schedule;
})();
exports.Schedule = Schedule;
var ScheduleItem = (function () {
    function ScheduleItem(editor, time) {
        this.editor = editor;
        this.time = time;
    }
    return ScheduleItem;
})();
//# sourceMappingURL=schedule.js.map