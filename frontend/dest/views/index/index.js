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
var messages_1 = require('../../components/messages/messages');
var player_1 = require('../../components/player/player');
var popular_1 = require('../../components/popular/popular');
var radioDescr_1 = require('../../components/radioDescr/radioDescr');
var schedule_1 = require('../../components/schedule/schedule');
var station_1 = require('../../components/station/station');
var Index = (function () {
    function Index(fb, http, authService) {
        this.http = http;
        this.authService = authService;
        this.first_name = new common_1.Control('', common_1.Validators.required);
        this.last_name = new common_1.Control('', common_1.Validators.required);
        this.email = new common_1.Control('', common_1.Validators.required);
        this.password = new common_1.Control('', common_1.Validators.required);
        this.password2 = new common_1.Control('', common_1.Validators.required);
        this.year_of_birth = new common_1.Control('', common_1.Validators.required);
        this.occupation = new common_1.Control('', common_1.Validators.required);
        this.registerForm = fb.group({
            'first_name': this.first_name,
            'last_name': this.last_name,
            'email': this.email,
            'password': this.password,
            'password2': this.password2,
            'year_of_birth': this.year_of_birth,
            'occupation': this.occupation
        });
    }
    Index.prototype.onSubmitRegistration = function (values) {
        this.http.post('/user/auth/register', values);
    };
    Index.prototype.resetControls = function () {
        for (var i in this.registerForm.controls) {
            this.registerForm.controls[i].value = '';
            this.registerForm.controls[i].updateValueAndValidity();
            this.registerForm.updateValueAndValidity();
        }
    };
    Index = __decorate([
        core_1.Component({
            selector: 'Index',
            directives: [messages_1.Messages, player_1.Player, popular_1.Popular, radioDescr_1.RadioDescr, schedule_1.Schedule, station_1.Station],
            templateUrl: './dest/views/index/index.html'
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder, services_1.HttpAdvanced, services_1.AuthService])
    ], Index);
    return Index;
})();
exports.Index = Index;
//# sourceMappingURL=index.js.map