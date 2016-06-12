'use strict';

var gulp       = require('gulp'),
    concat     = require('gulp-concat'),
    del        = require('del'),
    uglify     = require('gulp-uglify'),
    sass       = require('gulp-sass'),
    browserify = require("browserify"),
    rename     = require('gulp-rename'),
    source     = require('vinyl-source-stream'),
    buffer     = require('vinyl-buffer'),
    babelify   = require("babelify"),
    sourcemaps = require('gulp-sourcemaps'),
    minifyCss  = require('gulp-minify-css'),
    inject     = require('gulp-inject'),
    fs         = require('fs'),
    touch      = require('touch');

var paths = {
  src: {
    js: {
      app: [
        'src/app.js'
      ],
      files: [
        'src/**/*.js'
      ],
      libs: [
        'node_modules/angular/angular.min.js',
        'node_modules/angular-ui-router/release/angular-ui-router.min.js',
        'node_modules/angular-messages/angular-messages.min.js',
        'node_modules/angular-ui-bootstrap/ui-bootstrap.min.js',
        'node_modules/angular-ui-bootstrap/ui-bootstrap-tpls.min.js',
        'node_modules/ng-dialog/js/ngDialog.min.js',
        'node_modules/jquery/jquery.min.js',
        'node_modules/ng-popover/dest/angular-popover.min.js',
        'node_modules/lodash/lodash.min.js',
        'node_modules/moment/min/moment.min.js',
        'node_modules/tinymce/tinymce.min.js'
      ],
      tinymce: {
        core: 'node_modules/tinymce/**/*',
        langs: 'src/vendor/tinymce/langs/*.js'
      }
    },
    css: [
      'src/style.scss',
      'src/**/*.scss'
    ],
    img: [
      'src/img/**/*.{png,jpg,jpeg,gif,webp,svg,ico}',
    ],
    fonts: [
      'node_modules/bootstrap-sass/assets/fonts/bootstrap/*.eot',
      'node_modules/bootstrap-sass/assets/fonts/bootstrap/*.svg',
      'node_modules/bootstrap-sass/assets/fonts/bootstrap/*.ttf',
      'node_modules/bootstrap-sass/assets/fonts/bootstrap/*.woff',
      'node_modules/bootstrap-sass/assets/fonts/bootstrap/*.woff2'
    ],
    html: 'src/index.html',
    templates: [
      'src/**/*.html', '!src/index.html'
    ]
  },

  dest: {
    root:    'build',
    js:      'build',
    libs:    'build',
    tinymce: {
      core:    'build/tinymce',
      plugins: {
        path:       'build/tinymce/plugins',
        tinyvision: {
          source: 'build',
          url:    '/img'
        }
      },
      langs: 'build/tinymce/langs'
    },
    css:     'build',
    img:     'build/img',
    fonts:   'build/fonts',
    map:     './'
  }
};

del.sync(['./build']);

gulp.task('appScripts', function () {
  return  browserify(paths.src.js.app, { debug: true })
    .transform(babelify)
    .bundle()
    .pipe(source('build.js'))
    .pipe(buffer())
    .pipe(rename('app.js'))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.dest.js));
});

gulp.task('appLibs', function () {
  return gulp.src(paths.src.js.libs)
    .pipe(concat('libs.js'))
    .pipe(gulp.dest(paths.dest.libs));
});

gulp.task('appStyles', function () {
  gulp.src(paths.src.css)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(minifyCss())
    .pipe(sourcemaps.write(paths.dest.map))
    .pipe(gulp.dest(paths.dest.css));
});

gulp.task('appTinymce', ['appImg'], function () {
  gulp.src(paths.src.js.tinymce.core)
      .pipe(gulp.dest(paths.dest.tinymce.core));

  // i18n
  gulp.src(paths.src.js.tinymce.langs)
      .pipe(gulp.dest(paths.dest.tinymce.langs));

});

gulp.task('appImg', function () {
  gulp.src(paths.src.img)
      .pipe(gulp.dest(paths.dest.img));
});

gulp.task('appFonts', function () {
  gulp.src(paths.src.fonts)
      .pipe(gulp.dest(paths.dest.fonts));
});

gulp.task('appHtml', ['appScripts', 'appLibs', 'appStyles'], function () {
  return gulp.src(paths.src.html)
    .pipe(inject(gulp.src(paths.src.templates), {
      transform: function (filepath, file) {
        var path = file.relative.indexOf('\\') !== -1 ?
          file.relative.replace(/\\/g, '/') : file.relative;
        return '<script type="text/ng-template" id="' + path + '">' +
          file.contents.toString() + '</script>';
      }
    }))
    .pipe(gulp.dest(paths.dest.root));
});

gulp.task('watch', ['appScripts', 'appLibs', 'appImg', 'appStyles', 'appFonts', 'appHtml'], function () {
  gulp.watch(paths.src.js.files, ['appScripts']);
  gulp.watch(paths.src.css, ['appStyles', 'appImg']);
  gulp.watch(paths.src.html, ['appHtml', 'appImg']);
  gulp.watch(paths.src.templates, ['appHtml', 'appImg']);
  gulp.watch(paths.src.img, ['appImg', 'appStyles'])
});
gulp.task('default', [
  'appImg',
  'appScripts',
  'appLibs',
  'appTinymce',
  'appStyles',
  'appFonts',
  'appHtml',
  'watch'
]);