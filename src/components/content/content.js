'use strict';

class ContentDirective {

  constructor($rootScope) {

    ContentDirective.$rootScope = $rootScope;

    this.restrict    = 'E';
    this.templateUrl = 'components/content/content.html';
    this.replace     = true;
  }

  /**
   *
   * @param scope
   */
  link (scope) {
    scope.isSidebarDisplayed = false;

    ContentDirective.$rootScope.$on('$stateChangeStart',
      (event, toState, toParams, fromState, fromParams) => {
        scope.isSidebarDisplayed = (toState.name == 'site-root' || toState.name == 'articles-paged' || toState.name == 'articles-filtered');
      })
  }

  /**
   *
   * @param $rootScope
   * @returns {ContentDirective}
   */
  static directiveFactory($rootScope) {
    return new ContentDirective(...arguments);
  }

}

ContentDirective.directiveFactory.$inject = [
  '$rootScope'
];

export default ContentDirective;