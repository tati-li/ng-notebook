'use strict';

class ArticlesCtrl {

  constructor($scope, Article, $stateParams, $state, $sce, $timeout) {
    this.$scope = $scope;
    this.Article = Article;
    this.$stateParams = $stateParams;
    this.$state = $state;
    this.$sce = $sce;
    this.$timeout = $timeout;

    this.flags = {
      isReady: false
    };

    if (this.$stateParams.by && this.$stateParams.cond) {
      this.Article.getFiltered(this.$stateParams.by, this.$stateParams.cond).then(this.onLoadArticles.bind(this));
    } else {
      this.Article.getAll(this.$stateParams.page || 1).then(articles => {
        this.onLoadArticles(articles)
      });
    }

    this.$scope.$on('tagNameWasEdited', (e, data) => {
      this.articles.forEach((article, i) => {

        let ix = article.tags.indexOf(data.oldName);
        if (ix !== -1) {
          this.articles[i].tags[ix] = data.newName;
        }

      })
    });

    this.$scope.$on('tagNameWasDeleted', (e, data) => {
      this.$scope.articles.forEach((article, i) => {

        let ix = article.tags.indexOf(data.name);
        if (ix !== -1) {
          this.articles[i].tags.splice(ix, 1);
        }

      })
    });
  }

  /**
   *
   * @param articles
     */
  onLoadArticles(articles) {

    articles.forEach((article, i) => {
      articles[i].content = this.$sce.trustAsHtml(article.content);
    });

    this.$timeout(() => {
      this.articles      = articles;
      this.flags.isReady = true;
    });

  }

  /**
   *
   * @param id
     */
  deleteArticle(id) {
    let answer = confirm('Are you sure?');
    if (answer) {
      this.Article.deleteArticle(id).then(
        function () {
          this.$state.reload();
        }
      );
    }
  }
}

ArticlesCtrl.$inject = [
  '$scope',
  'Article',
  '$stateParams',
  '$state',
  '$sce',
  '$timeout'
];

export default ArticlesCtrl;