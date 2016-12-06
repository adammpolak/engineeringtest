(function(){
  angular.module('remoteApp')
    .controller('authControl', authControl)
    authControl.$inject = ['$http', '$state']
  function authControl($http, $state){

    var self = this;

    function register(userObj){
      $http.post('api/users/register', {username: userObj.usernamereg, password: userObj.passwordreg})
        .then(function(res){
          if (res.data.message){
            $state.go('landing', {url: '/'});
          } else {
            $state.go('devices_all', {url: '/devices'});
            userObj.passwordreg = '';
            userObj.usernamereg = '';
          }
        })
    }

    function login(userObj){
      $http.post('api/users/login', {username: userObj.username, password: userObj.password})
        .then(function(res){
          if (res.data.message) {
            $state.go('landing', {url: '/'});
            alert('Nice try nerd, that is not a user, get it together')
          } else {
            self.user = res.data.user;
            // console.log(self.user)
            $state.go('devices_all', {url: '/devices'});
          }
        })
    }

    // var updateUsername = function(user) {
    //   console.log('clicked', user, 'from updateUsername function');
    //   console.log(user._id, 'from updateUsername function');
    //   $http.patch(`/api/users/${user._id}`, user)
    //   .then(function(response) {
    //     console.log(response);
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   })
    // }

    var setPassword = function(userObj) {
      console.log('clicked');
      console.log(userObj, 'from updatePassword Function');
      successAlert('<strong>Success!</strong> Password change completed.')
      $http.patch(`api/users/${userObj._id}`, {username: userObj.username, password: userObj.password, passwordConfirmation: userObj.passwordConfirmation})
    }

    this.login = login;
    this.register = register;
    this.userObject;
    this.setPassword = setPassword;
    // this.updateUsername = updateUsername;
  };
})();
