var router_1 = require('angular2/router');
var VIEWS_DIR_PATH = '../dest/views/';
var ComponentHelper = (function () {
    function ComponentHelper() {
    }
    ComponentHelper.LoadComponentAsync = function (name, path) {
        return System.import(path).then(function (c) { return c[name]; });
    };
    return ComponentHelper;
})();
var MyAsyncComponent = (function () {
    function MyAsyncComponent(displayName, componentName, folderName, routePath, hidden) {
        this.displayName = displayName;
        this.componentName = componentName;
        this.folderName = folderName;
        this.routePath = routePath;
        this.hidden = hidden ? true : false;
    }
    MyAsyncComponent.prototype.getLoader = function () {
        var _this = this;
        return function () { return ComponentHelper.LoadComponentAsync(_this.componentName, VIEWS_DIR_PATH + _this.folderName + '/' + _this.folderName); };
    };
    MyAsyncComponent.prototype.getRoute = function () {
        return new router_1.AsyncRoute({ 'path': this.routePath, 'name': this.componentName, 'loader': this.getLoader() });
    };
    return MyAsyncComponent;
})();
var NavGroup = (function () {
    function NavGroup(displayName, components, accountType, hasLink, link) {
        this.displayName = displayName;
        this.components = components;
        this.accountType = accountType;
        this.hasLink = hasLink;
        this.link = link ? link : null;
    }
    return NavGroup;
})();
var NavigationProvider = (function () {
    function NavigationProvider() {
    }
    NavigationProvider.getNavigationArray = function () {
        if (this.navigationArray[2].components.length < 3)
            this.navigationArray[2].components.push(new MyAsyncComponent('Statistike', 'ShowStats', 'showStats', './stats'));
        return this.navigationArray;
    };
    NavigationProvider.getRouteConfig = function (dataObj) {
        var routeDefinitionArray = [];
        for (var i in this.navigationArray) {
            for (var j in this.navigationArray[i].components) {
                var component = this.navigationArray[i].components[j];
                routeDefinitionArray.push(component.getRoute());
            }
            if (this.navigationArray[i].hasLink) {
                if (this.navigationArray[i].link.componentName == "Index")
                    continue;
                else
                    routeDefinitionArray.push(this.navigationArray[i].link.getRoute());
            }
        }
        if (dataObj) {
            for (var i in routeDefinitionArray) {
                routeDefinitionArray[i].data = dataObj;
            }
        }
        routeDefinitionArray[0].useAsDefault = true;
        return routeDefinitionArray;
    };
    NavigationProvider.navigationArray = [
        new NavGroup('Slušaj radio', [], 2 + 4 + 8 + 16, true, new MyAsyncComponent('', 'Index', 'index', '/')),
        new NavGroup('Pregled mogućnosti', [], 2 + 4 + 8 + 16, true, new MyAsyncComponent('', 'Overview', 'overview', './')),
        new NavGroup('Vlasničke mogućnosti', [
            new MyAsyncComponent('Administratori', 'ManageAdmins', 'manageAdmins', './admins'),
            new MyAsyncComponent('Podaci o postaji', 'ManageRadiostation', 'manageRadiostation', './station'),
        ], 16, false),
        new NavGroup('Administratorske mogućnosti', [
            new MyAsyncComponent('Zvučni zapisi', 'ManageTracks', 'manageTracks', './tracks'),
            new MyAsyncComponent('Urednici', 'ManageEditors', 'manageEditors', './editors'),
            new MyAsyncComponent('Zahtjevi za terminima', 'ManageRequests', 'manageRequests', './requests'),
            new MyAsyncComponent('Korisnici', 'ManageUsers', 'manageUsers', './users'),
            new MyAsyncComponent('Uredi korisnika', 'EditUser', 'editUser', './users/edit', true),
            new MyAsyncComponent('Dodaj zvučni zapis', 'AddTrack', 'addTrack', './tracks/add', true),
            new MyAsyncComponent('Uredi zvučni zapis', 'EditTrack', 'editTrack', './tracks/edit', true),
            new MyAsyncComponent('Statistike', 'ShowStats', 'showStats', './stats')
        ], 8, false),
        new NavGroup('Uredničke mogućnosti', [
            new MyAsyncComponent('Termini reprodukcije', 'EditorSlots', 'editorSlots', './slots'),
            new MyAsyncComponent('Sastavi listu za reprodukciju', 'MakePlaylist', 'makePlaylist', './slots/playlist', true)
        ], 4, false),
        new NavGroup('Korisničke mogućnosti', [
            new MyAsyncComponent('Lista želja', 'MakeWishlist', 'makeWishlist', './wishlist'),
        ], 2, false),
        new NavGroup('Postavke računa', [
            new MyAsyncComponent('Osobni podaci', 'AccountData', 'accountData', './account'),
            new MyAsyncComponent('Promjena lozinke', 'AccountPassword', 'accountPassword', './account/password'),
            new MyAsyncComponent('Brisanje računa', 'AccountDelete', 'accountDelete', './account/delete')
        ], 2 + 4 + 8 + 16, false)
    ];
    return NavigationProvider;
})();
exports.NavigationProvider = NavigationProvider;
//# sourceMappingURL=routingProvider.js.map