'use strict';

var ngrok = require('ngrok');
var compression = require('compression');

module.exports = function(grunt) {
	// Load grunt tasks
	require('load-grunt-tasks')(grunt);

	// Grunt configuration
	grunt.initConfig({
		pagespeed: {
			options: {
				nokey: true,
				locale: 'en_GB',
				threshold: 90
			},
			local: {
				options: {
					strategy: 'desktop'
				}
			},
			mobile: {
				options: {
					strategy: 'mobile'
				}
			}
		},
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            'dist/*',
            '!dist/.git*'
          ]
        }]
      },
    },
		imagemin: {
			indexImg: {
			  options: {
			  	optimizationLevel: 7
			  },
			  files: [{
					expand: true,
					cwd: 'img',
					src: ['*.{png,jpg}'],
					dest: 'dist/img'
			  }]
			},
			pizzaImg: {
				files: [{
					expand: true,
					cwd: 'views/images',
					src: ['*.{png,jpg}'],
					dest: 'dist/views/images'
			  }]
			}
		},
		cssmin: {
			dist: {
			  files: [{
			    expand: true,
		      src: ['css/*.css', 'views/css/*.css'],
		      dest: 'dist',
		      ext: '.css'
			  }]
			}
		},
		uglify: {
			dist: {
			  files: [{
			    expand: true,
		      src: ['js/*.js', 'views/js/*.js'],
		      dest: 'dist',
		      ext: '.js'
			  }]
			}
		},
    htmlmin: {
      dist: {
        files: [{
          expand: true,
          src: ['*.html', ['views/*.html']],
          dest: 'dist'
        }]
      }
    },
    assets_inline: {
	    all: {
	      options: {
	        minify: true
	      },
	      files: {
	        'dist/index.html': 'index.html',
	        'dist/project-2048.html': 'project-2048.html',
	        'dist/project-mobile.html': 'project-mobile.html',
	        'dist/project-webperf.html': 'project-webperf.html'
	      },
	    },
	  },
    connect: {
    	dev: {
	      options: {
	        port: 8080,
	        hostname: '0.0.0.0',
      		keepalive: true
	      }
    	},
      prod: {
        options: {
	        port: 8080,
	        hostname: '0.0.0.0',
          open: true,
          base: 'dist',
      		keepalive: true,
	        middleware: function (connect, options, middlewares) {
	          middlewares.unshift(compression());
	          return middlewares;
	        }
        }
      }
    }
	});

	 // Register customer task for ngrok
  grunt.registerTask('psi-ngrok', 'Run pagespeed with ngrok', function() {
    var done = this.async();
    var port = 8080;

    ngrok.connect(port, function(err, url) {
      if (err !== null) {
        grunt.fail.fatal(err);
        return done();
      }
      grunt.config.set('pagespeed.options.url', url);
      grunt.task.run('pagespeed');
      done();
    });
  });

	// Register default tasks
	grunt.registerTask('default', 'connect:prod');
  grunt.registerTask('perf', ['psi-ngrok']);
  grunt.registerTask('build', [
  	'clean:dist',
  	'htmlmin',
  	'cssmin',
  	'uglify',
  	'assets_inline',
  	'imagemin'
  ]);
};