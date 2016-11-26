(function() {
  angular.module('remoteApp')
  .controller('deviceController', deviceController);
  deviceController.$inject = ['$http', '$location', '$state', '$timeout'];

  function deviceController($http, $location, $state, $timeout) {
    var self = this;
    this.number = 7;


  }
})()
