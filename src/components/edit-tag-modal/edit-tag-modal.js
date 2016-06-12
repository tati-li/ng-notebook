'use strict';

export default class EditTagModalDirective {

  constructor() {
    this.restrict = 'A';
  }

  static directiveFactory(){
    return new EditTagModalDirective();
  }
}