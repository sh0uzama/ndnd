var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
//var minifyCSS = require('gulp-minify-css');
//var embedlr = require('gulp-embedlr');
var babel = require('gulp-babel');

var approot = 'client/angular/';
var scripts = [
    'client/scripts/polyfills.js',
    approot + 'models/*.js',
    approot + 'login.js',
    approot + 'ndnd.js',
    approot + '**/*.js'
];

gulp.task('scripts', function() {
    gulp.src(scripts)
        .pipe(concat('application.js'))
        .pipe(babel({ compact: false, presets: ['es2015'] }))
        .pipe(gulp.dest('client/'));
});

gulp.task('styles', function () {

	gulp.src('client/styles/application.less')
		.pipe(less())
		.pipe(gulp.dest('client/'));

});

gulp.task('default', ['scripts', 'styles']);