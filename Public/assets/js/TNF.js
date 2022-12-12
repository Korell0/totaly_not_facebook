let app = new angular.module('TNFApp', ['ngRoute']);

app.run(function($rootScope, $locale, DB) {

    $locale.NUMBER_FORMATS.GROUP_SEP = ".";
    $locale.NUMBER_FORMATS.DECIMAL_SEP = ",";

    $rootScope.settings = {};
    $rootScope.loggedUser = {};
    $rootScope.settings.appTitle = 'Totaly Not Facebook';
    $rootScope.settings.company = 'Bajai SZC Türr István Technikum';
    $rootScope.settings.author = 'Korlár';
    $rootScope.penznem = 'Ft';
    $rootScope.decimals = 0;
    $rootScope.exch = 1;
    $rootScope.loggedUser = angular.fromJson(sessionStorage.getItem('pizzeriaApp'));


    if($rootScope.loggedUser){
        DB.select('carts', 'userID', $rootScope.loggedUser.ID).then(function(res) {
            $rootScope.itemsInCart = res.data.length;
        });        
    }

});

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/fooldal.html',
            controller: 'fooldalCtrl'
        })
        .when('/reg', {
            templateUrl: 'views/registration.html',
            controller: 'userCtrl'
        })
        // admin funkciók
        .when('/felhasznalok', {
            resolve: {
                function($rootScope, $location) {
                    if ($rootScope.loggedUser.rights != 'admin') {
                        $location.path('/');
                    }
                }
            },
            templateUrl: 'views/felhasznalok.html',
            controller: 'felhasznalokCtrl'
        })
        .when('/statisztika', {
            resolve: {
                function($rootScope, $location) {
                    if ($rootScope.loggedUser.rights != 'admin') {
                        $location.path('/');
                    }
                }
            },
            templateUrl: 'views/statisztika.html',
            controller: 'statisztikaCtrl'
        })
        // user funkciók
        .when('/hirfolyam', {
            resolve: {
                function($rootScope, $location) {
                    if ($rootScope.loggedUser.rights != 'user' && $rootScope.loggedUser.rights != 'admin') {
                        $location.path('/');
                    }
                }
            },
            templateUrl: 'views/hirfolyam.html',
            controller: 'hirfolyamCtrl'
        })
        .when('/profil', {
            resolve: {
                function($rootScope, $location) {
                    if ($rootScope.loggedUser.rights != 'user' && $rootScope.loggedUser.rights != 'admin') {
                        $location.path('/');
                    }
                }
            },
            templateUrl: 'views/profil.html',
            controller: 'profilCtrl'
        })
        .otherwise('/')
});