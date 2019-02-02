var App = angular.module('order', [])

App.controller('orderController', function ($scope, $http) {
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
	$scope.table_columns = ['订单编号','场次编号','座位号','预定姓名','电话号码','创建时间','状态','操作']

	// 表格列数据
	$scope.table_rows = [{
		'order_no': '90048153',
		'scene_no': '7004562',
		'seat_no': [
			'7排7座',
			'7排8座'
		],
		'order_name': 'AAA',
		'order_phone': '18000000000',
		'order_time': '2019-01-10 13:00:19',
		'order_status': 1,
	},{
		'order_no': '90048123',
		'scene_no': '7004562',
		'seat_no': [
			'9排7座',
			'9排8座'
		],
		'order_name': 'BBB',
		'order_phone': '180023100000',
		'order_time': '2019-01-11 13:00:19',
		'order_status': 2,
	}]

	// 表格完成按钮
	$scope.finish = function(index) {
		this.table_rows[index].order_status = 2
	}

	// 表格关闭按钮
	$scope.close = function(index) {
		this.table_rows[index].order_status = 3
	}
})