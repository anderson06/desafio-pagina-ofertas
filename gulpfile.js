var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');
var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var _ = require('lodash');
var jade = require('gulp-jade');
var plumber = require('gulp-plumber');
var nodemon = require('gulp-nodemon');

// we'd need a slight delay to reload browsers
// connected to browser-sync after restarting nodemon
var BROWSER_SYNC_RELOAD_DELAY = 500;

gulp.task('nodemon', function (cb) {
	var called = false;
	return nodemon({
		script: 'index.js',
    watch: ['app/server/*.js', 'app/server/*.jade'],
	})
	.on('start', function onStart() {
		// ensure start only got called once
		if (!called) { cb(); }
		called = true;
	})
	.on('restart', function onRestart() {
		// reload connected browsers after a slight delay
		setTimeout(function reload() {
			browserSync.reload({
				stream: false
			});
		}, BROWSER_SYNC_RELOAD_DELAY);
	});
});

gulp.task('browser-sync', ['nodemon'], function () {
	browserSync({
		proxy: 'http://localhost:3000',
		port: 9000
	});
});

gulp.task('clean', function(cb) {
	return del(['dist'], cb);
});

gulp.task('sass', function() {
  return gulp.src('app/client/sass/*.scss')
		.pipe(sass({ style: 'expanded' }))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(gulp.dest('public/assets/css'))
		.pipe(reload({ stream: true }));
});

gulp.task('browserify', function() {

	var opts = _.assign({}, watchify.args, {
			entries: ["./app/client/scripts/index.js"],
			dest: "./public/assets/js/",
			outputName: "main.js",
			debug: true,
		});
	var b = watchify(browserify(opts));

	b.on('update', bundle);
	b.on('log', gutil.log);

	function bundle() {
		return b.bundle()
			.pipe(source('main.js'))
			.pipe(buffer())
			.pipe(sourcemaps.init({loadMaps: true}))
			.pipe(gulp.dest('./public/assets/js/'))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest('./public/assets/js/'))
			.pipe(reload({ stream: true }));
	}

	return bundle();
});

gulp.task('test', function (done) {
	var Server = require('karma').Server;

	new Server({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, done).start();
});

gulp.task('watch', function() {
  gulp.watch('app/client/jade/**/*.jade', ['jade']);
  gulp.watch('app/client/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['clean'], function() {
	gulp.start('sass', 'browserify', 'watch', 'browser-sync');
});

gulp.task('build', ['clean'], function() {
	gulp.start('jade-build', 'sass-build', 'browserify-build');
});
