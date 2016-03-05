var gulp = require('gulp');

// 引入gulp组件（插件）
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var jshint = require('gulp-jshint');
var minifyCss = require('gulp-minify-css');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var useref = require('gulp-useref');
var filter = require('gulp-filter');
var gulpif = require('gulp-if');
var clean = require('gulp-clean');
var replace = require('gulp-replace');
var RevAll = require('gulp-rev-all');
var revAll = new RevAll({
	'dontRenameFile': ['.tpl', '.htm', '.html']
})
//index.html css、js合并压缩
gulp.task('index', ['clean'], function () {
    var assets = useref.assets({searchPath: ['.']});
    return gulp.src('src/html/**/*.html')
        .pipe( gulpif( '*.html', replace('__PATH__', 'dist') ) )
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe( revAll.revision() )
        .pipe(gulp.dest('dist'));
});

// 语法检查
gulp.task('jshint', function () {
    return gulp.src('app/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// 复制文件
gulp.task('copy', function () {
    gulp.src('app/fonts/*')
        // 目标地址
        .pipe(gulp.dest('www/fonts/'))
    gulp.src('app/templates/**')
        // 目标地址
        .pipe(gulp.dest('www/templates/'))
    gulp.src('app/img/*')
        // 目标地址
        .pipe(gulp.dest('www/img/'))

});

// 清空图片、样式、js
gulp.task('clean', function () {
    return gulp.src(['dist'], {read: false})
        .pipe(clean({force: true}));
});

// 注册缺省任务
gulp.task('default', ['index']);