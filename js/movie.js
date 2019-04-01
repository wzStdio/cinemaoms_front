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
		'movieNo': '7004562',
		'movieName': '龙猫',
		'movieTime': '2019-01-10',
		'movieDuration': 100,
		'movieStatus': 1,
	},{
		'movieNo': '90048123',
		'movieName': '毒液',
		'movieTime': '2019-01-11',
		'movieDuration': 90,
		'movieStatus': 2,
	}]

	// 模态框输入内容
	$scope.obj = {
		'movieNo': null,
		'movieName': null,
		'movieTime': null,
		'movieDuration': null,
		'movieStatus': 1,
		'edit_type': 0,
		'edit_index': null
	}

	// 电影编辑按钮
	$scope.edit = function(data, edit_index) {
		this.obj.movieNo = data.movieNo
		this.obj.movieName = data.movieName
		this.obj.movieTime = data.movieTime
		this.obj.movieDuration = data.movieDuration
		this.obj.movieStatus = data.movieStatus
		this.obj.edit_type = 1
		this.obj.edit_index = edit_index
		// console.log(this.obj)
		$('#myModal').modal('show')
	}

	// 电影添加按钮
	$scope.add = function() {
		this.reset()
		$('#myModal').modal('show')
	}

	// 模态框关闭按钮
	$scope.close = function() {
		this.reset()
		$('#myModal').modal('hide')
	}

	// 新增电影中模态框保存按钮, edit_type为0时是添加新的场次，edit_type为1时是编辑已有的场次
	$scope.save = function() {
		// window.alert(this.movieName + '\n' +
		// 			 this.movieTime + '\n' + 
		// 			 this.scene_name + '\n' + 
		// 			 this.movie_price + '\n')
		var obj = this.obj
		var data = {
			'movieNo': obj.movieNo,
			'movieName': obj.movieName,
			'movieTime': new Date(obj.movieTime),
			'movieDuration': obj.movieDuration,
			'movieStatus': obj.movieStatus,
		}
		// console.log(data)
		if (obj.edit_type==0) {
			var url = 'http://localhost:9033/cinema/api/movie/addMovie'
			$scope.modifyMovie(data, url, 0)
		} else if (obj.edit_type==1) {
			var url = 'http://localhost:9033/cinema/api/movie/editMovie'
			$scope.modifyMovie(data, url, 1)
			this.table_rows[obj.edit_index] = data
		}
		// this.reset()
		$('#myModal').modal('hide')
	}

	$scope.modifyMovie = function(postdata, posturl, edit_type) {
		$http({
			method: 'POST',
			url: posturl,
			headers: {
				'Content-Type': 'application/json'
			},
			data: postdata
		}).then(function successCallback(response) {
			if (edit_type == 0) {
				console.log(response)
				$scope.table_rows.push(response.data.data[0])
			}
		}), function errorCallback(response) {
			alert('操作失败')
			console.log(response)
		}
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
		this.obj.movieNo = null
		this.obj.movieName = null
		this.obj.movieTime = null
		this.obj.movieDuration = null
		this.obj.movieStatus = 1
		this.obj.edit_type = 0
		this.obj.edit_index =null
	}

	// Status状态： 1为即将上映，2为上映中，3为已下架
	$scope.changeStatus = function(i) {
		this.obj.movieStatus = i
	}

	// 电影上映按钮
	$scope.release = function(index) {
		// this.table_rows[index].movieStatus = 2
		this.updateStatus(index, 2)
	}

	// 电影下架按钮
	$scope.offshell = function(index) {
		// this.table_rows[index].movieStatus = 3
		this.updateStatus(index, 3)
	}

	// 电影即将上映按钮
	$scope.onready = function(index) {
		// this.table_rows[index].movieStatus = 1
		this.updateStatus(index, 1)
	}

	$scope.updateStatus = function(index, status) {
		$http({
			method: 'POST',
			url: 'http://localhost:9033/cinema/api/movie/changeMovieStatus',
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				'uuid': 'admin',
				'movieNo': $scope.table_rows[index].movieNo,
				'movieStatus': status
			}
		}).then(function successCallback(response) {
			// console.log(response)
			$scope.table_rows[index].movieStatus = status
		}), function errorCallback(response) {
			alert('操作失败')
			console.log(response)
		}
	}

	$http({
		method: 'POST',
		url: 'http://localhost:9033/cinema/api/movie/getAllMovie',
		headers: {
			'Content-Type': 'application/json'
 		},
		data: { 'uuid': 'test' }
	}).then(function successCallback(response) {
			var res = response.data.data

			// 更新表格数据
			$scope.table_rows = res
		}, function errorCallback(response) {
			alert('获取数据失败')
			console.log(response)
	})
})