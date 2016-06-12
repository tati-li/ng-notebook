'use strict';

class ActionsButtonsDirective {

  constructor($location) {
    ActionsButtonsDirective.$location = $location;

    this.restrict    = 'E';
    this.replace     = true;
    this.templateUrl = 'components/actions-buttons/actions-buttons.html';
  }

  link(scope) {

    /**
     *
     * @param url
     */
    scope.redirectTo = function(url) {
      ActionsButtonsDirective.$location.path(url);
    };

    scope.isOnPage = function (url) {
      return ActionsButtonsDirective.$location.path() == url;
    };

  }

  static directiveFactory($location) {
    return new ActionsButtonsDirective(...arguments);
  }

}

ActionsButtonsDirective.directiveFactory.$inject = [
  '$location'
];

export default ActionsButtonsDirective;