angular.module("dashboard", ['ui.router'])
	.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('home', {
				url: "/home",
				templateUrl: "templates/home.html",
				controller: 'homeCtrl',
				controllerAs: 'home'
			})
			.state('website', {
				url: "/website/:webid",
				templateUrl: "templates/website.html",
				controller: 'websiteCtrl',
				controllerAs: 'website'
			})

		$urlRouterProvider.otherwise('/home')



	});