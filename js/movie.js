var App = angular.module('movie', [])

App.controller('movieController', function ($scope, $http) {
	// 导航栏标题
	$scope.navbar_brand = {
		'name': '后台管理系统',
		'url': 'login.html'
	}

	// 导航栏链接
	$scope.navbar_links = [{
		'name': '订单管理',
		'url': 'order.html'
	},{
		'name': '场次管理',
		'url': 'scene.html'
	},{
		'name': '影厅管理',
		'url': 'hall.html'
	},{
		'name': '电影管理',
		'url': 'movie.html'
	},{
		'name': '预定管理',
		'url': 'book.html'
	}]

	// 导航栏右侧用户链接
	$scope.navbar_user = {
		'name': '用户',
		'url': '#'
	}

	// 导航栏右侧退出按钮
	$scope.exit = function() {
		window.location="./login.html"
	}

	// $scope.navbar_brand = routeController.navbar_brand

	// $scope.navbar_links = routeController.navbar_links

	// $scope.navbar_user = routeController.navbar_user

	// $scope.exit = routeController.exit

	// 表格列
	$scope.table_columns = ['电影编号','电影名称','上映时间','电影时长','状态','操作']

	// 表格列数据
	$scope.table_rows = [{
		'movie_no': '7004562',
		'movie_name': '龙猫',
		'movie_time': '2019-01-10',
		'movie_duration': '100分钟',
		'movie_status': 1,
	},{
		'movie_no': '90048123',
		'movie_name': '毒液',
		'movie_time': '2019-01-11',
		'movie_duration': '90分钟',
		'movie_status': 2,
	}]

	// 电影添加按钮
	$scope.add = function() {
		window.alert('New')
	}

	// 电影上映按钮
	$scope.release = function() {
		window.alert('Release')
	}

	// 电影下架按钮
	$scope.offshell = function() {
		window.alert('Offshell')
	}

	// 电影编辑按钮
	$scope.edit = function() {
		window.alert('Edit')
	}
})