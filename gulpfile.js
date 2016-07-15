/*file: gulpfile.js*/

var gulp          = require('gulp'),
    util          = require('gulp-util'),
    jshint        = require('gulp-jshint'),
    sass          = require('gulp-sass'),
    minifyCss     = require('gulp-minify-css'),
    autoprefixer  = require('gulp-autoprefixer');
    concat        = require('gulp-concat'),
    stripDebug    = require('gulp-strip-debug'),
    uglify        = require('gulp-uglify'),
    minifyHtml    = require('gulp-minify-html'),
    plumber       = require('gulp-plumber'),
    nodemon       = require('gulp-nodemon'),
    connect       = require('gulp-connect');


gulp.task('jshint', (()=> {
  gulp.src('./app/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
}));

gulp.task('scripts', function() {
  gulp.src('./app/scripts/*.js')
    .pipe(concat('script.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./build/scripts/'));
});

gulp.task('connect', function() {
  connect.server({
    root: 'app',
    port: process.env.PORT || 9000,
    livereload: true
  });
});

gulp.task('reload', function() {
  gulp.src(['./app/*.html', './app/scripts/*.js'])
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(['./app/scripts/*.js'], ['jshint', 'scripts', 'reload']);
  gulp.watch(['./app/*.html'], ['reload']);

  /*TODO: write watch for css also*/
  
});

gulp.task('start:dev', function() {
  nodemon({
    script: 'index.js',
    ext: 'js html',
    env: {'NODE_ENV': 'development'}
  });
})

gulp.task('default', ['jshint', 'scripts', 'connect', 'watch']);
