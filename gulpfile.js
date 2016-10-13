'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');

gulp.task('default', ['html', 'browser-sync']);

/////////////// HTML ///////////////

gulp.task('html', function () {
	gulp.src('./*.html')
		.pipe(gulp.dest('public/'))
		.pipe(reload({stream: true}));
});

/////////////// Serve & Watch ///////////////

gulp.task('browser-sync', ['nodemon'], function () {
	browserSync.init(null, {
		proxy: "http://localhost:5000",
        files: ["public/**/*.*"],
        browser: "google chrome",
        port: 7000,
	});
	gulp.watch('./*.html', ['html']);
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
