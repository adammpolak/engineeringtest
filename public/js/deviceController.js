(function() {
  angular.module('remoteApp')
  .controller('deviceController', deviceController);
  deviceController.$inject = ['$http', '$location', '$state', '$timeout'];

  function deviceController($http, $location, $state, $timeout) {
    var self = this;
    $http.get('/api/helpers/get-user')
      .then(function(response) {
        self.currentUser = response.data.user;
        self.currentUserAdmin = self.currentUser.admin
      })
      .catch(function(err){
        console.log('err', err)
      })

    var getDevices = function() {
      $http.get('/api/devices/')
      .then(function(response) {
        self.allDevices = response.data;
      })
      .catch(function(err) {
        console.log('err', err);
      })
    };
    getDevices();
    this.getTypes = function() {
      $http.get('/api/types/')
      .then(function(response) {
        self.allTypes = response.data;
      })
      .catch(function(err) {
        console.log('err', err);
      })
    };
    this.getTypes();
    this.activeDevice = JSON.parse(sessionStorage.getItem('activeDevice'));

    this.showDevice = function(index) {
      $state.go('device_show');
      sessionStorage.setItem('activeDevice', JSON.stringify(self.allDevices[index]));
    };

    this.valueChange = function(value) {
      console.log(self.activeDevice);
      sessionStorage.setItem('activeDevice', JSON.stringify(self.activeDevice))
      $http.put(`/api/devices`, self.activeDevice)
      .then(function(response){
        console.log(response);
      })
    }

    this.updateActiveDevice = function () {
      //update the active control in local storage
      sessionStorage.setItem('activeDevice', JSON.stringify(self.activeDevice))
      //update in the database
      $http.put(`/api/devices`, self.activeDevice)
      .then(function(response){
        console.log(response);
      })
    }

    this.newDeviceFunction = function() {
      self.activeDevice = {name: '', device_type: {}};
      sessionStorage.setItem('activeDevice', JSON.stringify(self.activeDevice))
      $state.go('device_new')
    }

    this.addNewDevice = function(device_type) {
      var device_type = JSON.parse(device_type)

      self.activeDevice.device_type.name = device_type.name;
      self.activeDevice.device_type.api = device_type.api;
      self.activeDevice.device_type.controls = device_type.controls;

      $http.post('/api/devices', self.activeDevice)
      .then(function(response) {
        $state.go('devices_all');
      })
      .catch(function(err) {
        console.log(err)
      });
    }

  }
})()
