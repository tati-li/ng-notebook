'use strict';

export default class ExportModalDirective {
  
  constructor(){
    this.restrict ='A';
  }

  static directiveFactory(){
    return new ExportModalDirection();
  }

}