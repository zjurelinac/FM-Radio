var http_1 = require('angular2/http');
function urlEncode(obj) {
    var urlSearchParams = new http_1.URLSearchParams();
    for (var key in obj) {
        if (0)
            urlSearchParams.append(key, urlEncode(obj[key]));
        else {
            urlSearchParams.append(key, obj[key]);
        }
    }
    return urlSearchParams.toString();
}
exports.urlEncode = urlEncode;
function numberTo2digits(num) {
    var num2 = typeof num === "string" ? num : num.toString();
    return num2.length === 1 ? '0' + num2 : num2;
}
exports.numberTo2digits = numberTo2digits;
//# sourceMappingURL=utilities.js.map