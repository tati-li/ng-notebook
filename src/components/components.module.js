/* global angular */
import TinymceModule           from './tinymce/tinymce';

import FilterModalCtrl         from './actions-buttons/filter-btn/filter-modal/FilterModalCtrl';
import CategoriesTreeCtrl      from './categories-tree/CategoriesTreeCtrl';
import EditTagModalCtrl        from './edit-tag-modal/EditTagModalCtrl';
import ExportModalCtrl         from './export-modal/ExportModalCtrl';

import ContentDirective           from './content/content';
import FilterModalDirective       from './actions-buttons/filter-btn/filter-modal/filter-modal.js';
import FilterBtnDirective         from './actions-buttons/filter-btn/filter-btn';
import ActionsButtonsDirective    from './actions-buttons/actions-buttons';
import CalendarDirective          from './calendar/calendar';
import CategoriesTreeDirective    from './categories-tree/categories-tree';
import EditTagModalDirective      from './edit-tag-modal/edit-tag-modal';
import ExportIconsDirective       from './export-icons/export-icons';
import ExportModalDirective       from './export-modal/export-modal';
import HeaderDirective            from './header/header';
import FooterDirective            from './footer/footer';
import SidebarDirective           from './sidebar/sidebar';
import TagsListTypeaheadDirective from './tags-list-typeahead/tags-list-typeahead';

let componentsModule = angular.module('ngNotebook:components', [
  TinymceModule
]);

componentsModule.directive('content',           ContentDirective.directiveFactory);
componentsModule.directive('filterModal',       FilterModalDirective.directiveFactory);
componentsModule.directive('filterBtn',         FilterBtnDirective.directiveFactory);
componentsModule.directive('actionsButtons',    ActionsButtonsDirective.directiveFactory);
componentsModule.directive('calendar',          CalendarDirective.directiveFactory);
componentsModule.directive('categoriesTree',    CategoriesTreeDirective.directiveFactory);
componentsModule.directive('editTagModal',      EditTagModalDirective.directiveFactory);
componentsModule.directive('exportIcons',       ExportIconsDirective.directiveFactory);
componentsModule.directive('exportModal',       ExportModalDirective.directiveFactory);
componentsModule.directive('header',            HeaderDirective.directiveFactory);
componentsModule.directive('footer',            FooterDirective.directiveFactory);
componentsModule.directive('sidebar',           SidebarDirective.directiveFactory);
componentsModule.directive('tagsListTypeahead', TagsListTypeaheadDirective.directiveFactory);

componentsModule.controller('FilterModalCtrl',    FilterModalCtrl);
componentsModule.controller('CategoriesTreeCtrl', CategoriesTreeCtrl);
componentsModule.controller('EditTagModalCtrl',   EditTagModalCtrl);
componentsModule.controller('ExportModalCtrl',    ExportModalCtrl);

export default componentsModule.name;