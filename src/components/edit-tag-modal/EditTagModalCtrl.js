'use strict';

class EditTagModalCtrl {

  constructor($rootScope, $scope, $modalInstance, $timeout, tag, tags, Tag) {

    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.$modalInstance = $modalInstance;
    this.$timeout = $timeout;
    this.tag = tag;
    this.tags = tags;
    this.Tag = Tag;

    this.oldName = tag;

    this.formWatch = this.$scope.$watch('EditTagForm', form => {
      if (form) {
        this.$scope.EditTagForm.NameInput.$validators.unique = val => {
          return this.tags.indexOf(val) === -1;
        };
        this.formWatch();
      }
    });

    this.tagErrors = {
      name: {
        required: 'Tag name is required',
        pattern: 'Only lowercase letters, numbers, -, _ and . symbols',
        unique: 'Such tag is already exist'
      }
    };
  }

  /**
   * Closes the modal window & resets export data model.
   */
  cancel() {
    this.$modalInstance.close();

  }


  EditTag(e) {

    e.preventDefault();

    if (this.$scope.EditTagForm.$valid) {
      this.Tag.editTag(this.oldName, {
        name: this.tag
      }).then(
        () => {

          this.$rootScope.$broadcast('tagNameWasEdited', {
            oldName: this.oldName,
            newName: this.tag
          });
          this.$modalInstance.close(this.$scope.tag);

        },
        (e) => {
          console.log(e);
        }
      );
    }
  }

}

EditTagModalCtrl.inject = [
  '$rootScope',
  '$scope',
  '$modalInstance',
  '$timeout',
  'tag',
  'tags',
  'Tag'
];

export default EditTagModalCtrl;