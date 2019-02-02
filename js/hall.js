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
		'seat_row': 10,
		'seat_col': 10,
		'seat_num': 96,
		'seats': null,
		'seat_status': 1,
	},{
		'scene_name': '1号厅',
		'seat_row': 10,
		'seat_col': 10,
		'seat_num': 100,
		'seats': null,
		'seat_status': 2,
	}]

	// 模态框输入内容
	$scope.obj = {
		'scene_name': null,
		'seat_row': null,
		'seat_col': null,
		'seat_num': null,
		'seat_status': 1,
		'edit_type': 0,
		'edit_index': null,
		'seats': null
	}

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

	// 使用影厅按钮
	$scope.use = function(index) {
		this.table_rows[index].seat_status = 1
	}

	// 影厅维护按钮
	$scope.maintain = function(index) {
		this.table_rows[index].seat_status = 2
	}

	// 影厅编辑按钮
	$scope.edit = function(data, edit_index) {
		this.obj.scene_name = data.scene_name
		this.obj.seat_row = data.seat_row
		this.obj.seat_col = data.seat_col
		this.obj.seat_num = data.seat_num
		this.obj.seat_status = data.seat_status
		this.obj.seats = data.seats
		this.obj.edit_type = 1
		this.obj.edit_index = edit_index
		this.initseat(data.seat_row, data.seat_col, data.seats)
		// console.log(this.obj)
		$('#myModal').modal('show')
	}

	// 添加影厅按钮
	$scope.add = function() {
		this.reset()
		$('#myModal').modal('show')
	}

	// 模态框关闭按钮
	$scope.close = function() {
		this.reset()
		$('#myModal').modal('hide')
	}

	// 新增影厅中模态框保存按钮, edit_type为0时是添加新的场次，edit_type为1时是编辑已有的场次
	$scope.save = function() {
		var obj = this.obj
		var data = {
			'scene_name': obj.scene_name,
			'seat_row': obj.seat_row,
			'seat_col': obj.seat_col,
			'seat_num': obj.seat_num,
			'seat_status': obj.seat_status,
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
		this.obj.scene_name = null
		this.obj.seat_row = null
		this.obj.seat_col = null
		this.obj.seat_num = null
		this.obj.seat_status = 1
		this.obj.edit_type = 0
		this.obj.edit_index =null
		this.obj.seats = null
	}

	// seat_status状态： 1为使用中，2为维护中
	$scope.changeStatus = function(i) {
		this.obj.seat_status = i
	}

	$scope.changeDisable = function(parent_index, index, i) {
		// console.log(parent_index + ' ' + index + ' ' + i)
		this.obj.seats[parent_index][index].disable = i
	}
})