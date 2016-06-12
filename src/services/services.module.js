import Article  from './Article';
import Category from './Category';
import Tag      from './Tag';
import User     from './User';

let servicesModule = angular.module('ngNotebook:service', []);

servicesModule.service('User', User);
servicesModule.service('Article', Article);
servicesModule.service('Category', Category);
servicesModule.service('Tag', Tag);

export default servicesModule.name;