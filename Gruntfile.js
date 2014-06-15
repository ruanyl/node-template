module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'src/*.js'],
      test: ['Gruntfile.js', 'test/**/*.js']
    },
    watch: {
      js: {
        files: ['src/**/*.js'],
        tasks: ['jshint']
      },
      compass: {
        files: ['src/**/*.scss'],
        tasks: ['compass']
      },
      combineCss: {
        files: ['dist/**/*.css'],
        tasks: ['concat:css']
      },
      combineJs: {
        files: ['dist/**/*.js'],
        tasks: ['concat:js']
      },
      minCss: {
        files: ['static/css/style.css'],
        tasks: ['cssmin']
      },
      minJs: {
        files: ['static/js/client.js'],
        tasks: ['uglify']
      }
    },
    connect: {
      server: {
        options: {
          port: 8080,
          base: '.'
        }
      }
    },
    compass: {
      dist: {
        options: {
          sassDir: 'src/sass',
          cssDir: 'dist/css'
        }
      }
    },
    concat: {
      css: {
        src: ['dist/css/*.css'],
        dest: 'dist/style.css'
      },
      js: {
        src: ['dist/js/*.js'],
        dest: 'dist/client.js'
      }
    },
    cssmin: {
      minify: {
        files: {
          'dist/style.min.css': ['dist/style.css']
        }
      }
    },
    uglify: {
      minify: {
        files: {
          'dist/client.min.js': ['dist/client.js']
        }
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('build', ['compass', 'concat', 'connect', 'watch']);
  grunt.registerTask('serve', ['compass', 'concat', 'cssmin', 'uglify', 'connect', 'watch']);
  grunt.registerTask('default', ['jshint', 'build']);
  grunt.registerTask('test', ['jshint', 'mochaTest']);
};
