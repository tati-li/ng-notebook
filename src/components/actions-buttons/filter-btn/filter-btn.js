'use strict';

class FilterBtnDirective {

  constructor($modal) {

    FilterBtnDirective.$modal = $modal;

    this.restrict = 'E';
    this.templateUrl = 'components/actions-buttons/filter-btn/filter-btn.html';

  }

  link (scope, elem, attr) {

    /**
     *
     */
    scope.openFilterModal = function() {

      FilterBtnDirective.$modal.open({
        templateUrl: 'components/actions-buttons/filter-btn/filter-modal/filter-modal.html',
        controller:  'FilterModalCtrl as filterModalCtrl'
      });

    }

  }

  static directiveFactory($modal) {
    return new FilterBtnDirective(...arguments);
  }
}

FilterBtnDirective.directiveFactory.$inject = [
  '$modal'
];

export default FilterBtnDirective;