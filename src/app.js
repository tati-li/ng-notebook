'use strict';
import LoginModule      from './pages/login/login.module';
import ServicesModule   from './services/services.module';
import ComponentsModule from './components/components.module';
import FiltersModule    from './filters/filters.module';
import PagesModule      from './pages/pages.module';

var ngNotebook = angular.module('ngNotebook', [
  'ui.router',
  'ngMessages',
  'ngDialog',
  'ui.bootstrap',
  'angular-popover',
  LoginModule,
  ServicesModule,
  ComponentsModule,
  FiltersModule,
  PagesModule
]);

ngNotebook.config(['$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $locationProvider) {
  $locationProvider.html5Mode({
      enabled:     true,
      requireBase: false
    });

  //function valToString(val)   { return val != null ? val.toString() : val; }
  //function valFromString(val) { return val != null ? val.toString() : val; }
  //function regexpMatches(val) { return this.pattern.test(val);             }
  //$urlMatcherFactoryProvider.type("nonEncodedURI", {
  //  encode:  valToString,
  //  decode:  valFromString,
  //  is:      regexpMatches,
  //  pattern: /[a-zA-Z0-9\/.%-]*/
  //});

  // Now set up the states
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'pages/login/login.html',
      controller: 'LoginCtrl as loginCtrl',
      isLoggedIn: false
    })
    .state('articles-paged', {
      url: '/articles',
      templateUrl: 'pages/articles/articles.html',
      controller: 'ArticlesCtrl as articlesCtrl',
      isLoggedIn: true
    })
    .state('articles-filtered', {
      url: '/articles/:by/:cond',
      templateUrl: 'pages/articles/articles.html',
      controller: 'ArticlesCtrl as articlesCtrl',
      isLoggedIn: true
    })

    .state('site-root', {
      url: '/',
      templateUrl: 'pages/articles/articles.html',
      controller: 'ArticlesCtrl as articlesCtrl',
      isLoggedIn: true

    })

    .state('create-article-page', {
      url: '/article/create',
      templateUrl: 'pages/create/create.html',
      controller: 'NewArticleCtrl as newArticleCtrl',
      isLoggedIn: true
    })
    .state('single-article-page', {
      url: '/article/:id',
      templateUrl: 'pages/article/article.html',
      controller: 'ArticleCtrl as articleCtrl',
      isLoggedIn: true
    });


  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise('/');

}]);

ngNotebook.run([ '$rootScope', '$state', 'User', function($rootScope, $state, User) {

  User.authorize();

  $rootScope.$on('$stateChangeSuccess',
    function(event, toState, toParams, fromState, fromParams){

      if(toState.isLoggedIn && !User.currentUser) {
        return $state.go('login');
      }

      if(!toState.isLoggedIn && User.currentUser) {
        $state.go('site-root');
      }

    }
  );

}]);

