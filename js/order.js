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
	$scope.table_rows = [
	{
		'orderNo': '90048153',
		'sceneNo': '7004562',
		'seatNo': [
			'7排7座',
			'7排8座'
		],
		'orderName': 'AAA',
		'orderPhone': '18000000000',
		'orderTime': '2019-01-10 13:00:19',
		'orderStatus': 1,
	},{
		'orderNo': '90048123',
		'sceneNo': '7004562',
		'seatNo': [
			'9排7座',
			'9排8座'
		],
		'orderName': 'BBB',
		'orderPhone': '180023100000',
		'orderTime': '2019-01-11 13:00:19',
		'orderStatus': 2,
	}
	]

	// 表格完成按钮
	$scope.finish = function(index) {
		// this.table_rows[index].orderStatus = 2
		this.operateOrderStatus(index, 2)
	}

	// 表格关闭按钮
	$scope.close = function(index) {
		// this.table_rows[index].orderStatus = 3
		this.operateOrderStatus(index, 3)
	}

	$scope.operateOrderStatus = function(index, status) {
		$http({
			method: 'POST',
			url: 'http://localhost:9033/cinema/api/order/operateOrderStatus',
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				'account': 'admin',
				'orderNo': $scope.table_rows[index].orderNo,
				'orderStatus': status
			}
		}).then(function successCallback(response) {
			// console.log(response)
			$scope.table_rows[index].orderStatus = status
		}), function errorCallback(response) {
			alert('操作失败')
			console.log(response)
		}
	}

	$http({
		method: 'POST',
		url: 'http://localhost:9033/cinema/api/order/getAllOrder',
		headers: {
			'Content-Type': 'application/json'
 		},
		data: { 'uuid': 'test' }
	}).then(function successCallback(response) {
			var res = response.data.data
			// 座位的转换
			for (var i = 0; i < res.length; i++) {
				// 座位转换
				var seat = JSON.parse(res[i].seatNo)[0]
				var seatStr = []
				for (var j = 0; j < seat.length; j++) {
					var str = seat[j].row + "排" + seat[j].col + "列;"
					seatStr.push(str)
				}
				res[i].seatNo = seatStr
			}

			// 更新表格数据
			$scope.table_rows = res
		}, function errorCallback(response) {
			alert('获取数据失败')
			console.log(response)
	})
})