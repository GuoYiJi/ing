var gulp = require('gulp');

// 引入gulp组件（插件）
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var jshint = require('gulp-jshint');
var minifyCss = require('gulp-minify-css');
var miniImage = require('gulp-imagemin');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var useref = require('gulp-useref');
var filter = require('gulp-filter');
var gulpif = require('gulp-if');
var clean = require('gulp-clean');
var replace = require('gulp-replace');
var sass = require('gulp-sass');
var RevAll = require('gulp-rev-all');
var revAll = new RevAll({
	'dontRenameFile': ['.tpl', '.htm', '.html']
})



// 开发环境
var develop = {
	base: 'src',
	temp: 'src/.temp',				// html，js，css压缩合并后生成的临时目录
	html: 'src/html',
	js: 'src/js',
	images: 'src/images',
	lib: 'src/lib',
	path: '__PATH__'
};
// 线上环境
var release = {
	base: 'dist',
	html: 'dist/html',
	js: 'dist/js',
	images: 'dist/images',
	lib: 'dist/lib',
	path: 'dist'
};
gulp.task('build', ['compress'], function (){
	gulp.run( 'move' );
	gulp.run( 'clean:temp' );
})



// html文件引用路径替换 css、js合并压缩
gulp.task('compress', ['clean', 'sass'], function () {
    var assets = useref.assets();
    return gulp.src( develop.html + '/**/*.html' )
        .pipe( assets )
        .pipe( gulpif('*.js', uglify()) )
        .pipe( gulpif('*.css', minifyCss()) )
        .pipe( assets.restore() )
        .pipe( useref() )
        .pipe( revAll.revision() )
        .pipe( gulpif( '*.html', replace(develop.path, release.path) ) )
        .pipe( gulp.dest(develop.temp) );
});
// 监控sass
gulp.task('watch:sass', function (){
	gulp.run('sass');
	watch('src/**/*.scss', function (e){
		gulp.run('sass');
	})
})

// 编译一次sass，不编译带下划线的scss文件
gulp.task('sass', ['src:sass', 'lib:sass'], function (){
})
gulp.task('src:sass', function (){
	gulp.src( develop.base + '/scss/**/*.scss', ['!_*.scss'] )
		.pipe( sass() )
		// 替换掉scss里面的图片引用路径变量
		.pipe( replace(develop.path, release.path) )
		.pipe( gulp.dest(develop.base + '/css') );
})
gulp.task('lib:sass', function (){
	gulp.src( develop.lib + '/scss/**/*.scss', ['!_*.scss'] )
		.pipe( sass() )
		// 替换掉scss里面的图片引用路径变量
		.pipe( replace(develop.path, release.path) )
		.pipe( gulp.dest(develop.lib + '/css') );
})

// 语法检查
gulp.task('jshint', function () {
    return gulp.src('app/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


// 清除临时目录
gulp.task('clean:temp', function (){
    return gulp.src( [develop.temp], {read: false} )
        .pipe( clean({force: true}) );
})


// 移动资源
gulp.task('move', function (){

	gulp.src( develop.base + '/**/images/**' )
		.pipe( gulp.dest( 'dist' ) );

	gulp.src( develop.base + '/**/fonts/**' )
		.pipe( gulp.dest( 'dist' ) );

	// 经过压缩合并后的css，js移到对应的目录
	gulp.src( develop.temp + '/' + develop.path + '/**' )
		.pipe( gulp.dest( release.base ) );

	// 经过处理后的html移到对应的目录
	gulp.src( develop.temp + '/**/*.html' )
		.pipe( gulp.dest( release.html ) )
})


// 清空图片、样式、js
gulp.task('clean', function () {
    return gulp.src( [release.path], {read: false} )
        .pipe( clean({force: true}) );
});

// 注册缺省任务
gulp.task('default', ['build']);