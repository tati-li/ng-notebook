'use strict';

export default class FilterModalDirective {

  constructor() {

    this.restrict = 'A';

  }

  static directiveFactory() {
    return new FilterModalDirective();
  }
}