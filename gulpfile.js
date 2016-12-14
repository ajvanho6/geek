'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var imagemin = require('gulp-imagemin');
var newer = require('gulp-newer');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var svgmin = require('gulp-svgmin');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var postcss = require('gulp-postcss');
var rucksack = require('rucksack-css');
var pxtorem = require('postcss-pxtorem');
var vr = require('postcss-vertical-rhythm');
/*var simpleGrid = require('postcss-simple-grid');*/

// paths
var imgSrc = './images/src/*';
var imgDest = './images';
var svgSrc = './images/svg-src/*';
var svgDest = './images';
var sassSrc = './scss/**/*.scss';
var sassDest = './css';

gulp.task('sass', function () {
    var processors = [
    /*  simpleGrid({separator: '--'}),*/
      rucksack({fallbacks:true,autoprefixer:true}),
      pxtorem({
        rootValue: 16,
        unitPrecision: 5,
        propWhiteList: ['font', 'font-size', 'line-height', 'letter-spacing'],
        selectorBlackList: [],
        replace: true,
        mediaQuery: false,
        minPixelValue: 0
      }),
      vr
    ];  
gulp.src(sassSrc)
  .pipe(sourcemaps.init())
  .pipe(sass({
    errLogToConsole: true
    }))
  .pipe(autoprefixer('last 2 version'))
  .pipe(sourcemaps.write())
  .pipe(postcss(processors))
  .pipe(gulp.dest(sassDest));
});

gulp.task('cssmin', function() {
  return gulp.src('./css/styles.css')
    .pipe(cleanCSS())
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest(sassDest));
});

// add image minify task
gulp.task('imagemin', function() {
  return gulp.src(imgSrc)
    .pipe(newer(imgSrc))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDest));
});

// add svg minify task
gulp.task('svgmin', function() {
  return gulp.src(svgSrc)
    .pipe(newer(svgSrc))
    .pipe(svgmin())
    .pipe(gulp.dest(svgDest));
});

//browser sync
gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

// Run tasks without watching.
gulp.task('build', function(callback) {
  runSequence('sass', 'imagemin', 'svgmin', 'cssmin', callback);
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(sassSrc, ['sass']);
  gulp.watch('./css/styles.css', ['cssmin']);
  gulp.watch(imgSrc, ['imagemin']);
  gulp.watch(svgSrc, ['svgmin']);
});

gulp.task('default', function(callback) {
  runSequence('sass', 'imagemin', 'svgmin', 'cssmin', 'watch','browser-sync','bs-reload', callback);
});
