(function() {
  angular.module('remoteApp')
  .controller('typeController', typeController);
  typeController.$inject = ['$http', '$location', '$state', '$timeout', '$stateParams', '$scope'];

  function typeController($http, $location, $state, $timeout, $stateParams, $scope) {

    $scope.safeApply = function(fn) {
      var phase = this.$root.$$phase;
      if(phase == '$apply' || phase == '$digest') {
        if(fn && (typeof(fn) === 'function')) {
          fn();
        }
      } else {this.$apply(fn);}
    };
    var self = this;
    $http.get('/api/helpers/get-user')
      .then(function(response) {
        self.currentUser = response.data.user;
        self.currentUserAdmin = self.currentUser.admin;
      })
      .catch(function(err){
        console.log('err', err)
      })

    this.activeType = null;
    this.typeState = 'show'
    this.controlState = 'show'


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
    this.activeType = JSON.parse(sessionStorage.getItem('activeType'));
    this.activeControl = JSON.parse(sessionStorage.getItem('activeControl'));
    this.activeControlIndex = JSON.parse(sessionStorage.getItem('activeControlIndex'));

    // This is for the type portion
    this.showType = function(index) {
      $state.go('type_show');
      // $state.go('type_show', {type: self.allTypes[index]});
      // var data = sessionStorage.getItem('key');
      // sessionStorage.removeItem('key');
      sessionStorage.setItem('activeType', JSON.stringify(self.allTypes[index]));
    };

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


    //this is to create a new type
    this.newTypeFunction = function() {
      self.activeType = {name: '', api: '', controls: []};
      self.activeControl = {name: '', httpVerb: '', httpURL: '', type: '', options: []}
      sessionStorage.setItem('activeControl', JSON.stringify(self.activeControl));
      sessionStorage.setItem('activeType', JSON.stringify(self.activeType))
      $state.go('type_new')
    }

    this.newTypeGoToNewControl = function() {
      sessionStorage.setItem('activeType', JSON.stringify(self.activeType))
      $state.go('type_new_control_new')
      this.activeControlSelect = null;
    }

    this.newTypeNewControl = function() {
      self.activeType.controls.push(self.activeControl)
      sessionStorage.setItem('activeType', JSON.stringify(self.activeType))
      $state.go('type_new')
    }

    this.newTypeNewControlDeleteControl = function () {
      //update the activeType in this controller
      self.activeType.controls.splice(self.activeControlIndex,1);
      //update the activeType in local Storage
      sessionStorage.setItem('activeType', JSON.stringify(self.activeType));
      self.activeControl = {name: '', httpVerb: '', httpURL: '', type: '', options: []}
      sessionStorage.setItem('activeControl', JSON.stringify(self.activeControl));
      //go to state
      $state.go('type_new')
    }

    this.addNewType = function () {
      $http.post('/api/types', self.activeType)
      .then(function(response) {
        $state.go('types_all');
      })
      .catch(function(err) {
        console.log(err)
      });
    }

    this.deleteType = function () {
      $http.delete(`/api/types/${self.activeType._id}`)
      .then(function(response){
        $state.go('types_all');
      })
    }



    // This is for the control portion

    //if the control is select than replace selectControlOptions

    //this is if you click on a control in a type to show it
    this.showControl = function(index) {
      $state.go('control_show');
      sessionStorage.setItem('activeControl', JSON.stringify(self.activeType.controls[index]));
      sessionStorage.setItem('activeControlIndex', JSON.stringify(index));
    };
    if (self.activeControl && self.activeControl.type == 'select') {
      this.activeControlSelect = true;
    }

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
      //update the active control index in local storage
      sessionStorage.setItem('activeControlIndex', JSON.stringify(self.activeType.controls.length-1));
      //update in the database
      $http.put(`/api/types`, self.activeType)
      .then(function(response){
        console.log(response);
        $state.go('control_show')
      })
    }

    //this is to update a control in the db after editing
    this.updateActiveControl = function (state) {
      //update the active control in local storage
      sessionStorage.setItem('activeControl', JSON.stringify(self.activeControl))
      //update the active type in controller and sessionStorage
      self.activeType.controls[self.activeControlIndex] = self.activeControl;
      sessionStorage.setItem('activeType', JSON.stringify(self.activeType));
      //update in the database
      $http.put(`/api/types`, self.activeType)
      .then(function(response){
        console.log(response);
        if (state = 'new') {
          $state.go('type_new');
        } if (state = 'edit') {
          $state.go('type_edit');
        } if (state = 'show') {
          $state.go('control_show');
        }
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

    this.selectCheck = function () {
      if (self.activeControl.type == 'select') {
        $scope.safeApply(function(){
          self.activeControlSelect = true;
        })
      } else {
        $scope.safeApply(function(){
          self.activeControlSelect = false;
        })
      }
    }

    this.addOption = function() {
      self.activeControl.options.push({name: ''})
    }
    this.removeOption = function(index) {
      self.activeControl.options.splice(index,1);
    }

  }
})()
