var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var webserver = require('gulp-webserver');
var url = require('url');
var mockApi = require('./mock');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', ['sass'], function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});


//web服务器
gulp.task('server', function() {
  var environment = require("./environments.json");
  var ENV = environment['development'];
  gulp.src(ENV.serverPath) // 服务器目录（./代表根目录）
    .pipe(webserver({ // 运行gulp-webserver
      port: ENV.port, //端口，默认8000
      livereload: true, // 启用LiveReload
      //open: true, // 服务器启动时自动打开网页
      directoryListing: {
        enable: true,
        path: ENV.serverPath
      },
      //proxies: [
      //    {
      //        source: '/api', target: 'http://127.0.0.1:8080'
      //    }
      //],
      middleware: function(req, res, next) {
        var urlObj = url.parse(req.url, true),
          method = req.method,
          paramObj = urlObj.query;
        // mock数据
        mockApi(res, urlObj.pathname, paramObj, next);
      },
      open: 'http://localhost:' + ENV.port + '/index.html'
    }));
});
