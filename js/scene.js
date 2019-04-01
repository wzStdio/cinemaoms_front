var App = angular.module('scene', [])

App.controller('sceneController', function ($scope, $http) {
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
	$scope.table_columns = ['场次编号','电影名称','播放时间','影厅名称','金额','状态','操作']

	// 表格列数据
	$scope.table_rows = [{
		'sceneNo': '7004562',
		'movieNo': '3123123',
		'movieName': '龙猫',
		'movieTime': '2019-01-10 13:00:19',
		'hallName': '2号厅',
		'moviePrice': 50,
		'sceneStatus': 1,
	},{
		'sceneNo': '90048123',
		'movieNo': '1123',
		'movieName': '毒液',
		'movieTime': '2019-01-11 13:00:19',
		'hallName': '1号厅',
		'moviePrice': 60,
		'sceneStatus': 2,
	}]

	// 模态框输入内容
	$scope.obj = {
		'sceneNo': null,
		'movieNo': null,
		'movieName': null,
		'movieTime': null,
		'hallName': null,
		'moviePrice': null,
		'sceneStatus': null,
		'edit_type': 0,
		'edit_index': null
	}
	// $scope.sceneNo = null
	// $scope.movieName = null
	// $scope.movieTime = null
	// $scope.hallName = null
	// $scope.moviePrice = null
	// $scope.sceneStatus = null
	// $scope.edit_type = null
	// $scope.edit_index = null

	// 场次编辑按钮
	$scope.edit = function(data, edit_index) {
		this.obj.sceneNo = data.sceneNo
		this.obj.movieNo = data.movieNo
		this.obj.movieName = data.movieName
		this.obj.movieTime = data.movieTime
		this.obj.hallName = data.hallName
		this.obj.moviePrice = data.moviePrice
		this.obj.sceneStatus = data.sceneStatus
		this.obj.edit_type = 1
		this.obj.edit_index = edit_index
		// console.log(this.obj)
		$('#myModal').modal('show')
	}

	// 场次添加按钮
	$scope.add = function() {
		this.reset()
		$('#myModal').modal('show')
	}

	// 模态框关闭按钮
	$scope.close = function() {
		this.reset()
		$('#myModal').modal('hide')
	}

	// 新增场次中模态框保存按钮, edit_type为0时是添加新的场次，edit_type为1时是编辑已有的场次
	$scope.save = function() {
		var obj = $scope.obj
		var postdata = {
			'uuid': '13123',
			'sceneNo': obj.sceneNo,
			'movieNo': obj.movieNo,
			'movieName': obj.movieName,
			'movieTime': new Date(data.movieTime),
			'hallName': obj.hallName,
			'moviePrice': obj.moviePrice,
			'sceneStatus': obj.sceneStatus,
		}
		// 判断操作类型
		var posturl = null
		if (obj.edit_type == 0) {
			posturl = 'http://localhost:9033/cinema/api/scene/addScene'
		} else if (obj.edit_type == 1) {
			posturl = 'http://localhost:9033/cinema/api/scene/editScene'
		} else {
			return
		}
		// 向服务器请求
		$http({
			method: 'POST',
			url: posturl,
			headers: {
				'Content-Type': 'application/json'
	 		},
			data: postdata
		}).then(function successCallback(response) {
			// console.log(response)
			if (obj.edit_type == 0) {
				$scope.table_rows.push(response.data.data[0])
			} else if (obj.edit_type == 1) {
				$scope.table_rows[obj.edit_index] = data
			}
		}, function errorCallback(response) {
			alert('添加或修改场次失败')
			console.log(response)
		})
		$('#myModal').modal('hide')
	}

	// 装载时间选择器
	$scope.init = function() {
		$('.form_datetime').datetimepicker({
			format: "yyyy-mm-dd hh:ii"
		})
	}

	// 模态框重置函数
	$scope.reset = function() {
		// console.log('reset')
		// this.obj = null
		this.obj.sceneNo = null
		this.obj.movieNo = null
		this.obj.movieName = null
		this.obj.movieTime = null
		this.obj.hallName = null
		this.obj.moviePrice = null
		this.obj.sceneStatus = null
		this.obj.edit_type = 0
		this.obj.edit_index =null
	}

	// 更改场次状态函数
	$scope.changeStatus = function(i) {
		this.obj.sceneStatus = i
	}

	// 获取所有场次
	$http({
		method: 'POST',
		url: 'http://localhost:9033/cinema/api/scene/getAllScene',
		headers: {
			'Content-Type': 'application/json'
 		},
		data: { 'uuid': 'test' }
	}).then(function successCallback(response) {
			var res = response.data

			// 更新表格数据
			$scope.table_rows = res.data
	}, function errorCallback(response) {
		alert('获取数据失败')
		console.log(response)
	})
})

