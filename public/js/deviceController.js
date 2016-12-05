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
    this.activeDeviceIndex = JSON.parse(sessionStorage.getItem('activeDeviceIndex'));

    this.showDevice = function(index) {
      $state.go('device_show');
      sessionStorage.setItem('activeDevice', JSON.stringify(self.allDevices[index]));
      sessionStorage.setItem('activeDeviceIndex', JSON.stringify(index))
    };

    this.valueChange = function(value) {
      sessionStorage.setItem('activeDevice', JSON.stringify(self.activeDevice))
      $http.put(`/api/devices`, self.activeDevice)
      .then(function(response){
        console.log(response);
      })
    }

    this.updateActiveDevice = function (device_type) {
      var device_type = JSON.parse(device_type)

      self.activeDevice.device_type.name = device_type.name;
      self.activeDevice.device_type.api = device_type.api;
      self.activeDevice.device_type.controls = device_type.controls;

      // update the active control in local storage
      sessionStorage.setItem('activeDevice', JSON.stringify(self.activeDevice))
      //update in the database
      $http.put(`/api/devices`, self.activeDevice)
      .then(function(response){
        $state.go('device_show')
        console.log(response);
      })
    }

    this.editDeviceSelectArray = function(){
      // console.log(self.activeDevice.device_type);
      self.selectArray = [];
      for (var x = 0; x < self.allTypes.length; x++) {
        if (self.allTypes[x].name === self.activeDevice.device_type.name) {
          self.selectArray.push(self.activeDevice.device_type)
        } else {
          self.selectArray.push(self.allTypes[x])
        }
      }
      sessionStorage.setItem('selectArray', JSON.stringify(self.selectArray))
    }
    self.selectArray = JSON.parse(sessionStorage.getItem('selectArray'));


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
      //update the active control in local storage
      sessionStorage.setItem('activeDevice', JSON.stringify(self.activeDevice))
      $http.post('/api/devices', self.activeDevice)
      .then(function(response) {
        $state.go('device_show');
      })
      .catch(function(err) {
        console.log(err)
      });
    }

    this.deleteDevice = function () {
      $http.delete(`/api/devices/${self.activeDevice._id}`)
      .then(function(response){
        $state.go('devices_all');
      })
    }

  }
})()
