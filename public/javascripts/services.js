angular.module('voterServices', ['ngResource'])
	.factory('voter', function($resource){
		return $resource('voters/:voterId', {voterId: '@voterId'}, {
			query:{method: 'GET', params: {}, isArray: true}
		})
	});