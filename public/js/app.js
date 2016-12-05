(function(){
  angular.module('remoteApp', ['ui.router']).config(MainRouter);
  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
  function MainRouter($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
    .state('landing', {
        url: '/',
        templateUrl: 'templates/landing.html',
        controller: 'authControl',
        controllerAs: 'auth',
        resolve:{ logged: function($http, $state){
          $http.get('/api/helpers/get-user')
            .then(function(res){
              if (res.data.user) {
                $state.go('devices_all', {url: '/devices'});
              }
            })
          }
        }
      })
    .state('devices_all', {
      url: '/devices',
      templateUrl: 'templates/devices/show.html',
      controller: 'deviceController',
      controllerAs: 'device',
      resolve:{ logged: function($http, $state){
          $http.get('/api/helpers/get-user')
            .then(function(res){
              if (!res.data.user) {
                $state.go('landing', {url: '/'});
              }
            })
          }
        }
    })
    .state('device_show', {
      url: '/devices/device',
      templateUrl: 'templates/devices/device/show.html',
      controller: 'deviceController',
      controllerAs: 'device',
      resolve:{ logged: function($http, $state){
          $http.get('/api/helpers/get-user')
            .then(function(res){
              if (!res.data.user) {
                $state.go('landing', {url: '/'});
              }
            })
          }
        }
    })
    .state('device_edit', {
      url: '/devices/device/edit',
      templateUrl: 'templates/devices/device/edit.html',
      controller: 'deviceController',
      controllerAs: 'device',
      resolve:{ logged: function($http, $state){
          $http.get('/api/helpers/get-user')
            .then(function(res){
              if (!res.data.user) {
                $state.go('landing', {url: '/'});
              }
            })
          }
        }
    })
    .state('device_new', {
      url: '/devices/device/new',
      templateUrl: 'templates/devices/device/new.html',
      controller: 'deviceController',
      controllerAs: 'device',
      resolve:{ logged: function($http, $state){
          $http.get('/api/helpers/get-user')
            .then(function(res){
              if (!res.data.user) {
                $state.go('landing', {url: '/'});
              }
            })
          }
        }
    })
    .state('types_all', {
      url: '/types',
      templateUrl: 'templates/types/show.html',
      // params: {type: null},
      controller: 'typeController',
      controllerAs: 'type',
      resolve:{ logged: function($http, $state){
          $http.get('/api/helpers/get-user')
            .then(function(res){
              if (!res.data.user) {
                $state.go('landing', {url: '/'});
              }
            })
          }
        }
    })
    .state('type_show', {
      url: '/types/type',
      templateUrl: 'templates/types/type/show.html',
      params: {type: null},
      controller: 'typeController',
      controllerAs: 'type',
      resolve:{ logged: function($http, $state){
          $http.get('/api/helpers/get-user')
            .then(function(res){
              if (!res.data.user) {
                $state.go('landing', {url: '/'});
              }
            })
          }
        }
    })
    .state('type_edit', {
      url: '/types/type/edit',
      templateUrl: 'templates/types/type/edit.html',
      controller: 'typeController',
      controllerAs: 'type',
      resolve:{ logged: function($http, $state){
          $http.get('/api/helpers/get-user')
            .then(function(res){
              if (!res.data.user) {
                $state.go('landing', {url: '/'});
              }
            })
          }
        }
    })
    .state('type_new', {
      url: '/types/type/new',
      templateUrl: 'templates/types/type/new.html',
      controller: 'typeController',
      controllerAs: 'type',
      resolve:{ logged: function($http, $state){
          $http.get('/api/helpers/get-user')
            .then(function(res){
              if (!res.data.user) {
                $state.go('landing', {url: '/'});
              }
            })
          }
        }
    })
    .state('control_show', {
      url: '/types/type/control',
      templateUrl: 'templates/controls/show.html',
      controller: 'typeController',
      controllerAs: 'type',
      resolve:{ logged: function($http, $state){
          $http.get('/api/helpers/get-user')
            .then(function(res){
              if (!res.data.user) {
                $state.go('landing', {url: '/'});
              }
            })
          }
        }
    })
    .state('control_edit', {
      url: '/types/type/control/edit',
      templateUrl: 'templates/controls/edit.html',
      controller: 'typeController',
      controllerAs: 'type',
      resolve:{ logged: function($http, $state){
          $http.get('/api/helpers/get-user')
            .then(function(res){
              if (!res.data.user) {
                $state.go('landing', {url: '/'});
              }
            })
          }
        }
    })
    .state('control_new', {
      url: '/types/type/control/new',
      templateUrl: 'templates/controls/new.html',
      controller: 'typeController',
      controllerAs: 'type',
      resolve:{ logged: function($http, $state){
          $http.get('/api/helpers/get-user')
            .then(function(res){
              if (!res.data.user) {
                $state.go('landing', {url: '/'});
              }
            })
          }
        }
    })
    .state('type_new_control_new', {
      url: '/types/type/new/control/new',
      templateUrl: 'templates/controls/newType-newControl.html',
      controller: 'typeController',
      controllerAs: 'type',
      resolve:{ logged: function($http, $state){
          $http.get('/api/helpers/get-user')
            .then(function(res){
              if (!res.data.user) {
                $state.go('landing', {url: '/'});
              }
            })
          }
        }
    })
    .state('type_new_control_edit', {
      url: '/types/type/new/control/edit',
      templateUrl: 'templates/controls/newType-EditControl.html',
      controller: 'typeController',
      controllerAs: 'type',
      resolve:{ logged: function($http, $state){
          $http.get('/api/helpers/get-user')
            .then(function(res){
              if (!res.data.user) {
                $state.go('landing', {url: '/'});
              }
            })
          }
        }
    })
    .state('type_edit_control_new', {
      url: '/types/type/edit/control/new',
      templateUrl: 'templates/controls/editType-newControl.html',
      controller: 'typeController',
      controllerAs: 'type',
      resolve:{ logged: function($http, $state){
          $http.get('/api/helpers/get-user')
            .then(function(res){
              if (!res.data.user) {
                $state.go('landing', {url: '/'});
              }
            })
          }
        }
    })
    .state('type_edit_control_edit', {
      url: '/types/type/edit/control/edit',
      templateUrl: 'templates/controls/editType-EditControl.html',
      controller: 'typeController',
      controllerAs: 'type',
      resolve:{ logged: function($http, $state){
          $http.get('/api/helpers/get-user')
            .then(function(res){
              if (!res.data.user) {
                $state.go('landing', {url: '/'});
              }
            })
          }
        }
    })
    $urlRouterProvider.otherwise('/devices');
  }
})()
