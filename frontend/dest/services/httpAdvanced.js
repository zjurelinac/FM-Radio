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
var http_1 = require('angular2/http');
var services_1 = require('./services');
var INFO = "info";
var SUCCESS = "success";
var ERROR = "error";
var SELF = null;
var HttpAdvanced = (function () {
    function HttpAdvanced(msgService, http) {
        this.msgService = msgService;
        this.http = http;
        SELF = this;
    }
    HttpAdvanced.prototype.get = function (url, callback) {
        var _this = this;
        return this.http.get(url).subscribe(function (res) {
            var msg = _this.extractMsg(res);
            callback(msg);
        }, this.httpErrorHandler);
    };
    HttpAdvanced.prototype.getNoError = function (url, callback) {
        var _this = this;
        return this.http.get(url).subscribe(function (res) {
            var msg = _this.extractMsg(res);
            callback(msg);
        }, function (err) {
            console.log("err:");
            var msg = _this.extractMsg(err);
            console.log(msg);
        });
    };
    HttpAdvanced.prototype.post = function (url, data) {
        var _this = this;
        return this.http.post(url, services_1.urlEncode(data)).subscribe(function (res) {
            var msg = _this.extractMsg(res);
            _this.msgService.setMessage(msg, SUCCESS);
        }, this.httpErrorHandler);
    };
    HttpAdvanced.prototype.postWithRes = function (url, data, callback) {
        var _this = this;
        return this.http.post(url, services_1.urlEncode(data)).subscribe(function (res) {
            var msg = _this.extractMsg(res);
            if (callback)
                callback(msg);
        }, this.httpErrorHandler);
    };
    HttpAdvanced.prototype.postWithBothMsg = function (url, data, callback) {
        var _this = this;
        return this.http.post(url, services_1.urlEncode(data)).subscribe(function (res) {
            var msg = _this.extractMsg(res);
            _this.msgService.setMessage(msg, SUCCESS);
            if (callback)
                callback(msg);
        }, this.httpErrorHandler);
    };
    HttpAdvanced.prototype.postPure = function (url, data, callback) {
        var _this = this;
        return this.http.post(url, data).subscribe(function (res) {
            var msg = _this.extractMsg(res);
            _this.msgService.setMessage(msg, SUCCESS);
            if (callback)
                callback(res);
        }, this.httpErrorHandler);
    };
    HttpAdvanced.prototype.extractMsg = function (msg) {
        var msg2 = msg.json ? (msg.json().error_message || msg.json().success_message || msg.json().data || msg.json()) : msg;
        return msg2;
    };
    HttpAdvanced.prototype.httpErrorHandler = function (err) {
        var msg = SELF.extractMsg(err);
        SELF.msgService.setMessage(msg, ERROR);
        return msg;
    };
    HttpAdvanced.prototype.httpSuccessHandler = function (success) {
        var msg = SELF.extractMsg(success);
        SELF.msgService.setMessage(msg, SUCCESS);
        return msg;
    };
    HttpAdvanced = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [services_1.MsgService, http_1.Http])
    ], HttpAdvanced);
    return HttpAdvanced;
})();
exports.HttpAdvanced = HttpAdvanced;
//# sourceMappingURL=httpAdvanced.js.map