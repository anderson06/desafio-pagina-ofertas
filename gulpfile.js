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

gulp.task('server', function() {
	browserSync({
		port: 9000,
		server: {baseDir: ['dist', 'images']}
	});
});

gulp.task('clean', function(cb) {
	return del(['dist'], cb);
});

gulp.task('jade', function() {
	return gulp.src('src/jade/index.jade')
		.pipe(jade({
			pretty: true,
			data: {dev : true} // can be used inside .jade files to indicate if we are in dev or prod mode
		}))
		.pipe(gulp.dest('dist'))
		.pipe(reload({stream: true}));
});

gulp.task('jade-build', function() {
	return gulp.src('src/jade/index.jade')
		.pipe(jade({
			pretty: false,
			data: {dev: false}
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('sass', function() {
	return gulp.src('src/sass/main.scss')
		.pipe(sass({ style: 'expanded' }))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(gulp.dest('dist/assets/css'))
		.pipe(reload({ stream: true }));
});

gulp.task('sass-build', function() {
	return gulp.src('src/styles/main.scss')
		.pipe(sass({ style: 'expanded' }))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(gulp.dest('dist/assets/css'))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest('dist/prod/assets/css'));
});

gulp.task('browserify', function() {

	var opts = _.assign({}, watchify.args, {
			entries: ["./src/scripts/index.js"],
			dest: "./dist/assets/js/",
			outputName: "main.js",
			debug: true,
			//transform: [ [ "browserify-replace", { "replace": [ { "from": /\@\@root/g, "to": "" } ] } ] ]
		});
	var b = watchify(browserify(opts));

	b.on('update', bundle);
	b.on('log', gutil.log);

	function bundle() {
		return b.bundle()
			.pipe(source('main.js'))
			.pipe(buffer())
			.pipe(sourcemaps.init({loadMaps: true}))
			.pipe(gulp.dest('./dist/assets/js/'))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest('./dist/assets/js/'))
			.pipe(reload({ stream: true }));
	}

	return bundle();
});

gulp.task('browserify-build', function() {

	var opts = _.assign({}, watchify.args, {
			entries: ["./src/scripts/index.js"],
			dest: "./dist/assets/js/",
			outputName: "main.js",
			debug: true,
			//transform: [ [ "browserify-replace", { "replace": [ { "from": /\@\@root/g, "to": "//produrl.com/" + project } ] } ] ]
		});
	var b = watchify(browserify(opts));

	b.on('update', bundle);
	b.on('log', gutil.log);

	function bundle() {
		return b.bundle()
			.pipe(source('main.js'))
			.pipe(buffer())
			.pipe(gulp.dest('./dist/assets/js/'))
			.pipe(uglify({compress: {unused: false}}))
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest('./dist/assets/js/'));
	}

	return bundle();
});

gulp.task('watch', function() {
	gulp.watch('src/jade/**/*.jade', ['jade']);
	gulp.watch('src/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['clean'], function() {
	gulp.start('jade', 'sass', 'browserify', 'watch', 'server');
});

gulp.task('build', ['clean'], function() {
	gulp.start('jade-build', 'sass-build', 'browserify-build');
});
