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
    concat: 'grunt-contrib-concat',
    cdnify: 'grunt-google-cdn',
    protractor: 'grunt-protractor-runner',
    buildcontrol: 'grunt-build-control',
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
      front_office_dist: './frontOfficeA2/dist',
      back_office: 'back_office/src',
      back_office_dist: 'back_office/dist',
      lib:'tripyGo_Libs',
      dist: 'dist',
      public: 'dist/public',
      private: 'dist/back',
      back_office_libs: [
        '@angular/**/*',
        'reflect-metadata/**/*',
        'systemjs/dist/**/*',
        'rxjs/**/*',
        'ng2-bootstrap/**/*',
        'ng2-charts/**/*',
        'ng2-file-upload/**/*',
        'bootstrap/dist/**/*',
        'json3/lib/json3.min.js',
        'font-awesome/**/*.min.*',
        'chart.js/Chart.min.js',
        'socket.io-client/socket.io.js',
        'angular2-jwt/angular2-jwt.js*',
        'd3/d3.min.js',
        'marked/marked.min.js',
        'lodash/lodash.min.js',
        'jquery/dist/jquery.min.js',
        'jquery-ui-bundle/**/*',
        'tinymce/**/*',
        'font-awesome/**/*',
        'datamaps/dist/**/*',
        'to-markdown/dist/**/*',
        'moment/min/**/*',
        'reflect-metadata/**/*',
        'push.js/push.min.js'
      ],
      back_office_css: [
        'bower_components/metisMenu/dist/metisMenu.min.css',
        '<%= yeoman.back_office %>/app/styles/sb-admin-2.css',
        '<%= yeoman.back_office %>/app/styles/timeline.css',
        '<%= yeoman.back_office %>/app/styles/main.css',
        'node_modules/jquery-ui-bundle/jquery-ui.min.css'
      ],
      front_office_css: [
        '<%= yeoman.front_office_A2 %>/assets/css/animate.min.css',
        '<%= yeoman.front_office_A2 %>/assets/css/bootstrap-select.min.css',
        '<%= yeoman.front_office_A2 %>/assets/css/owl.carousel.css',
        '<%= yeoman.front_office_A2 %>/assets/css/owl-carousel-theme.css',
        '<%= yeoman.front_office_A2 %>/assets/css/flexslider.css',
        '<%= yeoman.front_office_A2 %>/assets/css/style.css',
        '<%= yeoman.front_office_A2 %>/assets/css/light.css'
      ]
    },
    ts: {
      options:{
        target: 'es5',
        module: 'system',
        moduleResolution: 'node',
        sourceMap: true,
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
        removeComments: false,
        noImplicitAny: false,
        suppressImplicitAnyIndexErrors: true,
        reference: './typings/tsd.d.ts'
      },
	     back_office:{
		       tsconfig:"<%= yeoman.back_office %>/tsconfig.json"
	    },
      front_office: {
        tsconfig:"<%= yeoman.front_office_A2 %>/tsconfig.json",
      }
    },
    concat: {
      options: {
        separator: '\n',
        sourceMap: false,
        process: function(src, filepath) {
         return '/* Source: ' + filepath + '*/\n' +
           src.replace(/\/\*\#.*\*\//g, '');
       }
      },
      back_css: {
        src: '<%= yeoman.back_office_css %>',
        dest: '<%= yeoman.back_office_dist %>/styles/built.css',
      },
      front_css: {
        src: '<%= yeoman.front_office_css %>',
        dest: '<%= yeoman.front_office_dist %>/assets/css/built.css'
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
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      front_office: {
        files: [
          '<%= yeoman.front_office_A2 %>/app/**/*.ts',
          '<%= yeoman.front_office_A2 %>/*.html',
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
      tripyGoLib: {
        files: [
          './tripyGo_Libs/**/*'
        ],
        tasks: ['front_office', 'back_office'],
        options: {
          livereload: true
        }
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
      back_office: {
        files: ['<%= yeoman.back_office %>/app/scripts/**/*.ts'],
        tasks: ['back_office']
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
          '<%= yeoman.back_office %>/app/**/*.html',

          '<%= yeoman.back_office %>/app/scripts_js/**/*.js'

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
	replace:{
		rec: {
			options: {
				patterns: [
					{
					match: /\/socket\.io\-client/g,
					replacement: 'http://tripygo-breizher.rhcloud.com:8080/socket.io-client'
					}
				]
			},
			files: [
			{expand: true, flatten: false, src: ['dist/back/scripts_js/components/**/*', 'dist/public/frontOfficeA2/src/**/*']}
			]
		},
		prod: {
			options: {
				patterns: [
					{
					match: /\/socket\.io\-client/g,
					replacement: 'http://tripygo-math29land.rhcloud.com:8080/socket.io-client'
					}
				]
			},
			files: [
			{expand: true, flatten: false, src: ['dist/back/scripts_js/components/**/*', 'dist/public/frontOfficeA2/src/**/*']}
			]
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
      //},
      //all: [
      //  '<%= yeoman.client %>/{app,components}/**/*.js',
      //  '!<%= yeoman.client %>/{app,components}/**/*.spec.js',
      //  '!<%= yeoman.client %>/{app,components}/**/*.mock.js',
      //],
      //test: {
      //  src: [
      //    '<%= yeoman.client %>/{app,components}/**/*.spec.js',
      //    '<%= yeoman.client %>/{app,components}/**/*.mock.js'
      //  ]
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
      server: '.tmp',
      back_office_dist: '<%= yeoman.back_office_dist %>'
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
      }
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
    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/public/*.html']
      },
      back_office_dist: {
        html: ['<%= yeoman.private %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.front_office_dist %>',
          dest: '<%= yeoman.public %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'app/**/*',
            'assets/**/*',
            'lib/**/*',
            'node_modules/**/*',
            'vendor/**/*',
            'frontOfficeA2/**/*',
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
          cwd: '<%= yeoman.back_office_dist %>',
          dest: '<%= yeoman.private %>',
          src: [
            '**/*'
          ]
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.client %>',
        dest: '.tmp/',
        src: ['{app,components}/**/*.css']
      },
      back_office_base:{
        expand: true,
        dest: '<%= yeoman.back_office_dist %>',
        cwd: '<%= yeoman.back_office %>/app/',
        src: [
          '**/*',
          '!/scripts/**/*'
        ]
      },
	  back_office_bower:{
		expand: true,
		dest:'./<%= yeoman.back_office_dist %>/bower_components',
		cwd:'bower_components',
		src:[
      'bootstrap-iconpicker/bootstrap-iconpicker/**/*',
			'metisMenu/dist/**/*.min.*',
		]
	  },
      back_office_lib: {
        expand: true,
        dest: './<%= yeoman.back_office_dist %>/lib',
        cwd: 'node_modules',
        src: '<%= yeoman.back_office_libs %>'
      },
      tripy_go_lib_back: {
        expand: true,
        dest: '<%= yeoman.back_office %>/app/scripts/tripy-lib',
        cwd: './<%= yeoman.lib %>',
        src: [
          '**/*'
        ]
      },
      back_office_compiled: {
        expand: true,
        dest: './<%= yeoman.back_office_dist %>/scripts_js',
        cwd: './<%= yeoman.back_office_dist %>/scripts_js/back_office/src/app/scripts',
        src: [
          '<%= yeoman.back_office_dist %>/scripts_js/back_office/src/app/scripts/**/*.js'
        ]
      },
      back_office_inner: {
        expand: true,
        dest: './<%= yeoman.back_office_dist %>/scripts_js',
        cwd: './<%= yeoman.back_office_dist %>/scripts_js/back_office/src/app/scripts',
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
        cwd: './bower_components',
        src: [
          'jquery/**/*'
        ]
      },
      front_office_vendor_npm: {
        expand: true,
        dest: './frontOfficeA2/dist/vendor',
        cwd: './node_modules',
        src: [
          'bootstrap/dist/**/*',
          'font-awesome/**/*'
        ]
      },
      front_office_lib: {
        expand: true,
        dest: './frontOfficeA2/dist/lib',
        cwd: './node_modules',
        src: [
          '@angular/**/*',
          'angular2-google-maps/**/*',
          'reflect-metadata/Reflect.js',
          'systemjs/dist/**/*',
          'rxjs/**/*',
          'angular2-jwt/*',
          'ng2-bootstrap/**/*',
          'moment/min/**/*',
          'ng2-bootstrap/**/*',
          'ng2-notifications/**/*',
          'ng2-file-upload/**/*',
          'marked/marked.min.js',
          'flag-icon-css/css/flag-icon.min.css',
          'flag-icon-css/flags/**/*',
          'push.js/push.min.js',
          'lodash/lodash.min.js',
          'socket.io-client/socket.io.js'
        ]
      },
      upgrade_bootstrap_iconpicker: {
        expand: true,
        dest: './<%= yeoman.back_office.dist %>/bower_components/bootstrap-iconpicker/bootstrap-iconpicker/js/iconset',
        cwd: './localUpgrade/bootstrap-iconpicker',
        src: [
          '**/*'
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
      front_css_dev: {
        options: {
          transform: function(filePath) {
            filePath = filePath.replace('./frontOfficeA2/src/', '');
            return '<link rel="stylesheet" href="' + filePath + '">';
          },
          starttag: '<!-- injector:css -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
          '<%= yeoman.front_office_dist %>/index.html': ['<%= yeoman.front_office_css %>']
        }
      },
      front_css_dist: {
        options: {
          transform: function(filePath) {
            filePath = filePath.replace('./frontOfficeA2/src/', '');
            filePath = filePath.replace('./frontOfficeA2/dist/', '');
            return '<link rel="stylesheet" href="' + filePath + '">';
          },
          starttag: '<!-- injector:css -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
          '<%= yeoman.front_office_dist %>/index.html': ['<%= yeoman.front_office_dist %>/assets/css/built.css']
        }
      },
      back_css: {
        options: {
          transform: function(filePath) {
            filePath = filePath.replace('/back_office/dist/', '');
            //filePath = filePath.replace('/.tmp/', '');
            return '<link rel="stylesheet" href="' + filePath + '">';
          },
          starttag: '<!-- injector:css -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
          '<%= yeoman.back_office_dist %>/index.html': [
            '<%= yeoman.back_office_dist %>/styles/built.css'
          ]
        }
      },
      // Inject application script files into index.html (doesn't include bower)
      back_lib: {
        options: {
          transform: function(filePath) {
            filePath = filePath.replace('/back_office/dist/', '');
            //filePath = filePath.replace('/.tmp/', '');
            return '<script src="' + filePath + '"></script>';
          },
          starttag: '<!-- injector:js -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
          '<%= yeoman.back_office_dist %>/index.html': [
               [
                 "<%= yeoman.back_office_dist %>/js/angular2-polyfills.js",
                 "<%= yeoman.back_office_dist %>/lib/tinymce/tinymce.min.js",
                 "<%= yeoman.back_office_dist %>/lib/jquery/dist/jquery.min.js",
                 "<%= yeoman.back_office_dist %>/lib/bootstrap/dist/js/bootstrap.min.js",
                 "<%= yeoman.back_office_dist %>/bower_components/metisMenu/dist/metisMenu.min.js",
                 "<%= yeoman.back_office_dist %>/bower_components/bootstrap-iconpicker/bootstrap-iconpicker/js/iconset/iconset-fontawesome-4.6.5.min.js",
                 "<%= yeoman.back_office_dist %>/bower_components/bootstrap-iconpicker/bootstrap-iconpicker/js/bootstrap-iconpicker.min.js",
                 "<%= yeoman.back_office_dist %>/lib/systemjs/dist/system.src.js",
                 "<%= yeoman.back_office_dist %>/lib/rxjs/bundles/Rx.js",
                 "<%= yeoman.back_office_dist %>/lib/d3/d3.min.js",
                 "<%= yeoman.back_office_dist %>/lib/marked/marked.min.js",
                 "<%= yeoman.back_office_dist %>/lib/to-markdown/dist/to-markdown.js",
                 "<%= yeoman.back_office_dist %>/lib/datamaps/dist/datamaps.world.min.js",
                 "<%= yeoman.back_office_dist %>/lib/chart.js/Chart.min.js",
                 "<%= yeoman.back_office_dist %>/js/*.js",
                 "<%= yeoman.back_office_dist %>/lib/jquery-ui-bundle/jquery-ui.min.js",
                 "<%= yeoman.back_office_dist %>/lib/push.js/push.min.js"
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
    }
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
        // 'wiredep',
        'autoprefixer',
        'concurrent:debug',
        'apidoc'
      ]);
    }

    grunt.task.run([
      'clean:server',
      'env:all',
      'concurrent:server',
      'copy:tripy_go_lib',
      'front_office',
      'back_office',
      // 'wiredep',
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
        'wiredep',
        'autoprefixer',
        'express:dev',
        'protractor'
      ]);
    }

    else grunt.task.run([
      'test:server'
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
    'clean:back_office_dist',
    'copy:back_office_base',
    'concat:back_css',
	  'copy:back_office_bower',
    'copy:back_office_lib',
    'copy:upgrade_bootstrap_iconpicker',
    'copy:tripy_go_lib_back',
    'injector:back_lib',
    'injector:back_css',
    'ts:back_office',
    'copy:back_office_compiled',
    'copy:back_office_inner'
  ]);

  grunt.registerTask('front_office', function(target) {
    console.log('target: ' + target);
    if(target == 'dist') {
      return grunt.task.run([
        'copy:tripy_go_lib',
        'copy:front_office_base',
        'copy:front_office_lib',
        'copy:front_office_vendor',
        'copy:front_office_vendor_npm',
        'concat:front_css',
        'injector:front_css_dist',
        'ts:front_office'
      ]);
    }else {
      return grunt.task.run([
        'copy:tripy_go_lib',
        'copy:front_office_base',
        'copy:front_office_lib',
        'copy:front_office_vendor',
        'copy:front_office_vendor_npm',
        'injector:front_css_dev',
        'ts:front_office'
      ]);
    }

  });

  grunt.registerTask('build', [
    'clean:dist',
    'concurrent:dist',
    'useminPrepare',
    'front_office:dist',
    'back_office',
    'autoprefixer',
    'copy:dist',
    'mkdir',
    'touch'
  ]);



  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build',
    'serve:dist'
  ]);
};
