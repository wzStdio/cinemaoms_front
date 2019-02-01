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
		'scene_no': '7004562',
		'movie_name': '龙猫',
		'movie_time': '2019-01-10 13:00:19',
		'scene_name': '2号厅',
		'movie_price': 50,
		'scene_status': 1,
	},{
		'scene_no': '90048123',
		'movie_name': '毒液',
		'movie_time': '2019-01-11 13:00:19',
		'scene_name': '1号厅',
		'movie_price': 60,
		'scene_status': 2,
	}]

	// 模态框输入内容
	$scope.obj = {
		'scene_no': null,
		'movie_name': null,
		'movie_time': null,
		'scene_name': null,
		'movie_price': null,
		'scene_status': null,
		'edit_type': 0,
		'edit_index': null
	}
	// $scope.scene_no = null
	// $scope.movie_name = null
	// $scope.movie_time = null
	// $scope.scene_name = null
	// $scope.movie_price = null
	// $scope.scene_status = null
	// $scope.edit_type = null
	// $scope.edit_index = null

	// 场次编辑按钮
	$scope.edit = function(data, edit_index) {
		this.obj.scene_no = data.scene_no
		this.obj.movie_name = data.movie_name
		this.obj.movie_time = data.movie_time
		this.obj.scene_name = data.scene_name
		this.obj.movie_price = data.movie_price
		this.obj.scene_status = data.scene_status
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
		// window.alert(this.movie_name + '\n' +
		// 			 this.movie_time + '\n' + 
		// 			 this.scene_name + '\n' + 
		// 			 this.movie_price + '\n')
		var obj = this.obj
		var data = {
			'scene_no': obj.scene_no,
			'movie_name': obj.movie_name,
			'movie_time': obj.movie_time,
			'scene_name': obj.scene_name,
			'movie_price': obj.movie_price,
			'scene_status': obj.scene_status,
		}
		if (obj.edit_type==0) {
			console.log(data)
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
		this.obj.scene_no = null
		this.obj.movie_name = null
		this.obj.movie_time = null
		this.obj.scene_name = null
		this.obj.movie_price = null
		this.obj.scene_status = null
		this.obj.edit_type = 0
		this.obj.edit_index =null
	}

	$scope.changeStatus = function(i) {
		this.obj.scene_status = i
	}
})

