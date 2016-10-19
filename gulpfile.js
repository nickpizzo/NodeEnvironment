'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');

gulp.task('default', ['browser-sync', 'sass']);

/////////////// CSS ///////////////

gulp.task('sass', function () {
	// var onError = function (err) {
	// 	notify.onError({
	// 		title: 'Gulp Error',
	// 		message: '<%= error.message %>',
	// 		sound: 'Beep'
	// 	})(err);
	// 	this.emit('end');
	// };

	gulp.src('css/main.sass')
		// .pipe(plumber({errorHandler: onError}))
		.pipe(sass())
		.pipe(gulp.dest('public/css'))
		// .pipe(reload({stream: true}))
})

/////////////// Serve & Watch ///////////////

gulp.task('browser-sync', ['nodemon'], function () {
	browserSync.init(null, {
		proxy: "http://localhost:5000",
        files: ["public/**/*.*"],
        browser: "google chrome",
        port: 7000,
	});
	gulp.watch('views/*.pug', function () {browserSync.reload()});
	gulp.watch('css/*.sass', ['sass']);
});

gulp.task('nodemon', function (cb) {

	var started = false;

	return nodemon({
		script: 'app.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		if (!started) {
			cb();
			started = true;
		}
	});
});
