// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      // paths loaded by Karma
      {pattern: 'node_modules/angular2/bundles/angular2-polyfills.js', included: true, watched: true},
      {pattern: 'node_modules/systemjs/dist/system.src.js', included: true, watched: true},
      {pattern: 'node_modules/rxjs/bundles/Rx.js', included: true, watched: true},
      {pattern: 'node_modules/angular2/bundles/angular2.dev.js', included: true, watched: true},
      {pattern: 'node_modules/angular2/bundles/testing.dev.js', included: true, watched: true},
      {pattern: 'karma-test-shim.js', included: true, watched: true},

      // paths loaded via module imports
      {pattern: 'frontOfficeA2/dist/**/*.js', included: false, watched: true},

      // paths to support debugging with source maps in dev tools
      {pattern: 'frontOfficeA2/src/**/*.ts', included: false, watched: false},
      {pattern: 'frontOfficeA2/dist/**/*.js.map', included: false, watched: false}
    ],

    // proxied base paths
    proxies: {
        // required for component assests fetched by Angular's compiler
        '/src/': '/base/src/'
    },

    port: 9876,

    logLevel: config.LOG_INFO,

    colors: true,

    autoWatch: true,

    browsers: ['Chrome'],

    // Karma plugins loaded
    plugins: [
        'karma-jasmine',
        'karma-coverage',
        'karma-chrome-launcher'
    ],

    // Coverage reporter generates the coverage
    reporters: ['progress', 'dots', 'coverage'],

    // Source files that you wanna generate coverage for.
    // Do not include tests or libraries (these files will be instrumented by Istanbul)
    preprocessors: {
        'frontOfficeA2/dist/**/!(*spec).js': ['coverage']
    },

    coverageReporter: {
        reporters:[
            {type: 'json', subdir: '.', file: 'coverage-final.json'}
        ]
    },

    singleRun: true
  });
};
