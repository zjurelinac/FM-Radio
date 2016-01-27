var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
var MESSAGE_TEXT = "message_text";
var MESSAGE_TYPE = "message_type";
var INFO = "info";
var SUCCESS = "success";
var ERROR = "error";
var THIS = null;
var MsgServiceInternal = (function () {
    function MsgServiceInternal() {
        this.message = "";
    }
    MsgServiceInternal.prototype.hasMessage = function () {
        var msg = this.getMessage();
        return !!msg.text;
    };
    MsgServiceInternal.prototype.setMessage = function (msg, type) {
        var msg2 = typeof msg === "string" ? msg : JSON.stringify(msg);
        if (!type)
            type = INFO;
        sessionStorage.setItem(MESSAGE_TEXT, msg2);
        sessionStorage.setItem(MESSAGE_TYPE, type);
    };
    MsgServiceInternal.prototype.deleteMessage = function () {
        this.setMessage("");
    };
    MsgServiceInternal.prototype.getMessage = function () {
        var msg = sessionStorage.getItem(MESSAGE_TEXT);
        var type = sessionStorage.getItem(MESSAGE_TYPE);
        return { text: msg, type: type };
    };
    MsgServiceInternal = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MsgServiceInternal);
    return MsgServiceInternal;
})();
exports.MsgServiceInternal = MsgServiceInternal;
var MsgService = (function () {
    function MsgService(msgServiceInternal) {
        this.msgServiceInternal = msgServiceInternal;
        THIS = this;
    }
    MsgService.prototype.setMessage = function (msg, type) {
        this.msgServiceInternal.setMessage(msg, type);
    };
    MsgService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(MsgServiceInternal)), 
        __metadata('design:paramtypes', [MsgServiceInternal])
    ], MsgService);
    return MsgService;
})();
exports.MsgService = MsgService;
//# sourceMappingURL=msgService.js.map