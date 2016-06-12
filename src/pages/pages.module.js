"use strict";

import ArticleCtrl    from './article/ArticleCtrl';
import EditCtrl       from './article/EditCtrl';
import ArticlesCtrl   from './articles/ArticlesCtrl';
import NewArticleCtrl from './create/NewArticleCtrl';

let pagesModule = angular.module('ngNotebook:pages', []);

pagesModule.controller('ArticleCtrl',    ArticleCtrl);
pagesModule.controller('EditCtrl',       EditCtrl);
pagesModule.controller('ArticlesCtrl',   ArticlesCtrl);
pagesModule.controller('NewArticleCtrl', NewArticleCtrl);

export default pagesModule.name;
