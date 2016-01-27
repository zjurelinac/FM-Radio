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
var router_1 = require('angular2/router');
var common_1 = require('angular2/common');
var services_1 = require('../../services/services');
var EditorSlots = (function () {
    function EditorSlots(http, fb, router) {
        this.days = ["Pon", "Uto", "Sri", "Čet", "Pet", "Sub", "Ned"];
        this.hours = new Array();
        this.daysNum = [0, 1, 2, 3, 4, 5, 6];
        this.changing = false;
        this.today = new Date();
        this.mondayString = "";
        this.sundayString = "";
        this.http = http;
        this.fb = fb;
        this.router = router;
        this.requestForm = fb.group({
            'time': new common_1.Control('', common_1.Validators.required),
            'day0': new common_1.Control(),
            'day1': new common_1.Control(),
            'day2': new common_1.Control(),
            'day3': new common_1.Control(),
            'day4': new common_1.Control(),
            'day5': new common_1.Control(),
            'day6': new common_1.Control(),
            'start_date': new common_1.Control('', common_1.Validators.required),
            'end_date': new common_1.Control('', common_1.Validators.required)
        });
        for (var i = 0; i <= 23; ++i) {
            this.hours.push(i);
        }
        var secSinceMonday = this.today.getMilliseconds() + 1000 * (this.today.getSeconds() + 60 * (this.today.getMinutes() + 60 * (this.today.getHours() + 24 * ((this.today.getDay() + 6) % 7))));
        this.mondayDay = new Date(this.today.getTime() - secSinceMonday);
        console.log(this.mondayDay);
        this.initCalendar();
        this.loadData();
    }
    EditorSlots.prototype.slotClicked = function (day, hour) {
        console.log(day + ' ' + hour);
        if (this.calendarFields[day][hour] > 0)
            this.router.navigate(['MakePlaylist', { 'slotId': this.calendarFields[day][hour] }]);
    };
    EditorSlots.prototype.requestSlot = function (values) {
        var _this = this;
        var days_bit_mask = '' + (values.day0 ? 1 : 0) + (values.day1 ? 1 : 0) + (values.day2 ? 1 : 0) + (values.day3 ? 1 : 0) + (values.day4 ? 1 : 0) + (values.day5 ? 1 : 0) + (values.day6 ? 1 : 0);
        var start_date = new Date(values.start_date);
        var start_date2 = start_date.getFullYear() + '-' + (start_date.getMonth() + 1) + '-' + start_date.getDate();
        var end_date = new Date(values.end_date);
        var end_date2 = end_date.getFullYear() + '-' + (end_date.getMonth() + 1) + '-' + end_date.getDate();
        var requestObj = {
            'time': values.time,
            'days_bit_mask': days_bit_mask,
            'start_date': start_date2,
            'end_date': end_date2
        };
        this.http.postWithBothMsg('/editor/slots/request', requestObj, function (res) { return _this.loadData(); });
    };
    EditorSlots.prototype.initCalendar = function () {
        this.calendarFields = new Array();
        for (var day in this.daysNum) {
            this.calendarFields[this.daysNum[day]] = new Array();
            for (var hour in this.hours) {
                this.calendarFields[this.daysNum[day]][this.hours[hour]] = 0;
            }
        }
    };
    EditorSlots.prototype.updateCalendar = function () {
        this.initCalendar();
        var nextMonday = new Date(this.mondayDay.getTime() + 7 * 24 * 60 * 60 * 1000);
        for (var i in this.slots) {
            var slot = this.slots[i];
            var slotTime = slot.time.getTime();
            if (slotTime >= this.mondayDay.getTime() && slotTime <= nextMonday.getTime()) {
                var dayOfWeek = ~~(((slotTime - this.mondayDay.getTime()) / 1000 / 60 / 60 / 24) % 7);
                var hourOfDay = (slotTime / 1000 / 60 / 60) % 24;
                this.calendarFields[dayOfWeek][hourOfDay] = this.slots[i].id;
            }
        }
        for (var i in this.requests) {
            var req = this.requests[i];
            var reqDate = new Date(req).getTime();
            if (reqDate >= this.mondayDay.getTime() && reqDate <= nextMonday.getTime()) {
                var dayOfWeek = ~~(((reqDate - this.mondayDay.getTime()) / 1000 / 60 / 60 / 24) % 7);
                var hourOfDay = (reqDate / 1000 / 60 / 60) % 24;
                this.calendarFields[dayOfWeek][hourOfDay] = -i - 1;
            }
        }
        var sunday = new Date(this.mondayDay.getTime() + 1000 * 60 * 60 * 24 * 6);
        var pad = services_1.numberTo2digits;
        this.mondayString = pad(this.mondayDay.getDate()) + '.' + pad(this.mondayDay.getMonth() + 1) + '.';
        this.sundayString = pad(sunday.getDate()) + '.' + pad(sunday.getMonth() + 1) + '.';
    };
    EditorSlots.prototype.loadData = function () {
        var _this = this;
        this.http.getNoError('/editor/slots/list', function (res) {
            _this.slots = new Array();
            _this.requests = new Array();
            for (var i in res.slots) {
                _this.slots.push(new Slot(res.slots[i]));
            }
            for (var i in res.requests) {
                for (var j in res.requests[i].times) {
                    _this.requests.push(res.requests[i].times[j]);
                }
            }
            _this.updateCalendar();
        });
    };
    EditorSlots.prototype.prevWeek = function () {
        this.mondayDay = new Date(this.mondayDay.getTime() - (1000 * 60 * 60 * 24 * 7));
        this.updateCalendar();
    };
    EditorSlots.prototype.nextWeek = function () {
        this.mondayDay = new Date(this.mondayDay.getTime() + (1000 * 60 * 60 * 24 * 7));
        this.updateCalendar();
    };
    EditorSlots.prototype.toggleState = function () { this.changing = !this.changing; };
    EditorSlots.prototype.isRequest = function (day, hour) { return this.calendarFields[day][hour] < 0; };
    ;
    EditorSlots.prototype.getCount = function (day, hour) {
        var id = this.calendarFields[day][hour];
        if (id < 0)
            return -1;
        for (var i in this.slots)
            if (id == this.slots[i].id)
                return this.slots[i].count;
        return -1;
    };
    EditorSlots = __decorate([
        core_1.Component({
            selector: 'EditorSlots',
            templateUrl: './dest/views/editorSlots/editorSlots.html',
            directives: []
        }), 
        __metadata('design:paramtypes', [services_1.HttpAdvanced, common_1.FormBuilder, router_1.Router])
    ], EditorSlots);
    return EditorSlots;
})();
exports.EditorSlots = EditorSlots;
var Slot = (function () {
    function Slot(value) {
        this.id = value.id;
        this.time = new Date(value.time);
        this.count = value.count;
    }
    return Slot;
})();
//# sourceMappingURL=editorSlots.js.map