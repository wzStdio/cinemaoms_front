var App = angular.module('route', [])

App.factory('routeController', function() {
	// 导航栏标题
	var navbar_brand = {
		'name': '后台管理系统',
		'url': 'index.html'
	}

	// 导航栏链接
	var navbar_links = [{
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
	var navbar_user = {
		'name': '用户',
		'url': '#'
	}

	// 导航栏右侧退出按钮
	function exit() {
		window.alert('Exit')
	}

	return {
		navbar_brand: navbar_brand,
		navbar_links: navbar_links,
		navbar_user: navbar_user,
		exit: exit
	}
})