var gulp = require('gulp'), 
	gutil = require('gulp-util'),
	sass = require('gulp-ruby-sass') ,
	notify = require('gulp-notify') ,
	bower = require('gulp-bower'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	autoprefixer = require('gulp-autoprefixer'),
	minifyCSS = require('gulp-minify-css'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	sourcemaps = require('gulp-sourcemaps');


// Define paths
var basePaths = {
	src: '_src/',
	dest: '_dist/',
	bower: 'bower_components/'
};

// Compile stylesheet
gulp.task('styles', function () {
	return sass(basePaths.src+'assets/scss/styles.scss', {
		loadPath: [
			basePaths.bower + 'bootstrap-sass-official/assets/stylesheets',
			basePaths.bower +'fontawesome/scss',
		],
		style: (gutil.env.prod) ? 'compressed': 'expanded',
		precision: 10,
		sourcemap: (gutil.env.prod) ? false: true
	})
	.on('error', function (error){
		console.log('Error:', error.message);
	})
	.pipe(autoprefixer('last 2 version'))
	.pipe(concat('styles.css'))
	.pipe(gulpif(gutil.env.prod, rename({suffix: '.min'})))
	.pipe(gulpif(gutil.env.prod, minifyCSS()))
	.pipe(gulpif(gutil.env.prod, gutil.noop(), sourcemaps.write()))
	.pipe(gulp.dest(basePaths.dest+'assets/css'));
});


// Copy Bootstrap and FontAwesome fonts
gulp.task('fonts', function() { 
	return gulp.src([
			basePaths.bower + 'fontawesome/fonts/**',
			basePaths.bower + 'bootstrap-sass-official/assets/fonts/**',			
		]) 
		.pipe(gulp.dest(basePaths.dest+'assets/fonts'));
});


// Copy JQuery and Bootstrap javascripts
gulp.task('scripts', function(){
	gulp.src([ 
		basePaths.bower + 'jquery/dist/jquery.js',
		basePaths.bower + 'bootstrap-sass-official/assets/javascripts/bootstrap.js',
		basePaths.src + 'assets/js/main.js',
		basePaths.src + 'assets/js/*.js'
	])
	.pipe(concat('main.js'))
	.pipe(gulpif(gutil.env.prod, rename({suffix: '.min'})))
	.pipe(gulpif(gutil.env.prod, uglify()))
	.pipe(gulpif(gutil.env.prod, gutil.noop(), sourcemaps.write()))
	.pipe(gulp.dest(basePaths.dest+'assets/js'));
});


// Copy and optimize images
gulp.task('images', function(){
	gulp.src(basePaths.src + 'assets/img/**.{png,jpg,jpeg,gif,svg}')
	.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
	.pipe(gulp.dest(basePaths.dest+'assets/img'));
})


// Watch 
gulp.task('watch', function() {
	 gulp.watch(basePaths.src+'assets/scss/*.scss', ['styles']); 
	 gulp.watch(basePaths.src+'assets/js/*.js', ['scripts']);	 
	 gulp.watch(basePaths.src+'assets/img/**.{png,jpg,jpeg,gif,svg}', ['images']);
});


// Set tasks
gulp.task('build', ['styles', 'fonts', 'scripts', 'images']);
gulp.task('default', ['build']);
