(function() {
  angular.module('remoteApp')
  .controller('typeController', typeController);
  typeController.$inject = ['$http', '$location', '$state', '$timeout', '$stateParams'];

  function typeController($http, $location, $state, $timeout, $stateParams) {
    var self = this;
    this.number = 7;
    this.activeType = null;

    var getTypes = function() {
      $http.get('/api/types/')
      .then(function(response) {
        self.allTypes = response.data;
      })
      .catch(function(err) {
        console.log('err', err);
      })
    };
    getTypes();

    // This is for the type portion
    this.showType = function(index) {
      $state.go('type_show');
      // $state.go('type_show', {type: self.allTypes[index]});
      // var data = sessionStorage.getItem('key');
      // sessionStorage.removeItem('key');
      sessionStorage.setItem('activeType', JSON.stringify(self.allTypes[index]));
    };
    this.activeType = JSON.parse(sessionStorage.getItem('activeType'));

    this.updateActiveType = function () {
      //update the active control in local storage
      sessionStorage.setItem('activeType', JSON.stringify(self.activeType))
      //update in the database
      $http.put(`/api/types`, self.activeType)
      .then(function(response){
        console.log(response);
        $state.go('type_show')
      })
    }
    this.testCase = function() {
      console.log(self.activeControl.type);
    }

    //this is to create a new type
    this.newTypeFunction = function() {
      self.activeType = {name: '', api: '', controls: []};
      sessionStorage.setItem('activeType', JSON.stringify(self.activeType))
      $state.go('type_new')
    }
    this.newTypeGoToNewControl = function() {
      sessionStorage.setItem('activeType', JSON.stringify(self.activeType))
      $state.go('type_new_control_new')
    }
    this.newTypeNewControl = function(newControl) {
      self.activeType.controls.push(newControl)
      sessionStorage.setItem('activeType', JSON.stringify(self.activeType))
      $state.go('type_new')
    }
    this.newTypeNewControlDeleteControl = function () {
      //update the activeType in this controller
      self.activeType.controls.splice(self.activeControlIndex,1);
      //update the activeType in local Storage
      sessionStorage.setItem('activeType', JSON.stringify(self.activeType));
      //go to state
      $state.go('type_new')
    }
    this.addNewType = function () {
      $http.post('/api/types', self.activeType)
      .then(function(response) {
        $state.go('types_show');
      })
      .catch(function(err) {
        console.log(err)
      });
    }



    // This is for the control portion

    //this is if you click on a control in a type to show it
    this.showControl = function(index) {
      $state.go('control_show');
      sessionStorage.setItem('activeControl', JSON.stringify(self.activeType.controls[index]));
      sessionStorage.setItem('activeControlIndex', JSON.stringify(index));
    };
    this.activeControl = JSON.parse(sessionStorage.getItem('activeControl'));
    this.activeControlIndex = JSON.parse(sessionStorage.getItem('activeControlIndex'));

    //this is for a new control
    this.newControl = function(newControl) {
      //update the activeType in this controller
      self.activeType.controls.push(newControl);
      //update the active Type in local storage
      sessionStorage.setItem('activeType', JSON.stringify(self.activeType))
      //update the activeControl in this controller
      self.activeControl = newControl;
      //update the active control in local storage
      sessionStorage.setItem('activeControl', JSON.stringify(self.activeControl));
      sessionStorage.setItem('activeControlIndex', JSON.stringify(self.activeType.controls.length-1));
      //update in the database
      $http.put(`/api/types`, self.activeType)
      .then(function(response){
        console.log(response);
        $state.go('control_show')
      })
      if (newControl.type == 'select') {
        //this will be what happens with select
      }
      else {
        //this is what wil lhappen if not select
      }
    }

    //this is to update a control in the db after editing
    this.updateActiveControl = function () {
      //update the active control in local storage
      sessionStorage.setItem('activeControl', JSON.stringify(self.activeControl))
      //update the active type in controller and sessionStorage
      self.activeType.controls[self.activeControlIndex] = self.activeControl;
      sessionStorage.setItem('activeType', JSON.stringify(self.activeType));
      //update in the database
      $http.put(`/api/types`, self.activeType)
      .then(function(response){
        console.log(response);
        $state.go('control_show')
      })
    };
    this.deleteControl = function() {
      //update the activeType in this controller
      self.activeType.controls.splice(self.activeControlIndex,1);
      //update the activeType in local Storage
      sessionStorage.setItem('activeType', JSON.stringify(self.activeType));
      //update in the database
      $http.put(`/api/types`, self.activeType)
      .then(function(response){
        console.log(response);
        $state.go('type_show')
      })
    };

  }
})()
