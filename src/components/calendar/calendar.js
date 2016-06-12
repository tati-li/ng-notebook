'use strict';

export default class CalendarDirective {

  constructor() {

    this.restrict = 'AEC';
    this.templateUrl = 'components/calendar.html';

  }

  static directiveFactory() {
    return new CalendarDirective();
  }
}