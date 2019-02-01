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
		'movie_duration': 100,
		'movie_status': 1,
	},{
		'movie_no': '90048123',
		'movie_name': '毒液',
		'movie_time': '2019-01-11',
		'movie_duration': 90,
		'movie_status': 2,
	}]

	// 模态框输入内容
	$scope.obj = {
		'movie_no': null,
		'movie_name': null,
		'movie_time': null,
		'movie_duration': null,
		'movie_status': 1,
		'edit_type': 0,
		'edit_index': null
	}

	// 电影编辑按钮
	$scope.edit = function(data, edit_index) {
		this.obj.movie_no = data.movie_no
		this.obj.movie_name = data.movie_name
		this.obj.movie_time = data.movie_time
		this.obj.movie_duration = data.movie_duration
		this.obj.movie_status = data.movie_status
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
		// window.alert(this.movie_name + '\n' +
		// 			 this.movie_time + '\n' + 
		// 			 this.scene_name + '\n' + 
		// 			 this.movie_price + '\n')
		var obj = this.obj
		var data = {
			'movie_no': obj.movie_no,
			'movie_name': obj.movie_name,
			'movie_time': obj.movie_time,
			'movie_duration': obj.movie_duration,
			'movie_status': obj.movie_status,
		}
		// console.log(data)
		if (obj.edit_type==0) {
			this.table_rows.push(data)
		} else if (obj.edit_type==1) {
			console.log('edit')
			this.table_rows[obj.edit_index] = data
		}
		// this.reset()
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
		this.obj.movie_no = null
		this.obj.movie_name = null
		this.obj.movie_time = null
		this.obj.movie_duration = null
		this.obj.movie_status = 1
		this.obj.edit_type = 0
		this.obj.edit_index =null
	}

	// Status状态： 1为即将上映，2为上映中，3为已下架
	$scope.changeStatus = function(i) {
		this.obj.movie_status = i
	}

	// 电影上映按钮
	$scope.release = function(index) {
		this.table_rows[index].movie_status = 2
	}

	// 电影下架按钮
	$scope.offshell = function(index) {
		this.table_rows[index].movie_status = 3
	}

	// 电影即将上映按钮
	$scope.onready = function(index) {
		this.table_rows[index].movie_status = 1
	}
})