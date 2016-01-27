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
var ManageRequests = (function () {
    function ManageRequests(http) {
        this.requests = new Array();
        this.http = http;
        this.resetList();
    }
    ManageRequests.prototype.resetList = function () {
        var _this = this;
        this.http.get('/admin/requests/list', function (res) {
            _this.requests = new Array();
            for (var i in res) {
                _this.requests.push(new Request(res[i]));
            }
        });
    };
    ManageRequests.prototype.approveSlot = function (slotId) {
        var _this = this;
        this.http.postWithBothMsg('/admin/requests/' + slotId + '/allow', '', function (res) {
            _this.resetList();
        });
    };
    ManageRequests.prototype.rejectSlot = function (slotId) {
        var _this = this;
        this.http.postWithBothMsg('/admin/requests/' + slotId + '/deny', '', function (res) {
            _this.resetList();
        });
    };
    ManageRequests.prototype.deconstructBitmask = function (bm) {
        var days = ['Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub', 'Ned'];
        var present = [];
        for (var i = 0; i < 7; ++i)
            if (bm & (1 << i))
                present.push(days[i]);
        return present.join(', ');
    };
    ManageRequests = __decorate([
        core_1.Component({
            selector: 'ManageRequests',
            templateUrl: './dest/views/manageRequests/manageRequests.html',
            directives: [common_1.NgFor, common_1.NgIf]
        }), 
        __metadata('design:paramtypes', [services_1.HttpAdvanced])
    ], ManageRequests);
    return ManageRequests;
})();
exports.ManageRequests = ManageRequests;
var Request = (function () {
    function Request(values) {
        this.id = values.id;
        this.time = values.time;
        this.days_bit_mask = values.days_bit_mask;
        this.start_date = values.start_date;
        this.end_date = values.end_date;
        this.editor = new Editor(values.editor);
        this.collisions = values.collisions;
    }
    return Request;
})();
var Editor = (function () {
    function Editor(values) {
        this.id = values.id;
        this.first_name = values.first_name;
        this.last_name = values.last_name;
    }
    return Editor;
})();
//# sourceMappingURL=manageRequests.js.map