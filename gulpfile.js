var gulp = require('gulp');
var concat = require('gulp-concat');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('scripts', function() {
  	return gulp.src([
		'./bower_components/modernizr/modernizr.js',
        './bower_components/jquery/dist/jquery.js',
        './bower_components/foundation/js/foundation.js',
        './src/js/*.js'
  	])
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('css', function() {
	var processors = [
        // require('autoprefixer')('last 1 version'),
        // require('css-mqpacker'),
        // require('csswring'),
        require("postcss-import"),
        require('postcss-simple-vars')
    ];
  	return gulp.src([
        'bower_components/foundation/css/foundation.css',
        'src/css/media-components.css',
        /* template specific */
        // 'src/css/_variables.css',
        // 'src/css/scaffolding.css',
        // 'src/css/grid.css',
        // 'src/css/navigation.css',
        // 'src/css/hero.css',
        // 'src/css/section.css',
        'src/css/main.css'
	])
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(concat('main.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('default', ['scripts','css']);