
[toc]
#### api
```javascript
gulp.src( globs[, options] )
globs[String or Array] => 要处理的文件路径
options[Object] => 可选参数
var options = {
    buffer: true,
    // 默认true，如果该项被设置为 false，那么将会以 stream 方式返回 file.contents 而不是文件 buffer 的形式。这在处理一些大文件的时候将会很有用。**注意：**插件可能并不会实现对 stream 的支持。
    read: true,
    // 默认true，如果该项被设置为 false， 那么 file.contents 会返回空值（null），也就是并不会去读取文件。
    base: 'xxx'
    // 该值用法如下
}

```
2016-3-2
#### gulp构建项目
##### 初始工作
```
// 下载插件到本地
npm install gulp-xxx --save-dev
// --save-dev => 表示把插件信息写入到配置表package.json中，以后直接拿package.json到新项目中，然后npm install 就可以把之前项目的插件都初始化

// 引入插件
var xxxPlugin = require( pluginName );

// 创建任务
gulp.task( taskName, function (){

} )
// 调用插件
xxxPlugin()
```
##### 使用gulp-load-plugins插件自动引用项目里有的插件
```javascript
var plugins = require('gulp-load-plugins');
// 该插件加载进来后，以后项目有的插件都可以通过该插件调用

// 例如调用sass
plugins.sass()
// 有的插件名字类似这种gulp-rev-replace
调用这样：
plugins.revReplace();

```
##### 压缩css => gulp-minify-css
```
// 引入插件
var minify = require('gulp-minify-css')()
// 1.没有options.base
// 创建任务
gulp.task('minCss', function (){
    // 找到css
    gulp.src('src/css/*.css')
        // 压缩
        .pipe( minify() )
        // 输出压缩版
        .pipe( gulp.dest( 'dist' )  )
})
// options.base
gulp.task('minCss', function (){
    // 找到css
    var options.base = 'src';
    gulp.src('src/css/*.css', options)
        // 压缩
        .pipe( minify() )
        // 输出压缩版
        .pipe( gulp.dest( 'dist' )  )
})
如：
    根目录
    └──dist
    └──src
        └──css
            └──a.css
        └──scss
            └──a.scss
压缩后
1.
    根目录
    └──dist
        └──a.css
    └──src
        └──css
            └──a.css
        └──scss
            └──a.scss
2.
    根目录
    └──dist
        └──css
            └──a.css
    └──src
        └──css
            └──a.css
        └──scss
            └──a.scss



```
##### 多个文件合并 => gulp-concat
```
var concat = require('gulp-concat');
gulp.task( 'concat', function (){
    gulp.src( ['css/a.css', 'css/b.css'] )
        .pipe( concat('global.css') )
        pipe( gulp.dest( 'dist' ) )
} )
    根目录
    └──dist
        └──global.css
    └──css
        └──a.css
        └──b.css
```