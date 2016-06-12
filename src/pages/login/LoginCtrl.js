'use strict';
import $ from 'jquery';

class LoginCtrl {

  /**
   *
   * @param $scope
   * @param $state
   * @param User
   */
  constructor($scope, $state, User) {

    this.$scope = $scope;
    this.$state = $state;
    this.User   = User;

    this.user = {
      username: '',
      password: ''
    };

  }

  /**
   *
   * @param inputName
   * @returns {*|jQuery}
   */
  isInputFocused(inputName) {
    return $('input[name="' + inputName + '"]').is(':focus');
  }

  /**
   *
   * @param e
   */
  loginUser(e) {

    if (this.$scope.LoginForm.$valid) {

      this.User.logIn(this.user).then(() => {
        this.$state.go('site-root');
      }, err => {
        console.error(err);
        alert(err.message);
      });

    }

  }

}

LoginCtrl.$inject = [
  '$scope',
  '$state',
  'User'
];

export default LoginCtrl;