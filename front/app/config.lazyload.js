// lazyload config

angular.module('app')

  // oclazyload config
  .config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
    // We configure ocLazyLoad to use the lib script.js as the async loader
    $ocLazyLoadProvider.config({
      debug: false,
      events: true,
      modules: [
        {
          name: 'ngFileUpload',
          files: [
            'vendor/lazy/ng-file-upload/ng-file-upload.min.js'
          ]
        },
        {
          name: 'ngImgCrop',
          files: [
            'vendor/lazy/ng-img-crop/ng-img-crop.js',
            'vendor/lazy/ng-img-crop/ng-img-crop.css'
          ]
        },
        {
          name: 'xeditable',
          files: [
            'vendor/lazy/angular-xeditable/xeditable.min.js',
            'vendor/lazy/angular-xeditable/xeditable.css'
          ]
        },
        {
          name: 'btford.markdown',
          files: [
            'vendor/lazy/showdown/showdown.js',
            'vendor/lazy/showdown/ng-showdown.js',
            'vendor/lazy/angular-markdown-directive/markdown.js'
          ]
        },
        {
          name: 'dndLists',
          files: [
            'vendor/lazy/angular-drag-and-drop-lists/angular-drag-and-drop-lists.min.js'
          ]
        },
        {
          name: 'chart.js',
          serie: true,
          files: [
            'vendor/lazy/chartjs/Chart.min.js',
            'vendor/lazy/angular-chart/angular-chart.css',
            'vendor/lazy/angular-chart/angular-chart.min.js'
          ]
        },
        {
          name: 'codertyExport',
          files: [
            'vendor/lazy/coderty-export-alasql/alasql.min.js',
            'vendor/lazy/coderty-export-alasql/xlsx.core.min.js',
            'vendor/lazy/coderty-export-alasql/coderty-export.js'
          ]
        }
      ]
    });
  }])
  ;