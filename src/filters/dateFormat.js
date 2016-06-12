"use strict";

export default class DateFormatFilter {

    /**
     *
     * @returns {Function}
     */
    constructor() {
        return (input, format) => {
            return moment(input).format(format);
        };
    }

    /**
     *
     * @returns {DateFormatFilter}
     */
    static filterFactory() {
        return new DateFormatFilter();
    }
}