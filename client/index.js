(function(){
  'use strict';

  angular.module('hapi-auth', ['ui.router', 'LocalForageModule'])
    .config(['$stateProvider', '$urlRouterProvider', '$localForageProvider', function($stateProvider, $urlRouterProvider, $localForageProvider){
      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('home',         {url:'/',                      templateUrl:'/views/home/home.html'})
        .state('register',     {url:'/register',              templateUrl:'/views/users/users.html',        controller:'UsersCtrl'})
        .state('login',        {url:'/login',                 templateUrl:'/views/users/users.html',        controller:'UsersCtrl'});

      $localForageProvider.config({name:'hapi-auth', storeName:'cache', version:1.0});
    }])
    .run(['$rootScope', '$http', function($rootScope, $http){
      window.socket = io.connect();
      window.socket.on('online', function(){
        if($rootScope.rootuser && socket.connected){
          $http.put('/users/' + $rootScope.rootuser._id, {socketId:socket.io.engine.id});
          $rootScope.online = true;
          $rootScope.$apply();
        }
      });

      $http.get('/status').then(function(response){
        $rootScope.rootuser = response.data;
      }, function(){
        $rootScope.rootuser = null;
      });
    }]);
})();
