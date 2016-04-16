var gulp, sass, cached, browserSync;
gulp = require('gulp');
sass = require('gulp-sass');
cached = require('gulp-cached');
browserSync = require('browser-sync');

gulp.task('sass', function (){
	gulp.src( ['src/scss/**/*.scss', '!_*.scss'] )
		.pipe( sass() )
		.pipe( gulp.dest('src/css') )
})

gulp.task('styleReload', ['sass'], function (){
	return gulp.src(['src/css/**/*.css'])
		.pipe( cached('style') )
		.pipe( browserSync.reload({stream: true}) )
})

gulp.task('watch', function (){
	gulp.watch('src/scss/**/*.scss', ['sass']);
})