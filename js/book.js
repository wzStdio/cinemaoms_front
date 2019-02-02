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
		'seat_row': 10,
		'seat_col': 10,
		'seats': null
	},{
		'scene_no': '90048123',
		'movie_name': '毒液',
		'movie_time': '2019-01-11 13:00:19',
		'scene_name': '1号厅',
		'seat_row': 10,
		'seat_col': 10,
		'seats': null
	}]

	// 模态框输入内容
	$scope.obj = {
		'scene_no': null,
		'movie_name': null,
		'movie_time': null,
		'scene_name': null,
		'seat_row': null,
		'seat_col': null,
		'seats': null,
		'edit_type': 0,
		'edit_index': null
	}

	// 座位表初始化
	$scope.initseat = function(row, col, seats) {
		var newseat = []
		// 如果座位表不存在
		if (seats == null) {
			for (var i = 0; i < row; i++) {
				var seat_row = []
				for (var j = 0; j < col; j++) {
					var aseat = {
						'row': i,
						'col': j,
						'disable': 0
					}
					seat_row.push(aseat)
				}
				newseat.push(seat_row)
			}
		} else {	//座位表存在
			newseat = seats
		}
		this.obj.seats = newseat
	}

	// 预定编辑按钮
	$scope.edit = function(data, index) {
		this.obj.scene_no = data.scene_no
		this.obj.movie_name = data.movie_name
		this.obj.movie_time = data.movie_time
		this.obj.scene_name = data.scene_name
		this.obj.seat_row = data.seat_row
		this.obj.seat_col = data.seat_col
		this.obj.seats = data.seats
		this.obj.edit_type = 1
		this.obj.edit_index = index
		this.initseat(data.seat_row, data.seat_col, data.seats)
		$('#myModal').modal('show')
	}

	// 模态框关闭按钮
	$scope.close = function() {
		this.reset()
		$('#myModal').modal('hide')
	}

	// 预定管理中模态框保存按钮
	$scope.save = function() {
		var obj = this.obj
		var data = {
			'scene_no': obj.scene_no,
			'movie_name': obj.movie_name,
			'movie_time': obj.movie_time,
			'scene_name': obj.scene_name,
			'seat_row': obj.seat_row,
			'seat_col': obj.seat_col,
			'seats': obj.seats
		}
		// console.log(data)
		if (obj.edit_type==0) {
			this.table_rows.push(data)
		} else if (obj.edit_type==1) {
			this.table_rows[obj.edit_index] = data
		}
		// this.reset()
		$('#myModal').modal('hide')
	}

	// 模态框重置函数
	$scope.reset = function() {
		// console.log('reset')
		// this.obj = null
		this.obj.scene_no = null
		this.obj.movie_name = null
		this.obj.movie_time = null
		this.obj.scene_name = null
		this.obj.seat_row = null
		this.obj.seat_col = null
		this.obj.seats = null
		this.obj.edit_type = 0
		this.obj.edit_index =null
	}

	// 点击座位图标，图标颜色变换
	$scope.changeDisable = function(parent_index, index, i) {
		// console.log(parent_index + ' ' + index + ' ' + i)
		this.obj.seats[parent_index][index].disable = i
	}
})