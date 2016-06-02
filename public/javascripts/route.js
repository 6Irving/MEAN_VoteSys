angular.module('voter', ['ngRoute','voterControllers'])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider
		    .when('/voters', {
	            templateUrl: '/templates/list.html',
	            controller: 'voterListCtrl'
		    })
		    .when('/voters/:voterId', {
		    	templateUrl: '/templates/item.html',
		    	controller: 'voterItemCtrl'
		    })
		    .when('/new', {
		    	templateUrl: './templates/new.html',
		    	controller: 'voterNewCtrl'
		    })
		    .otherwise({redirectTo:'/voters'});
	}]);