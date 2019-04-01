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
		'hallName': '2号厅',
		'seatRow': 10,
		'seatCol': 10,
		'seatNum': 96,
		'seats': null,
		'hallStatus': 1,
	},{
		'hallName': '1号厅',
		'seatRow': 10,
		'seatCol': 10,
		'seatNum': 100,
		'seats': null,
		'hallStatus': 2,
	}]

	// 模态框输入内容
	$scope.obj = {
		'hallName': null,
		'seatRow': null,
		'seatCol': null,
		'seatNum': null,
		'hallStatus': 1,
		'edit_type': 0,
		'edit_index': null,
		'seats': null
	}

	// 座位表初始化
	$scope.initseat = function(row, col, seats) {
		var newseat = []
		// 如果座位表不存在
		if (seats == null) {
			for (var i = 0; i < row; i++) {
				var seatRow = []
				for (var j = 0; j < col; j++) {
					var aseat = {
						'row': i,
						'col': j,
						'disable': 0
					}
					seatRow.push(aseat)
				}
				newseat.push(seatRow)
			}
		} else {	//座位表存在
			newseat = seats
		}
		this.obj.seats = newseat
	}

	// 使用影厅按钮
	$scope.use = function(index) {
		this.table_rows[index].hallStatus = 1
		$scope.changeHallStatus(index, 1)
	}

	// 影厅维护按钮
	$scope.maintain = function(index) {
		this.table_rows[index].hallStatus = 2
		$scope.changeHallStatus(index, 2)
	}

	$scope.changeHallStatus = function(index, status) {
		$http({
			method: 'POST',
			url: 'http://localhost:9033/cinema/api/hall/changeHallStatus',
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				'uuid': 'test',
				'hallName': this.table_rows[index].hallName,
				'hallStatus': status
			}
		}).then(function successCallback(response) {
			console.log('更改影厅状态成功')
			console.log(response)
		}, function errorCallback(response) {
			alert('更改影厅状态失败')
			console.log(response)
		})
	}

	// 影厅编辑按钮
	$scope.edit = function(data, edit_index) {
		this.obj.hallName = data.hallName
		this.obj.seatRow = data.seatRow
		this.obj.seatCol = data.seatCol
		this.obj.seatNum = data.seatNum
		this.obj.hallStatus = data.hallStatus
		this.obj.seats = data.seats
		this.obj.edit_type = 1
		this.obj.edit_index = edit_index
		this.initseat(data.seatRow, data.seatCol, data.seats)
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
			'hallName': obj.hallName,
			'seatRow': obj.seatRow,
			'seatCol': obj.seatCol,
			'seatNum': obj.seatNum,
			'hallStatus': obj.hallStatus,
			'seats': JSON.stringify(obj.seats)
		}
		console.log(data)
		if (obj.edit_type==0) {
			var url = 'http://localhost:9033/cinema/api/hall/addHall'
			$scope.modifyHall(url, data)
			this.table_rows.push(data)
		} else if (obj.edit_type==1) {
			var url = 'http://localhost:9033/cinema/api/hall/editHall'
			$scope.modifyHall(url, data)
			this.table_rows[obj.edit_index] = data
		}
		// this.reset()
		$('#myModal').modal('hide')
	}

	$scope.modifyHall = function(posturl, postdata) {
		$http({
			method: 'POST',
			url: posturl,
			headers: {
				'Content-Type': 'application/json'
			},
			data: postdata
		}).then(function successCallback(response) {
			console.log(response)
		}), function errorCallback(response) {
			alert('操作失败')
			console.log(response)
		}
	}

	// 模态框重置函数
	$scope.reset = function() {
		// console.log('reset')
		// this.obj = null
		this.obj.hallName = null
		this.obj.seatRow = null
		this.obj.seatCol = null
		this.obj.seatNum = null
		this.obj.hallStatus = 1
		this.obj.edit_type = 0
		this.obj.edit_index =null
		this.obj.seats = null
	}

	// hallStatus状态： 1为使用中，2为维护中
	$scope.changeStatus = function(i) {
		this.obj.hallStatus = i
	}

	// 点击座位图标，图标颜色变换
	$scope.changeDisable = function(parent_index, index, i) {
		// console.log(parent_index + ' ' + index + ' ' + i)
		this.obj.seats[parent_index][index].disable = i
	}

	$http({
		method: 'POST',
		url: 'http://localhost:9033/cinema/api/hall/getAllHall',
		headers: {
			'Content-Type': 'application/json'
 		},
		data: { 'uuid': 'test' }
	}).then(function successCallback(response) {
			var res = response.data.data
			for (var i = 0; i < res.length; i++) {
				res[i].seats = JSON.parse(res[i].seats)
			}
			// 更新表格数据
			$scope.table_rows = res
		}, function errorCallback(response) {
			alert('获取数据失败')
			console.log(response)
	})
})