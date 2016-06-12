import DateFormatFilter from './dateFormat';

let filtersModule = angular.module('ngNotebook:filters', []);

filtersModule.filter('dateFormat', DateFormatFilter.filterFactory);

export default filtersModule.name;