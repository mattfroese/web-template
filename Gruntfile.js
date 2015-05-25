module.exports = function (grunt) {

    var jsFiles = [
        'bower_components/modernizr/modernizr.js',
        'bower_components/jquery/dist/jquery.js',
        'bower_components/foundation/js/foundation.js',
        'src/js/**/*.js',
    ];
    var cssFiles = [
        'bower_components/foundation/css/foundation.css',
        'src/css/media-components.css',
        'src/css/**/*.css',
    ];

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dev: {
                src: jsFiles,
                dest: 'dist/js/template.min.js'
            },
            js: {
                src: jsFiles,
                dest: 'dist/js/template.js'
            },
            css: {
                src: cssFiles,
                dest: 'dist/css/template.css'
            }
        },
        uglify: {
            options: {
                report: 'min',
                mangle: false
            },
            my_target: {
                files: {
                    'dist/js/template.min.js': ['dist/js/template.js']
                }
            }
        },
        watch: {
            scripts: {
                files: ['src/**/*.js', 'src/**/*.css'],
                tasks: ['concat:dev', 'concat:css'],
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['concat:js', 'concat:css', 'uglify']);

};