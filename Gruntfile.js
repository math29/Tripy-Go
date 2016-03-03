// Generated on 2015-08-21 using generator-angular-fullstack 2.1.1
'use strict';

module.exports = function (grunt) {
  var localConfig;
  try {
    localConfig = require('./server/config/local.env');
  } catch(e) {
    localConfig = {};
  }

  // Load grunt tasks automatically, when needed
  require('jit-grunt')(grunt, {
    express: 'grunt-express-server',
    useminPrepare: 'grunt-usemin',
    useminPrepareBack: 'grunt-usemin',
    useminBack: 'grunt-usemin',
    ngtemplates: 'grunt-angular-templates',
    ts: 'grunt-ts',
    cdnify: 'grunt-google-cdn',
    protractor: 'grunt-protractor-runner',
    buildcontrol: 'grunt-build-control'
  });

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({
    // Project settings
    pkg: grunt.file.readJSON('package.json'),
    yeoman: {
      // configurable paths
      client: require('./bower.json').appPath || 'client',
      front_office_A2: './frontOfficeA2/src',
      back_office: require('./back_office/bower.json').appPath || 'back_office',
      back_office_A2: './back_office_A2',
      dist: 'dist',
      public: 'dist/public',
      private: 'dist/back'
    },
    ts: {
      back_office: {
        tsconfig:"<%= yeoman.back_office_A2 %>/tsconfig.json"
      },
      front_office: {
        tsconfig:"<%= yeoman.front_office_A2 %>/tsconfig.json",
      }
    },
    express: {
      options: {
        port: process.env.PORT || 9000
      },
      dev: {
        options: {
          script: 'server/app.js',
          debug: true
        }
      },
      prod: {
        options: {
          script: 'dist/server/app.js'
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= express.options.port %>'
      }
    },
    watch: {
      bower: {
        files: ['bower.json', './back_office/bower.json'],
        tasks: ['wiredep']
      },
      front_office: {
        files: [
          '<%= yeoman.front_office_A2 %>/app/**/*.ts',
          // Front Office A2
          '<%= yeoman.front_office_A2 %>/app/**/*.html',
          '<%= yeoman.front_office_A2 %>/app/**/*.js',
          '<%= yeoman.front_office_A2 %>/app/**/*.css'
        ],
        tasks: ['front_office'],
        options: {
          livereload: true
        }
      },
      injectJS: {
        files: [
          '<%= yeoman.client %>/{app,components}/**/*.js',
          '!<%= yeoman.client %>/{app,components}/**/*.spec.js',
          '!<%= yeoman.client %>/{app,components}/**/*.mock.js',
          '!<%= yeoman.client %>/app/app.js'],
        tasks: ['injector:scripts']
      },
      injectCss: {
        files: [
          '<%= yeoman.client %>/{app,components}/**/*.css'
        ],
        tasks: ['injector:css']
      },
      mochaTest: {
        files: ['server/**/*.spec.js'],
        tasks: ['env:test', 'mochaTest']
      },
      jsTest: {
        files: [
          '<%= yeoman.client %>/{app,components}/**/*.spec.js',
          '<%= yeoman.client %>/{app,components}/**/*.mock.js'
        ],
        tasks: ['newer:jshint:all', 'karma']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      liveread: {
        files: [
          // front office
          '{.tmp,<%= yeoman.client %>}/{app,components}/**/*.css',
          '{.tmp,<%= yeoman.client %>}/{app,components}/**/*.html',

          '{.tmp,<%= yeoman.client %>}/{app,components}/**/*.js',

          '!{.tmp,<%= yeoman.client %>}{app,components}/**/*.spec.js',
          '!{.tmp,<%= yeoman.client %>}/{app,components}/**/*.mock.js',
          '<%= yeoman.client %>/assets/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}',

          // back office
          '<%= yeoman.back_office %>/app/**/*.css',
          '<%= yeoman.back_office %>/app/views/**/*.html',

          '<%= yeoman.back_office %>/app/scripts/**/*.js',
        ],
        options: {
          livereload: true
        }
      },
      express: {
        files: [
          'server/**/*.{js,json}'
        ],
        tasks: ['express:dev', 'apidoc', 'wait'],
        options: {
          livereload: true,
          nospawn: true //Without this option specified express won't be reloaded
        }
      }
    },
    apidoc:{
      myapp: {
        src: "server/api/",
        dest: "apidoc/",
        template: "node_modules/apidoc/template"
      },
      options: {
        livereload: true
      }
    },
    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '<%= yeoman.client %>/.jshintrc',
        reporter: require('jshint-stylish'),
      },
      server: {
        options: {
          jshintrc: 'server/.jshintrc'
        },
        src: [
          'server/**/*.js',
          '!server/**/*.spec.js'
        ]
      },
      serverTest: {
        options: {
          jshintrc: 'server/.jshintrc-spec'
        },
        src: ['server/**/*.spec.js']
      },
      all: [
        '<%= yeoman.client %>/{app,components}/**/*.js',
        '!<%= yeoman.client %>/{app,components}/**/*.spec.js',
        '!<%= yeoman.client %>/{app,components}/**/*.mock.js',
        '<%= yeoman.back_office %>/app/scripts/**/*.js'
      ],
      test: {
        src: [
          '<%= yeoman.client %>/{app,components}/**/*.spec.js',
          '<%= yeoman.client %>/{app,components}/**/*.mock.js'
        ]
      },
      jenkins: {
        options: {
            jshintrc: 'server/.jshintrc',
            reporter: 'checkstyle',
            reporterOutput: 'report/jshint.xml',
        },
        src: [ 'server/**/*.js',
                '!server/**/*.spec.js'
               ]
    }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*',
            '!<%= yeoman.dist %>/.openshift',
            '!<%= yeoman.dist %>/Procfile'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/',
          src: '{,*/}*.css',
          dest: '.tmp/'
        },
        {
          expand: true,
          cwd: './tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Debugging with node inspector
    'node-inspector': {
      custom: {
        options: {
          'web-host': 'localhost'
        }
      }
    },

    // Use nodemon to run server in debug mode with an initial breakpoint
    nodemon: {
      debug: {
        script: 'server/app.js',
        options: {
          nodeArgs: ['--debug-brk'],
          env: {
            PORT: process.env.PORT || 9000
          },
          callback: function (nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });

            // opens browser on initial server start
            nodemon.on('config:update', function () {
              setTimeout(function () {
                require('open')('http://localhost:8080/debug?port=5858');
              }, 500);
            });
          }
        }
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      target: {
        src: '<%= yeoman.client %>/index.html',
        ignorePath: '<%= yeoman.client %>/',
        exclude: [/bootstrap-sass-official/, /bootstrap.js/, '/json3/', '/es5-shim/']
      }/*,
      back_office: {
        src: '<%= yeoman.back_office %>/app/index.html',
        ignorePath: '<%= yeoman.back_office %>/app/'
      }*/
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.public %>/{,*/}*.js',
            '<%= yeoman.public %>/{,*/}*.css',
            '<%= yeoman.public %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.public %>/assets/fonts/*',

            //'<%= yeoman.private %>/{,*/}*.js',
            //'<%= yeoman.private %>/{,*/}*.css',
            //'<%= yeoman.private %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            //'<%= yeoman.private %>/assets/fonts/*'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
        html: ['<%= yeoman.client %>/index.html'],
        options:{
          dest: '<%= yeoman.public %>'
        }
      },
    useminPrepareBack: {
      html: '<%= yeoman.back_office %>/app/index.html',
      options: {
        staging: '.tmpBack',
        dest: '<%= yeoman.private %>'
      }

    },
    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/public/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/public/{,*/}*.css'],
      js: ['<%= yeoman.dist %>/public/{,*/}*.js'],
      options: {
        assetsDirs: [
          '<%= yeoman.dist %>/public',
          '<%= yeoman.dist %>/public/assets/images'
        ],
        // This is so we update image references in our ng-templates
        patterns: {
          js: [
            [/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
          ]
        }
      }
    },
    // Performs rewrites based on rev and the useminPrepare configuration
    useminBack: {
      html: ['<%= yeoman.private %>/{,*/}*.html'],
      css: ['<%= yeoman.private %>/{,*/}*.css'],
      js: ['<%= yeoman.private %>/{,*/}*.js$', '!<%= yeoman.private %>/bower_components/*'],
      options: {
        assetsDirs: [
          '<%= yeoman.private %>',
          '<%= yeoman.private %>/assets/images'
        ],
        // This is so we update image references in our ng-templates
        patterns: {
          js: [
            [/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
          ]
        }
      }
    },
    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.client %>/assets/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/public/assets/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.client %>/assets/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/public/assets/images'
        }]
      }
    },

    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat',
          src: '**/*.js',
          dest: '.tmp/concat'
        }]
      }
    },

    // Package all the html partials into a single javascript payload
    ngtemplates: {
      options: {
        // This should be the name of your apps angular module
        module: 'wtcApp',
        htmlmin: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        },
        usemin: 'app/app.js'
      },
      main: {
        cwd: '<%= yeoman.client %>',
        src: ['{app,components}/**/*.html'],
        dest: '.tmp/templates.js'
      },
      tmp: {
        cwd: '.tmp',
        src: ['{app,components}/**/*.html'],
        dest: '.tmp/tmp-templates.js'
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/public/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.client %>',
          dest: '<%= yeoman.public %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'bower_components/**/*',
            'assets/**/*',
            'index.html'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.public %>/assets/images',
          src: ['generated/*']
        }, {
          expand: true,
          dest: '<%= yeoman.dist %>',
          src: [
            'package.json',
            'server/**/*'
          ]
        },
        {
          expand: true,
          dot: true,
          cwd: '<%= yeoman.back_office %>/app',
          dest: '<%= yeoman.private %>',
          src: [
'**/*'          ]
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.client %>',
        dest: '.tmp/',
        src: ['{app,components}/**/*.css']
      },
      back_office: {
        expand: true,
        dest: './back_office_A2/app/lib',
        cwd: 'node_modules',
        src: [
          'angular2/bundles/**/*',
          'reflect-metadata/Reflect.js',
          'systemjs/**/*',
          'rxjs/**/*',
          'ng2-cookies/**/*',
          'ng2-charts/**/*',
          'marked/**/*'
        ]
      },
      back_office_compiled: {
        expand: true,
        dest: './back_office_A2/app/scripts_js',
        cwd: './back_office_A2/app/scripts_js',
        src: [
          'back_office_A2/app/scripts/**/*'
        ]
      },
      back_office_inner: {
        expand: true,
        dest: './back_office_A2/app/scripts_js',
        cwd: './back_office_A2/app/scripts_js/back_office_A2/app/scripts',
        src: [
         '**/*'
         ]
      },
      // FRONT OFFICE A2
      front_office_base:{
        expand: true,
        dest: './frontOfficeA2/dist',
        cwd: './frontOfficeA2/src',
        src: [
          // '*',
          '**/*'
        ]
      },
      front_office_vendor: {
        expand: true,
        dest: './frontOfficeA2/dist/vendor',
        cwd: './client/bower_components',
        src: [
          'jquery/**/*',
          'bootstrap/**/**/*',
          'font-awesome/**/*'
        ]
      },
      front_office_lib: {
        expand: true,
        dest: './frontOfficeA2/dist/lib',
        cwd: './node_modules',
        src: [
          'angular2/bundles/**/*',
          'reflect-metadata/Reflect.js',
          'systemjs/**/*',
          'rxjs/**/*',
          'angular2-jwt/*'
        ]
      },
      // TRIPY-GO LIBRAIRIES GLOBALES
      tripy_go_lib: {
        expand: true,
        dest: '<%= yeoman.front_office_A2 %>/app/tripy_go_lib',
        cwd: './tripyGo_Libs',
        src: [
          '**/*.ts'
        ]
      }
    },

    buildcontrol: {
      options: {
        dir: 'dist',
        commit: true,
        push: true,
        connectCommits: false,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      heroku: {
        options: {
          remote: 'heroku',
          branch: 'master'
        }
      },
      openshift: {
        options: {
          remote: 'openshift',
          branch: 'master'
        }
      }
    },
    // create logs dir
    mkdir: {
      log:{
        options: {
          mode: '0700',
          create: ['logs']
        }
      }
    },
    // create log file
    touch: {
      src: ['logs/all-logs.log']
    },
    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
      ],
      test: [
      ],
      debug: {
        tasks: [
          'nodemon',
          'node-inspector'
        ],
        options: {
          logConcurrentOutput: true
        }
      },
      dist: [
        /*'imagemin',
        'svgmin'*/
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['server/**/*.spec.js']
      },
      jenkins: {
        options: {
          reporter: 'xunit',
          require: 'should',
          captureFile: './report/TESTxunit.xml',
          quiet: false,
          clearRequireCache: false
        },
        src: ['server/**/*.spec.js']
      }
    },

    protractor: {
      options: {
        configFile: 'protractor.conf.js'
      },
      chrome: {
        options: {
          args: {
            browser: 'chrome'
          }
        }
      }
    },

    env: {
      test: {
        NODE_ENV: 'test'
      },
      prod: {
        NODE_ENV: 'production'
      },
      all: localConfig
    },

    injector: {
      options: {

      },
      // Inject application script files into index.html (doesn't include bower)
      scripts: {
        options: {
          transform: function(filePath) {
            filePath = filePath.replace('/client/', '');
            filePath = filePath.replace('/.tmp/', '');
            return '<script src="' + filePath + '"></script>';
          },
          starttag: '<!-- injector:js -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
          '<%= yeoman.client %>/index.html': [
               [

                 '{.tmp,<%= yeoman.client %>}/{app,components}/**/*.js',

                 '!{.tmp,<%= yeoman.client %>}/app/app.js',
                 '!{.tmp,<%= yeoman.client %>}/{app,components}/**/*.spec.js',
                 '!{.tmp,<%= yeoman.client %>}/{app,components}/**/*.mock.js'
               ]
            ]
        }
      },

      // Inject component css into index.html
      css: {
        options: {
          transform: function(filePath) {
            filePath = filePath.replace('/client/', '');
            filePath = filePath.replace('/.tmp/', '');
            return '<link rel="stylesheet" href="' + filePath + '">';
          },
          starttag: '<!-- injector:css -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
          '<%= yeoman.client %>/index.html': [
            '<%= yeoman.client %>/{app,components}/**/*.css'
          ]
        }
      }
    },
  });

  // Used for delaying livereload until after server has restarted
  grunt.registerTask('wait', function () {
    grunt.log.ok('Waiting for server reload...');

    var done = this.async();

    setTimeout(function () {
      grunt.log.writeln('Done waiting!');
      done();
    }, 1500);
  });

  grunt.registerTask('express-keepalive', 'Keep grunt running', function() {
    this.async();
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'env:all', 'env:prod', 'express:prod', 'wait',  'express-keepalive']);
    }

    if (target === 'debug') {
      return grunt.task.run([
        'clean:server',
        'env:all',
        'concurrent:server',
        'injector',
        'wiredep',
        'autoprefixer',
        'concurrent:debug',
        'apidoc'
      ]);
    }

    grunt.task.run([
      'clean:server',
      'env:all',
      'concurrent:server',
      'front_office',
      'injector',
      'wiredep',
      'autoprefixer',
      'express:dev',
      'apidoc',
      'wait',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('test', function(target) {
    if (target === 'server') {
      return grunt.task.run([
        'env:all',
        'env:test',
        'mochaTest',
      ]);
    }
    else if(target === 'jenkins'){
      return grunt.task.run([
        'env:all',
        'env:test',
        'mochaTest:jenkins'
        ])
    }
    else if (target === 'client') {
      return grunt.task.run([
        'clean:server',
        'env:all',
        'concurrent:test',
        'injector',
        'autoprefixer',
        'karma'
      ]);
    }

    else if (target === 'e2e') {
      return grunt.task.run([
        'clean:server',
        'env:all',
        'env:test',
        'concurrent:test',
        'injector',
        'wiredep',
        'autoprefixer',
        'express:dev',
        'protractor'
      ]);
    }

    else grunt.task.run([
      'test:server',
      'test:client'
    ]);
  });

  grunt.registerTask('useminPrepareBack', function () {
      var useminPrepareBackConfig = grunt.config('useminPrepareBack');
      grunt.config.set('useminPrepare', useminPrepareBackConfig);
      grunt.task.run('useminPrepare');
    });

    grunt.registerTask('useminBack', function () {
      var useminBackConfig = grunt.config('useminBack');
      grunt.config.set('usemin', useminBackConfig);
      grunt.task.run('usemin');
    });

  grunt.registerTask('back_office', [
    'copy:back_office',
    'ts',
    'copy:back_office_compiled',
    'copy:back_office_inner'
  ]);

  grunt.registerTask('front_office', [
    'copy:tripy_go_lib',
    'copy:front_office_base',
    'copy:front_office_lib',
    'copy:front_office_vendor',
    'ts:front_office'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'concurrent:dist',
    'injector',
    'wiredep',
    'useminPrepare',
    'ts',
    'copy:back_office',
    //'useminPrepareBack',
    'autoprefixer',
    'ngtemplates',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    'rev',
    'usemin',
    'mkdir',
    'touch'
    //'useminBack'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build',
    'serve:dist'
  ]);
};
