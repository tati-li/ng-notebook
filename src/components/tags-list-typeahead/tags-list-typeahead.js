'use strict';

class TagsListTypeaheadDirective {

  constructor($rootScope, Tag, $filter, $modal, $state) {

    TagsListTypeaheadDirective.$rootScope = $rootScope;
    TagsListTypeaheadDirective.Tag        = Tag;
    TagsListTypeaheadDirective.$filter    = $filter;
    TagsListTypeaheadDirective.$modal     = $modal;
    TagsListTypeaheadDirective.$state     = $state;

    this.restrict = 'E';

    this.scope = {
      selectedTags: '=',
      manageable: '@?',
      redirectOnSelect: '@?'
    };
    this.templateUrl = 'components/tags-list-typeahead/tags-list-typeahead.html';
  }

  link(scope, element, attrs) {

    scope.isListDisplayed = false;
    scope.hoveredTagIndex = -1;
    scope.hoveredTag      = null;
    scope.filteredTags    = [];
    scope.isNewTag        = false;

    TagsListTypeaheadDirective.Tag.getAll().then( tags => {
      scope.tagsList     = tags;
      scope.filteredTags = TagsListTypeaheadDirective.$filter('orderBy')(angular.copy(scope.tagsList));
    });

    // hide tags list if the click was outside the input or tags list itself
    angular.element(document).on('click', event => {

      if ( !angular.element(event.target).hasClass('tags-selection-control') ) {
        scope.$apply(() => {
          scope.isListDisplayed = false;
          // resetting hovered tag data
          scope.hoveredTagIndex = -1;
          scope.hoveredTag      = null;
        });
      }

    });


    /**
     *
     * @param tag
     */
    scope.deleteTag = tag =>{

      scope.selectedTags.splice(scope.selectedTags.indexOf(tag), 1);
      scope.filteredTags.push(tag);
      filterBySelectedTag();

    };

    /**
     *
     * @returns {*|Array|null|Cursor|Observable<T>}
     */
    scope.getNotSelected = () =>{

      scope.filteredTags = TagsListTypeaheadDirective.$filter('orderBy')(
        scope.filteredTags
          .filter( tag =>{
            return scope.selectedTags ? scope.selectedTags.indexOf(tag) === -1 : true;
          })
          .filter( tag => {
            return scope.typedTag ? tag.indexOf(scope.typedTag) !== -1 : true;
          })
      );
      scope.isListEmpty = !scope.filteredTags.length;
      return scope.filteredTags;
    };

    /**
     *
     */
    function filterBySelectedTag () {
      if(scope.redirectOnSelect) {
        scope.selectedTags.length ?
          TagsListTypeaheadDirective.$state.go('articles-filtered', {by: 'tags', cond: scope.selectedTags.join(',')}) :
          TagsListTypeaheadDirective.$state.go('site-root');
      }
    }

    /**
     *
     * @param tag
     */
    scope.addTag = tag => {

      scope.selectedTags.push(tag);
      scope.hoveredTagIndex = -1;
      scope.hoveredTag      = null;
      //scope.isListDisplayed = scope.filteredTags.length;
      scope.filteredTags = angular.copy(scope.tagsList);
      filterBySelectedTag();

    };


    /**
     *
     * @param key
     */
    scope.onKeyUpFn = key => {

      // UP
      if (key == 38) {
        if (scope.hoveredTagIndex <= 0) {
          scope.hoveredTagIndex = scope.filteredTags.length - 1;

        }
        else {
          scope.hoveredTagIndex -= 1;
        }

        scope.hoveredTag = scope.filteredTags[scope.hoveredTagIndex];
      }
      // DOWN
      else if (key == 40) {
        if (scope.hoveredTagIndex >= scope.filteredTags.length - 1) {
          scope.hoveredTagIndex = 0;

        }
        else {
          scope.hoveredTagIndex += 1;
        }

        scope.hoveredTag = scope.filteredTags[scope.hoveredTagIndex];
      }
      // ENTER
      else if (key == 13 && scope.hoveredTag) {
        console.log(scope.typedTag);
        scope.addTag(scope.hoveredTag);
      }
      else {
        scope.isNewTag = scope.typedTag && scope.tagsList.indexOf(scope.typedTag) == -1;
        scope.filteredTags = angular.copy(scope.tagsList);

      }

    };

    var modalInstance = null;
    /**
     *
     * @param tag
     */
    scope.editTag = tag => {

      modalInstance = TagsListTypeaheadDirective.$modal.open({
        templateUrl: 'components/edit-tag-modal/edit-tag-modal.html',
        controller:  'EditTagModalCtrl as editTagModalCtrl',

        resolve:     {
          tag:  () => tag,
          tags: () => scope.tagsList
        }
      });

      modalInstance.result.then( result => {

        console.log(result);

        if (result) {
          scope.tagsList.some( (item, i) => {
            if(item == tag) {
              scope.tagsList[i] = result;
              return false;
            }
          });

          scope.filteredTags = angular.copy(scope.tagsList);
          console.log(scope.filteredTags);

        }
      }, () => {

      });

    };

    /**
     *
     * @constructor
     */
    scope.CreateTag = () => {

      if (scope.TagInputForm.$valid) {
        if(scope.isNewTag) {
          TagsListTypeaheadDirective.Tag.createTag(scope.typedTag).then(
            (data) => {
              scope.tagsList.push(data.name);
              scope.selectedTags.push(data.name);
              scope.filteredTags = angular.copy(scope.tagsList);
              scope.isNewTag = false;
            },
            (e) => {
              console.log(e);
            }
          );
        } else {
          scope.selectedTags.push(scope.typedTag);
        }

        scope.typedTag = '';

      }
    };

    /**
     *
     * @param name
     */
    scope.removeTag = (name) => {
      var answer = confirm('Are you sure?');
      if(answer) {
        TagsListTypeaheadDirective.Tag.deleteTag(name).then(
          () => {
            scope.tagsList.splice(
              scope.tagsList.indexOf(name), 1
            );
            scope.filteredTags = angular.copy(scope.tagsList);
            console.log(scope.tagsList);

            TagsListTypeaheadDirective.$rootScope.$broadcast('tagNameWasDeleted', {
              name: name
            });
          }
        );
      }
    }

  }

  static directiveFactory($rootScope, Tag, $filter, $modal, $state){
    return new TagsListTypeaheadDirective(...arguments);
  }
}

TagsListTypeaheadDirective.directiveFactory.$inject = [
  '$rootScope',
  'Tag',
  '$filter',
  '$modal',
  '$state'
];

export default TagsListTypeaheadDirective;