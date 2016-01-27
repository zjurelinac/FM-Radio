var router_1 = require('angular2/router');
var accountData_1 = require('../settings/accountData/accountData');
function getRouteConfig() {
    var routeDefinitionArray = [];
    var routes = [
        { 'path': '/settings/account_data', 'name': 'Osobni podaci', 'component': accountData_1.AccountData }
    ];
    for (var r in routes) {
        var route = new router_1.Route({ 'path': r.path, 'name': r.name, 'component': r.component });
        console.log(route);
        routeDefinitionArray.push(route);
    }
    console.log(routeDefinitionArray);
    return routeDefinitionArray;
}
exports.getRouteConfig = getRouteConfig;
//# sourceMappingURL=routingProvider.js.map