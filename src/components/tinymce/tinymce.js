/* global angular,tinymce */

/**
 * Binds a TinyMCE widget to <textarea> elements.
 */

let TinymceModule = angular.module('ui.tinymce', [])
    .value('uiTinymceConfig', {})
    .directive('uiTinymce', ['uiTinymceConfig', '$timeout', function(uiTinymceConfig, $timeout) {
      uiTinymceConfig = uiTinymceConfig || {};
      var generatedIds = 0;
      return {
        require: 'ngModel',
        scope:   {
          onUpload: '&'
        },
        link:    function (scope, elm, attrs, ngModel) {

          init();

          function init() {
            "use strict";
            var expression, options, tinyInstance;
            // generate an ID if not present
            if (!attrs.id) {
              attrs.$set('id', 'uiTinymce' + generatedIds++);
            }

            tinymce.baseURL = '/tinymce';

            options = {
              // Update model when calling setContent (such as from the source editor popup)
              setup: function (ed) {
                ed.on('init', function (args) {
                  ngModel.$render();
                });
                // Update model on button click
                ed.on('ExecCommand', function (e) {
                  ed.save();
                  ngModel.$setViewValue(elm.val());
                  if (!scope.$$phase) {
                    scope.$apply();
                  }
                });
                // Update model on keypress
                ed.on('KeyUp', function (e) {
                  //console.log(ed.isDirty());
                  ed.save();
                  ngModel.$setViewValue(elm.val());
                  if (!scope.$$phase) {
                    scope.$apply();
                  }
                });
                // Update model on keypress
                ed.on('change', function (e) {
                  ed.save();
                  ngModel.$setViewValue(elm.val());
                  if (!scope.$$phase) {
                    scope.$apply();
                  }
                });
              },
              language : 'en',
              height:   500,
              plugins: [
                "advlist autolink link image lists charmap print preview hr anchor pagebreak",
                "searchreplace wordcount visualblocks visualchars insertdatetime media code nonbreaking",
                "table contextmenu directionality emoticons paste textcolor"
              ],
              toolbar1: "undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | styleselect | fontselect, fontsizeselect",
              toolbar2: "| responsivefilemanager | link unlink anchor | image media | forecolor backcolor  | print preview code ",
              image_advtab: true ,
              theme_url: '/tinymce/themes/modern/theme.min.js',
              skin_url:  '/tinymce/skins/lightgray',
              relative_urls : false,
              remove_script_host : false,
              convert_urls : true,
              extended_valid_elements : "span[class|src|border=0|alt|title|align|onmouseover|onmouseout|name|font[face|size|color|style]]",
              theme_advanced_fonts :  "Andale Mono=andale mono,times;"+
                     "Arial=arial,helvetica,sans-serif;"+
                     "Arial Black=arial black,avant garde;"+
                     "Book Antiqua=book antiqua,palatino;"+
                     "Comic Sans MS=comic sans ms,sans-serif;"+
                     "Courier New=courier new,courier;"+
                     "Century Gothic=century_gothic;"+
                     "Georgia=georgia,palatino;"+
                     "Gill Sans MT=gill_sans_mt;"+
                     "Gill Sans MT Bold=gill_sans_mt_bold;"+
                     "Gill Sans MT BoldItalic=gill_sans_mt_bold_italic;"+
                     "Gill Sans MT Italic=gill_sans_mt_italic;"+
                     "Helvetica=helvetica;"+
                     "Impact=impact,chicago;"+
                     "Iskola Pota=iskoola_pota;"+
                     "Iskola Pota Bold=iskoola_pota_bold;"+
                     "Symbol=symbol;"+
                     "Tahoma=tahoma,arial,helvetica,sans-serif;"+
                     "Terminal=terminal,monaco;"+
                     "Times New Roman=times new roman,times;"+
                     "Trebuchet MS=trebuchet ms,geneva;"+
                     "Verdana=verdana,geneva;"+
                     "Webdings=webdings;"+
              "Wingdings=wingdings,zapf dingbats"

              ,
              mode: 'exact',
              elements: attrs.id
            };

            if (attrs.uiTinymce) {
              expression = scope.$eval(attrs.uiTinymce);
            } else {
              expression = {};
            }

            angular.extend(options, uiTinymceConfig, expression);

            $timeout(function () {
              tinymce.remove();
              tinymce.init(options);
            }, 0);

            ngModel.$render = function () {
              tinyInstance = tinymce.get(attrs.id);
              if (tinyInstance) {
                tinyInstance.setContent(ngModel.$viewValue || '');
              }
            };

          }

        }
      };

    }
]);

export default TinymceModule.name;