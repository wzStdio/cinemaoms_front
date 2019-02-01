var App = angular.module('book', [])

App.controller('bookController', function ($scope, $http) {
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
	$scope.table_columns = ['场次编号','电影名称','播放时间','影厅名称','预订状况']

	// 表格列数据
	$scope.table_rows = [{
		'scene_no': '7004562',
		'movie_name': '龙猫',
		'movie_time': '2019-01-10 13:00:19',
		'scene_name': '2号厅',
	},{
		'scene_no': '90048123',
		'movie_name': '毒液',
		'movie_time': '2019-01-11 13:00:19',
		'scene_name': '1号厅',
	}]

	// 预定编辑按钮
	$scope.edit = function() {
		window.alert('Edit')
	}
})