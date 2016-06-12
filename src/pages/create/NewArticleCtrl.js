'use strict';

import EditCtrl from '../article/EditCtrl';

class NewArticleCtrl extends EditCtrl {

  constructor($scope, Article, $location, $stateParams) {
    super();

    this.$scope = $scope;
    this.Article = Article;
    this.$location = $location;
    this.$stateParams = $stateParams;

    this.articleErrors = {
      title: {
        required: 'is required',
        maxlength: 'maxlength is 256 chars'
      },
      content: {
        required: 'is required'
      }
    };

    this.newTitle   = '';
    this.newContent = '';
    //$scope.newCategory = '';
    this.newTags    = [];
  }

  CreateArticle() {
    if (this.$scope.NewArticleForm.$valid) {
      Article.createArticle({
        title: this.$scope.newTitle,
        content: this.$scope.newContent,
        //category: $scope.newCategory,
        tags: this.$scope.newTags
      }).then(
        function () {
          this.$location.path('/');
        }
      );
    }
  };

  cancelArticleChanges() {
    this.$location.path('/');
  }

}

NewArticleCtrl.$inject = [
  '$scope',
  'Article',
  '$location',
  '$stateParams'
];

export default NewArticleCtrl;