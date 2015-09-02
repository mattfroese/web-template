var gulp = require('gulp'),
    concat = require('gulp-concat'),
    postcss = require('gulp-postcss'),
    mario = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create();

// uncomment to enable psd asset copying
// var psAssetsFolder = 'psd/ps-extractassets-folder/**/*',
var jsfiles = [
        './bower_components/modernizr/modernizr.js',
        './bower_components/jquery/dist/jquery.js',
        './bower_components/foundation/js/foundation.js',
        './src/js/**/*.js',
        './src/js/*.js'
    ],
    cssfiles = [
        'bower_components/foundation/css/foundation.css',
        'src/css/main.css'
    ];

function mushroom(e) {
  if(e.fileName) console.log(e.fileName);
  console.log(e.message);
  require('beepbeep')(2);
  this.emit('end');
}

gulp.task('scripts', function() {
  	return gulp.src( jsfiles )
      .pipe(mario(mushroom))
      .pipe(sourcemaps.init())
      .pipe(concat('main.min.js'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./dist/js/'))
      .pipe(browserSync.stream());
});

gulp.task('css', function() {
	var processors = [
        require('autoprefixer')('last 1 version'),
        require('csswring'),
        require('postcss-import'),
        require('postcss-simple-vars'),
        require('postcss-nested'),
        require('css-mqpacker')
    ];
  	return gulp.src(cssfiles)
      .pipe(mario(mushroom))
      .pipe(sourcemaps.init())
      .pipe(postcss(processors))
      .pipe(concat('main.css'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./dist/css/'))
      .pipe(browserSync.stream());
});

gulp.task('psd', function() {
    return gulp
        .src(psAssetsFolder)
        .pipe(mario(mushroom))
        .pipe(gulp.dest('./dist/img/'));
});

gulp.task('reload', function() { browserSync.reload(); });

gulp.task('stream', function () {
    browserSync.init({
        server: "./dist"
    });

    gulp.watch('src/css/*.css', ['css']);
    gulp.watch('src/css/**/*.css', ['css']);
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('dist/*.html', ['reload']);

    // Uncomment for asset extraction
    // gulp.watch(psAssetsFolder, ['psd','reload']);
});

gulp.task('default', ['stream']);
