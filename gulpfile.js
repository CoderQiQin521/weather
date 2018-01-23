var gulp = require('gulp');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var imagemin = require('gulp-imagemin');
var fileinclude = require('gulp-file-include');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
//var  jshint = require('gulp-jshint');

//html压缩
var htmlmin = require('gulp-htmlmin');
//报错-不退出任务
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
//删除
var clean = require('gulp-clean');
//css前缀
var autoprefixer = require('gulp-autoprefixer');
//压缩css
var cleanCSS = require('gulp-clean-css');

//开启浏览器热刷新
gulp.task('server', function() {
	connect.server({
		root: 'dist',
		port: 8080,
		livereload: true
	});
});

gulp.task('jade',function () {
//	var data = require('./data.json');
	gulp.src('src/*.jade')
	.pipe(jade({
		pretty:true
	}))
	.pipe(gulp.dest('dist'))
});

//检测js代码错误
//gulp.task('jshint',function () {
//	return gulp.src('src/js/*.js')
//	.pipe(jshint())
//	.pipe(jshint.reporter());
//});

//合并文件
gulp.task('fileinclude', function() {
	gulp.src('src/*.html')
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(htmlmin({
			minifyJS: true, //压缩页面JS
			minifyCSS: true, //压缩页面css
			removeComments: true,
			collapseWhitespace: true,
			removeScriptTypeAttributes: true
		}))
		.pipe(gulp.dest('dist'))
		.pipe(connect.reload());
});

//sass/scss编译
gulp.task('sass', function() {
	return gulp.src('src/css/**/*.{scss,sass}')
		.pipe(plumber({
			errorHandler: notify.onError('Error: <%= error.message %>')
		}))
		.pipe(autoprefixer())
		.pipe(sass())
		.pipe(gulp.dest('src/css'))
		.pipe(cleanCSS())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('src/css'))
		.pipe(connect.reload());
});

//拷贝css
gulp.task('copy-css', function() {
	return gulp.src('src/css/*.min.css')
		.pipe(gulp.dest('dist/css'))
		.pipe(connect.reload());
});

//拷贝js
gulp.task('copy-js', function() {
	return gulp.src('src/js/*.js')
		.pipe(gulp.dest('dist/js'))
		.pipe(connect.reload());
});

//图片复制
gulp.task("copy-img",function () {
	return gulp.src('src/img/*.*')
		.pipe(imagemin({
            optimizationLevel: 5 //类型：Number  默认：3  取值范围：0-7（优化等级）
        }))
		.pipe(gulp.dest('dist/img'))
		.pipe(connect.reload());
});

//组合任务
gulp.task('watch', function() {
	gulp.watch('src/css/*.scss', ['sass', 'copy-css','copy-js']);
	gulp.watch('src/css/*.css', ['copy-css','copy-js']);
	gulp.watch('src/public/*.html', ['fileinclude']);
	gulp.watch('src/*.html', ['fileinclude', 'copy-css','copy-js']);
	gulp.watch('src/*.js', ['fileinclude', 'copy-js']);
	gulp.watch('src/img/*.*', ['copy-img']);

});

gulp.task('default', ['server', 'watch'], function() {
	console.log('Gulp任务执行成功,开始撸代码!');
});


//执行删除dist文件夹
gulp.task('clean', function() {
	return gulp.src('dist/*')
		.pipe(clean());
});


//拷贝src文件夹下的文件到dist
gulp.task('data', function() {
	return gulp.src('src/**')
		.pipe(gulp.dest('dist'));
});

//拷贝src文件夹下的的img到dist
//gulp.task('imagemin2', function() {
//	gulp.src('src/img/**/*.{png,jpg,gif,jpeg,svg,ico}')
//		.pipe(imagemin())
//		.pipe(gulp.dest('dist/img'));
//});