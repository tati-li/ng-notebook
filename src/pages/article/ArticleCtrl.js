'use strict';

import EditCtrl from './EditCtrl';

class ArticleCtrl extends EditCtrl {

  constructor($scope, Article, $stateParams, $sce, $timeout) {
    super();

    this.$scope = $scope;
    this.Article = Article;
    this.$stateParams = $stateParams;
    this.$sce = $sce;
    this.$timeout = $timeout;

    this.Article.getById(this.$stateParams.id).then(article => {

        this.$timeout(() => {
          this.preparedContent = this.$sce.trustAsHtml(article.content);
          this.article         = article;
        });

      }
    );

    this.$scope.$on('tagNameWasEdited', (e, data) => {

      var ix = this.article.tags.indexOf(data.oldName);
      if (ix !== -1) {
        this.article.tags[ix] = data.newName;
      }

    });

    this.$scope.$on('tagNameWasDeleted', (e, data) => {

      this.article.tags.splice(
        this.article.tags.indexOf(data.name), 1
      );

    });
  }

  share(post){
    FB.ui({
        method: 'share',
        name: post.title,
        href: 'http://ng-notebook.dev:3333/'+post.id,
        caption: 'post.title',
        description: '',
        message: '123'
    });
  }

}

ArticleCtrl.$inject = [
  '$scope',
  'Article',
  '$stateParams',
  '$sce',
  '$timeout'
];

export default ArticleCtrl;