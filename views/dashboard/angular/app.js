angular.module("dashboard",['ui.router'])
 .config(function($stateProvider, $urlRouterProvider) {
	
	$stateProvider
	.state('home', {
		url: "/home",
		templateUrl: "templates/home.html",
		controller: 'homeCtrl',
        controllerAs: 'home'
	  })

	 
	 
	 
  $urlRouterProvider.otherwise('/home')		
		
  
  
});