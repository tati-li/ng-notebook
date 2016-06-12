'use strict';

class HeaderDirective {

  constructor($rootScope) {
    HeaderDirective.$rootScope = $rootScope;

    this.restrict = 'E';
    this.templateUrl = 'components/header/header.html';
  }

  link() {

    HeaderDirective.$rootScope.isSidebarOpened = false;

  }

  static directiveFactory($rootScope){
    return new HeaderDirective(...arguments);
  }
}

HeaderDirective.directiveFactory.$inject = [
  '$rootScope'
];

export default HeaderDirective;