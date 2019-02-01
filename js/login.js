var App = angular.module('login', [])

App.controller('formCtrl', function ($scope, $http) {
	$scope.account = ''
	$scope.password = ''
	$scope.remember

	$scope.formSubmit = function() {
		window.location="./order.html"
	}
})