'use strict';

class ExportModalCtrl {

  constructor($scope, $modalInstance, $timeout, format) {
    this.$scope = $scope;
    this.$modalInstance = $modalInstance;
    this.$timeout = $timeout;
    this.format = format;

    this.exportAsList = [
      '1 page per file',
      '1 file'
    ];
    this.archiveToList = [
      {
        label: 'Select...',
        format: '',
      },
      {
        label: 'ZIP',
        format: 'zip',
      },
      {
        label: 'TAR',
        format: 'tar',
      },
      {
        label: 'RAR',
        format: 'rar',
      },
    ];

    this.exportData = {
      exportAs: this.exportAsList[0],
      archiveTo: '',
      saveTo: []
    };
  }

  /**
   *
   * @param saveTo
   */
  toggleSelection(saveTo) {

    let i = this.exportData.saveTo.indexOf(saveTo);
    i > -1 ? this.exportData.saveTo.splice(i, 1) : this.exportData.saveTo.push(saveTo);

  }

  /**
   * Closes the modal window & resets export data model.
   */
  cancel() {
    this.$modalInstance.close();

    this.$timeout(function () {
      this.exportData = {
        exportAs: this.exportAsList[0],
        archiveTo: '',
        saveTo: []
      };
    }, 200);

  }

}

ExportModalCtrl.$inject = [
  '$scope',
  '$modalInstance',
  '$timeout',
  'format'
];

export default ExportModalCtrl;