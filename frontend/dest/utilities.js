var http_1 = require('angular2/http');
var common_1 = require('angular2/common');
function urlEncode(obj) {
    var urlSearchParams = new http_1.URLSearchParams();
    for (var key in obj) {
        urlSearchParams.append(key, obj[key]);
    }
    return urlSearchParams.toString();
}
exports.urlEncode = urlEncode;
var Form = (function () {
    function Form(fb, http, controlNames, submissionUrl, getter) {
        var _this = this;
        this.http = http;
        this.submissionUrl = submissionUrl;
        var groupObj = new Object();
        for (var i in controlNames) {
            var control = new common_1.Control('', common_1.Validators.required);
            groupObj[controlNames[i]] = control;
        }
        this.group = fb.group(groupObj);
        if (getter) {
            if (typeof getter === "string") {
                this.http.get(getter).map(function (resp) { return resp.json().data; }).subscribe(function (data) {
                    for (var name_1 in data) {
                        _this.group.controls[name_1].value = data[name_1];
                        _this.group.controls[name_1].updateValueAndValidity();
                    }
                });
            }
            else {
                for (var name_2 in getter) {
                    this.group.controls[name_2].value = getter[name_2];
                    this.group.controls[name_2].updateValueAndValidity();
                }
            }
        }
    }
    Form.prototype.onSubmit = function (value) {
        console.log(value);
        this.http.post(this.submissionUrl, urlEncode(value)).map(function (resp) { return resp.json(); })
            .subscribe(function (resp) { return console.log(resp); }, function (err) { return console.log(err); });
    };
    return Form;
})();
exports.Form = Form;
//# sourceMappingURL=utilities.js.map