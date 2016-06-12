'use strict';

export default class FooterDirective {

  constructor() {
    this.restrict = 'E';
    this.templateUrl = 'components/footer/footer.html';
  }

  static directiveFactory(){
    return new FooterDirective();
  }

}