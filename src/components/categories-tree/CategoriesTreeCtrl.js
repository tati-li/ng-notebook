/**
 * @ngdoc controller
 * @name CategoriesTree
 *
 * @description
 * _Please update the description and dependencies._
 *
 * @requires $scope
 * */

class CategoriesTreeCtrl {

  constructor($scope, $state, Category, $timeout) {
    this.$scope = $scope;
    this.$state = $state;
    this.Category = Category;
    this.$timeout = $timeout;

    this.hasParent = false;
    this.parentId = '';
    this.Category.getTopParents().then(data => {
      this.categories = data;
    });
  }


  /**
   *
   * @param id
   */
  showChildren(id) {
    this.Category.getChildren(id).then(data => {

      this.$timeout(() => {
        this.categories = data;
        this.hasParent = true;
        this.parentId = id;
      });

    });
  }

  /**
   *
   * @param id
   */
  showParents(id) {
    this.Category.getSiblings(id).then(data => {

      this.$timeout(() => {
        this.categories = data;
        this.hasParent = !!data[0].parentId;
        this.parentId = data[0].parentId || '';
      });

    });
  }

  /**
   *
   * @param path
   * @param name
   */
  filterBySelectedCategory (path, name) {
    var url = (path) ? (`${path}/${name}`) : name;
    this.$state.go('articles-filtered', {by: 'category', cond: url});
  }

}

CategoriesTreeCtrl.$inject = [
  '$scope',
  '$state',
  'Category',
  '$timeout'
];

export default CategoriesTreeCtrl;
