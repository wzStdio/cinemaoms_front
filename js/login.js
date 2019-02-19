var App = angular.module('login', [])

App.controller('formCtrl', function ($scope, $http) {
	// 账号
	$scope.account = ''
	// 密码
	$scope.password = ''
	// 记住密码
	$scope.remember

	$scope.formSubmit = function() {
		window.location="./order.html"
	}
})