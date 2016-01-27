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
var Messages = (function () {
    function Messages(msgServiceInternal) {
        this.shown = false;
        this.shown = false;
        this.listenTimeoutInterval = 100;
        this.displayTimeoutInterval = 2100;
        this.messageService = msgServiceInternal;
        this.watchForMessage(this);
    }
    Messages.prototype.displayMessage = function () {
        console.log(this.messageType, this.messageText);
        this.show();
    };
    Messages.prototype.watchForMessage = function (self) {
        var msgService = self.messageService;
        var hasMessage = msgService.hasMessage();
        if (hasMessage) {
            var message = msgService.getMessage();
            self.messageType = message.type;
            self.messageText = message.text;
            msgService.deleteMessage();
            setTimeout(function () { return self.watchForMessage(self); }, self.displayTimeoutInterval);
            self.displayMessage();
        }
        else {
            setTimeout(function () { return self.watchForMessage(self); }, self.listenTimeoutInterval);
        }
    };
    Messages.prototype.show = function () {
        var _this = this;
        this.shown = true;
        setTimeout(function () { return _this.hide(_this); }, 5000);
    };
    Messages.prototype.hide = function (self) {
        if (!self)
            self = this;
        self.shown = false;
    };
    Messages = __decorate([
        core_1.Component({
            selector: 'messages',
            directives: [common_1.COMMON_DIRECTIVES],
            templateUrl: 'dest/components/messages/messages.html'
        }), 
        __metadata('design:paramtypes', [services_1.MsgServiceInternal])
    ], Messages);
    return Messages;
})();
exports.Messages = Messages;
//# sourceMappingURL=messages.js.map