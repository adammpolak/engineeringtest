(function() {
  angular.module('remoteApp')
  .controller('controlController', controlController);
  controlController.$inject = ['$http', '$location', '$state', '$timeout'];

  function controlController($http, $location, $state, $timeout) {
    var self = this;
    this.number = 7;

    this.showControl = function(index) {
      $state.go('control_show');
      // $state.go('type_show', {type: self.allTypes[index]});
      // var data = sessionStorage.getItem('key');
      // sessionStorage.removeItem('key');
      sessionStorage.setItem('activeControl', JSON.stringify(self.allTypes[index]));
    };
    this.activeControl = JSON.parse(sessionStorage.getItem('activeType'));

  }
})()
