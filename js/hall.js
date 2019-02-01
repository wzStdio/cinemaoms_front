var App = angular.module('hall', [])

App.controller('hallController', function ($scope, $http) {
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
	$scope.table_columns = ['影厅名称','座位行','座位列','座位总数','状态','操作']

	// 表格列数据
	$scope.table_rows = [{
		'scene_name': '2号厅',
		'seat_row': '10',
		'seat_col': '10',
		'seat_num': '96',
		'seat_status': '1',
	},{
		'scene_name': '1号厅',
		'seat_row': '10',
		'seat_col': '10',
		'seat_num': '100',
		'seat_status': '2',
	}]

	// 使用影厅按钮
	$scope.use = function() {
		window.alert('Use')
	}

	// 影厅编辑按钮
	$scope.edit = function() {
		window.alert('Edit')
	}

	// 影厅维护按钮
	$scope.maintain = function() {
		window.alert('Maintain')
	}

	// 添加影厅按钮
	$scope.add = function() {
		window.alert('Add')
	}
})