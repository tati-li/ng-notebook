'use strict';

class SidebarDirective {

  constructor($rootScope, $state, $stateParams) {

    SidebarDirective.$rootScope   = $rootScope;
    SidebarDirective.$state       = $state;
    SidebarDirective.$stateParams = $stateParams;

    this.restrict    = 'E';
    this.replace     = true;
    this.templateUrl = 'components/sidebar/sidebar.html';
  }

  link(scope) {

    scope.selectedTags =
      (SidebarDirective.$state.$current.name == 'articles-filtered' && SidebarDirective.$stateParams.by === 'tags' && SidebarDirective.$stateParams.cond) ?
        SidebarDirective.$stateParams.cond.split(',') : [];

    scope.selectedCategory =
      (SidebarDirective.$state.$current.name == 'articles-filtered' && SidebarDirective.$stateParams.by === 'category' && SidebarDirective.$stateParams.cond) ?
        SidebarDirective.$stateParams.cond : '';

    SidebarDirective.$rootScope.$on('$stateChangeSuccess',
      (event, toState, toParams, fromState, fromParams) => {
        scope.selectedTags =
          (SidebarDirective.$state.$current.name == 'articles-filtered' && toParams.by == 'tags' && toParams.cond) ?
            scope.selectedTags = toParams.cond.split(',') : [];
        scope.selectedCategory =
          (SidebarDirective.$state.$current.name == 'articles-filtered' && toParams.by === 'category' && toParams.cond) ?
            toParams.cond : '';
      });


    console.log(scope.selectedCategory);
  }

  static directiveFactory($rootScope, $state, $stateParams) {
    return new SidebarDirective(...arguments);
  }

}

SidebarDirective.directiveFactory.$inject = [
  '$rootScope',
  '$state',
  '$stateParams'
];

export default SidebarDirective;