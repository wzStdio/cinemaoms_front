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
		'sceneNo': '7004562',
		'movieName': '龙猫',
		'movieTime': '2019-01-10 13:00:19',
		'hallName': '2号厅',
		'seatRow': 10,
		'seatCol': 10,
		'seats': null
	},{
		'sceneNo': '90048123',
		'movieName': '毒液',
		'movieTime': '2019-01-11 13:00:19',
		'hallName': '1号厅',
		'seatRow': 10,
		'seatCol': 10,
		'seats': null
	}]

	// 模态框输入内容
	$scope.obj = {
		'sceneNo': null,
		'movieName': null,
		'movieTime': null,
		'hallName': null,
		'seatRow': null,
		'seatCol': null,
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

	// 预定编辑按钮
	$scope.edit = function(data, index) {
		this.obj.sceneNo = data.sceneNo
		this.obj.movieName = data.movieName
		this.obj.movieTime = data.movieTime
		this.obj.hallName = data.hallName
		this.obj.seatRow = data.seatRow
		this.obj.seatCol = data.seatCol
		this.obj.seats = data.seats
		this.obj.edit_type = 1
		this.obj.edit_index = index
		this.initseat(data.seatRow, data.seatCol, data.seats)
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
			'sceneNo': obj.sceneNo,
			'movieName': obj.movieName,
			'movieTime': obj.movieTime,
			'hallName': obj.hallName,
			'seatRow': obj.seatRow,
			'seatCol': obj.seatCol,
			'seats': JSON.stringify(obj.seats)
		}
		// console.log(data)
		if (obj.edit_type==0) {
			this.table_rows.push(data)
		} else if (obj.edit_type==1) {
			var url = 'http://localhost:9033/cinema/api/book/editSeats'
			$scope.modifyBook(url, data, obj.edit_index)
			this.table_rows[obj.edit_index].seats = obj.seats
		}
		// this.reset()
		$('#myModal').modal('hide')
	}

	$scope.modifyBook = function(posturl, postdata) {
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
		this.obj.sceneNo = null
		this.obj.movieName = null
		this.obj.movieTime = null
		this.obj.hallName = null
		this.obj.seatRow = null
		this.obj.seatCol = null
		this.obj.seats = null
		this.obj.edit_type = 0
		this.obj.edit_index =null
	}

	// 点击座位图标，图标颜色变换
	$scope.changeDisable = function(parent_index, index, i) {
		// console.log(parent_index + ' ' + index + ' ' + i)
		this.obj.seats[parent_index][index].disable = i
	}

	$http({
		method: 'POST',
		url: 'http://localhost:9033/cinema/api/book/getAllBook',
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