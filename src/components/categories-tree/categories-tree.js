'use strict';

export default class CategoriesTreeDirective {

  constructor(){
    this.restrict = 'E';

    this.scope = {
      selectedCategory: '='
    };

    this.templateUrl = 'components/categories-tree/categories-tree.html';

    this.controller = 'CategoriesTreeCtrl as ctc';
  }

  static directiveFactory(){
    return new CategoriesTreeDirective();
  }
}