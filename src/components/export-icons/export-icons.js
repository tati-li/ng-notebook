'use strict';

class ExportIconsDirective {
  
  constructor($modal, ngPopover){
    ExportIconsDirective.$modal = $modal;
    ExportIconsDirective.ngPopover = ngPopover;

    this.restrict = 'A';
  }

  /**
   *
   * @param scope
   */
  link(scope) {

    scope.format      = '';
    let modalInstance = null;

    /**
     * Processes export icon click.
     * Opens modal window with export settings.
     *
     * @param format
     */
    scope.exportTo = format => {
      scope.format  = format;

      modalInstance = ExportIconsDirective.$modal.open({
        templateUrl: 'components/export-modal/export-modal.html',
        controller:  'ExportModalCtrl as exportModalCtrl',
        resolve:     {
          format: () => {
            return scope.format;
          }
        }
      });

      ExportIconsDirective.ngPopover.close();
    }

  }

  static directiveFactory($modal, ngPopover){
    return new ExportIconsDirective(...arguments);
  }
}

ExportIconsDirective.directiveFactory.$inject = [
  '$modal',
  'ngPopover'
];

export default ExportIconsDirective;