// Karma configuration
// Generated on Wed Jun 04 2014 13:13:16 GMT+0300 (IDT)

module.exports = function (config) {
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: 'test',


        // frameworks to use
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            '../public/bower_components/angular/angular.js',
            '../public/bower_components/angular-mocks/angular-mocks.js',
            '../public/bower_components/angular-resource/angular-resource.js',
            '../public/bower_components/angular-route/angular-route.js',
            '../public/javascripts/*.js',
            '../public/javascripts/**/*.js',
            'client',
            'client/*Spec.js'
        ],


        // list of files to exclude
        exclude: [

        ],


        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera (has to be installed with `npm install karma-opera-launcher`)
        // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
        // - PhantomJS
        // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
        browsers: ['Firefox'],


        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true,

        plugins: ['karma-jasmine','karma-chrome-launcher','karma-firefox-launcher']
    });
};
