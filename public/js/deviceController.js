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
    // this.activeDevice = JSON.parse(sessionStorage.getItem('activeDevice'));

    this.showDevice = function(id) {
      $state.go('device_show');
      // sessionStorage.setItem('activeDevice', JSON.stringify(self.allDevices[index]));
      sessionStorage.setItem('activeDeviceIndex', JSON.stringify(id))
      sessionStorage.setItem('activeDeviceId', JSON.stringify(id))
    };

    this.valueChange = function(value) {
      sessionStorage.setItem('activeDevice', JSON.stringify(self.activeDevice))
      $http.put(`/api/devices`, self.activeDevice)
      .then(function(response){
        console.log(response);
      })
    }
    this.findDevice = function() {
      if ($state.current.name == 'device_show') {
        self.activeDeviceId = JSON.parse(sessionStorage.getItem('activeDeviceId'));
        $http.get(`/api/devices/${self.activeDeviceId}`)
        .then(function(response){
          self.activeDevice = response.data;
          sessionStorage.setItem('activeDevice', JSON.stringify(self.activeDevice))
        })
      } else {
        this.activeDevice = JSON.parse(sessionStorage.getItem('activeDevice'));
      }
    }
    this.findDevice()

    this.updateActiveDevice = function () {
      if (JSON.parse(sessionStorage.getItem('activeDevice')).device_type.name != self.activeDevice.device_type.name) {
        for (var x = 0; x<self.allTypes.length; x++) {
          if(self.allTypes[x].name == self.activeDevice.device_type.name) {
            self.activeDevice.device_type = {}
            self.activeDevice.device_type.name = self.allTypes[x].name;
            self.activeDevice.device_type.api = self.allTypes[x].api;
            self.activeDevice.device_type.controls = self.allTypes[x].controls;
          }
        }
      }


      // update the active control in local storage
      sessionStorage.setItem('activeDeviceId', JSON.stringify(self.activeDevice._id))
      //update in the database
      $http.put(`/api/devices`, self.activeDevice)
      .then(function(response){
        $state.go('device_show')
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
      //update the active control in local storage
      sessionStorage.setItem('activeDevice', JSON.stringify(self.activeDevice))
      $http.post('/api/devices', self.activeDevice)
      .then(function(response) {
        sessionStorage.setItem('activeDeviceId', JSON.stringify(response.data._id))
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
