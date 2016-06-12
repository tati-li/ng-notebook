'use strict';

class FilterModalCtrl {

  constructor($scope, $modalInstance, $timeout) {
    this.$scope = $scope;
    this.$modalInstance = $modalInstance;
    this.$timeout = $timeout;

    this.moment = moment;

    this.filterData = {
      type:  '',
      cond:  '',
      value: ''
    };

    this.filterTypes = [
      {
        type: '',
        label: 'Select...'
      },
      {
        type: 'string',
        label: 'Title/Content'
      },
      {
        type: 'date',
        label: 'Creation Date'
      },
      {
        type: 'date',
        label: 'Update Date'
      }
    ];

    this.filterConds = {
      string: [
        {
          cond: '',
          label: 'Select...'
        },
        {
          cond: 'contains',
          label: 'Contains string'
        },
        {
          cond: 'starts with',
          label: 'Starts with string'
        },
        {
          cond: 'ends with',
          label: 'Ends with string'
        }
      ],
      date: [
        {
          cond: '',
          label: 'Select...'
        },
        {
          cond: 'before',
          label: 'Before date'
        },
        {
          cond: 'before or at',
          label: 'Before or at date'
        },
        {
          cond: 'before and at',
          label: 'Before and at date'
        },
        {
          cond: 'at',
          label: 'At date'
        },
        {
          cond: 'at or after',
          label: 'At or after date'
        },
        {
          cond: 'at and after',
          label: 'At and after date'
        },
        {
          cond: 'after',
          label: 'After date'
        },
        {
          cond: 'between',
          label: 'Between dates'
        }
      ]
    };

    this.dateBetween = {
      start: '',
      end:   ''
    };

    let watchType = this.$scope.$watch('filterData.type', () => {
      this.filterData.cond  = '';
      this.filterData.value = '';
    });

    let watchCond = this.$scope.$watch('filterData.type', () => {
      this.filterData.value = '';
    });

  }

  /**
   *
   * @param e
   */
  setDateVal (e, order) {

    if (order === 'start') {

      if (this.filterData.value.indexOf('|') >= 0) {
        var parts = this.filterData.value.split('|');
        this.filterData.value = this.moment(this.dateBetween.start).format('MM.DD.YYYY') + '|' + parts[1];
      } else {
        this.filterData.value = this.moment(this.dateBetween.start).format('MM.DD.YYYY') + '|';
      }

    } else {

      if (this.filterData.value.indexOf('|') >= 0) {
        var parts = this.filterData.value.split('|');
        this.filterData.value = parts[0] + '|' + this.moment(this.dateBetween.end).format("MM.DD.YYYY");
      } else {
        this.filterData.value = '|' + this.moment(this.dateBetween.end).format("MM.DD.YYYY");
      }

    }

  }

  /**
   * Closes the modal window, resets export data model and clears watchers.
   */
  cancel () {
    this.$modalInstance.close();

    this.$timeout(function() {

      //
      this.filterData = {
        type: '',
        cond: ''
      };

      //
      this.watchType();
      this.watchCond();

    }, 200);

  }

}

FilterModalCtrl.$inject = [
  '$scope',
  '$modalInstance',
  '$timeout'
];

export default FilterModalCtrl;