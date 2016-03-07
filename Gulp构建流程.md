
#### 构建步骤


```javascript
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
```
1、 处理html文件里的静态资源
>合并压缩并替换路径
```html
// index.html
// css
<!-- build:css dist/lib/css/base.min.css -->
<link href="../lib/css/a.css" rel="stylesheet">
<!-- endbuild -->

// js
<!-- build:js dist/lib/js/base.min.js -->
<script type="text/javascript" src="../lib/js/a.js"></script>
<!-- endbuild -->
```
```gulp
var useref = require('gulp-useref');
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
```
```
gulp compress

[18:45:26] Starting 'clean'...
[18:45:26] Starting 'src:sass'...
[18:45:26] Finished 'src:sass' after 3.46 ms
[18:45:26] Starting 'lib:sass'...
[18:45:26] Finished 'lib:sass' after 1.34 ms
[18:45:26] Starting 'sass'...
[18:45:26] Finished 'sass' after 2.28 μs
[18:45:26] Finished 'clean' after 35 ms
[18:45:26] Starting 'compress'...
[18:45:26] Finished 'compress' after 220 ms
```
```
├── dist
└── src
    ├── .temp
        ├── lib
            ├── js
                └── base.min.7cc98ad0.js
            ├── css
                └── base.min.7cc98ad0.js
        ├── html
            └── index.html
    ├── images
        └── 1.jpg
    ├── fonts
        └── ratchicons.ttf
    ├── css
        └── a.css
    ├── scss
        └── a.scss
    ├── js
        └── a.js
    ├── html
        └── index.html
```
```
// index.html
// css
<link href="dist/lib/css/base.min.7cc98ad0.css" rel="stylesheet">

// js
<script type="text/javascript" src="dist/lib/js/base.min.7cc98ad0.js"></script>
```
```
├── dist
└── src
    ├── images
        └── 1.jpg
    ├── fonts
        └── ratchicons.ttf
    ├── css
        └── a.css
    ├── scss
        └── a.scss
    ├── js
        └── a.js
    ├── html
        └── index.html
```

2、 把.temp里面处理过的文件移到正式目录去
```gulp
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
```
```javascript
gulp move
```
```
├── dist
    ├── lib
        ├── js
            └── base.min.7cc98ad0.js
        ├── css
            └── base.min.7cc98ad0.js
    ├── html
        └── index.html
└── src
    ├── .temp
        ├── lib
            ├── js
                └── base.min.7cc98ad0.js
            ├── css
                └── base.min.7cc98ad0.js
        ├── html
            └── index.html
    ├── images
        └── 1.jpg
    ├── fonts
        └── ratchicons.ttf
    ├── css
        └── a.css
    ├── scss
        └── a.scss
    ├── js
        └── a.js
    ├── html
        └── index.html
```
```javascript
gulp move
[18:44:28] Starting 'move'...
[18:44:28] Finished 'move' after 6.84 ms
```
3、清除.temp目录
```gulp
var clean = require('gulp-clean');
gulp.task('clean', function () {
    return gulp.src( [release.path], {read: false} )
        .pipe( clean({force: true}) );
});
```
```javascript
gulp clear

[18:44:04] Starting 'clean'...
[18:44:04] Finished 'clean' after 7.55 ms
```
4、编译scss
```gulp
var sass = require('gulp-sass');
var replace = require('gulp-replace');
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
```
```javascript
gulp sass

[18:41:42] Starting 'src:sass'...
[18:41:42] Finished 'src:sass' after 6.62 ms
[18:41:42] Starting 'lib:sass'...
[18:41:42] Finished 'lib:sass' after 1.84 ms
[18:41:42] Starting 'sass'...
[18:41:42] Finished 'sass' after 2.28 μs
```
5、监听sass
```gulp
var watch = require('gulp-watch');
gulp.task('watch:sass', function (){
	gulp.run('sass');
	watch('src/**/*.scss', function (e){
		gulp.run('sass');
	})
})
```
```javascript
gulp watch:sass

[18:43:15] Starting 'watch:sass'...
gulp.run() has been deprecated. Use task dependencies or gulp.watch task triggering instead.
[18:43:15] Starting 'src:sass'...
[18:43:15] Finished 'src:sass' after 6.8 ms
[18:43:15] Starting 'lib:sass'...
[18:43:15] Finished 'lib:sass' after 2.27 ms
[18:43:15] Starting 'sass'...
[18:43:15] Finished 'sass' after 2.85 μs
[18:43:15] Finished 'watch:sass' after 21 ms
```