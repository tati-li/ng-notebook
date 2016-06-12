'use strict';

class EditCtrl {

  constructor($scope, Article, $stateParams, $location, $sce) {

    this.$scope = $scope;
    this.Article = Article;
    this.$stateParams = $stateParams;
    this.$location = $location;
    this.$sce = $sce;
    this.article = null;

    this.editEnabled = false;

    this.articleErrors = {
      title: {
        required: 'is required',
        maxlength: 'maxlength is 256 chars'
      },
      content: {
        required: 'is required'
      }
    };
  }

  enableArticleEditor(article) {
    this.editEnabled = true;
    this.article = article;
    this.editedTitle = this.article.title;
    this.editedContent = this.article.content;
    this.editedTags = angular.copy(this.article.tags);
  }

;

  cancelArticleChanges() {
    this.editEnabled = false;
  }

  EditArticle(e) {
    if (this.EditArticleForm.$valid) {
      this.Article.editArticle(this.$stateParams.id, {
        title: this.editedTitle,
        content: this.editedContent,
        tags: this.editedTags
      }).then(
        () => {
          this.cancelArticleChanges();
          this.article.title = this.editedTitle;
          this.article.content = this.editedContent;
          this.preparedContent = this.$sce.trustAsHtml(this.article.content);
          this.article.tags = this.editedTags;
        },
        (e) => {
          console.log(e);
        }
      );
    }
  }

  deleteArticle(e) {
    var answer = confirm('Are you sure?');
    if (answer) {
      this.Article.deleteArt(this.$stateParams.id).then(
        () => {
          this.$location.path('/');
        }
      );
    }
  }
}

EditCtrl.$inject = [
  '$scope',
  'Article',
  '$stateParams',
  '$location',
  '$sce'
];

export default EditCtrl;
