
"use strict";

/**
 * 1. LESS编译 压缩 合并
 * 2. JS合并 压缩 混淆
 * 3. img复制
 * 4. html压缩
 */

// 在gulpfile中先载入gulp包，因为这个包提供了一些API
var gulp = require("gulp");

/*测试gulp运行*/ 
gulp.task("hello", function() {
  console.log("hello");
});

// var less = require('gulp-less');// 1. LESS编译
var cssnano = require("gulp-cssnano");// 2. CSS压缩

// 1. LESS编译 压缩 --合并没有必要，一般预处理CSS都可以导包
gulp.task("style", function() {
  // 这里是在执行style任务时自动执行的
  // gulp.src(['src/styles/*.less', '!src/styles/_*.less'])
    gulp.src("BDSearch.css")
    // .pipe(less())
    .pipe(cssnano())
    .pipe(gulp.dest("dis/"))//输出文件目录
    .pipe(browserSync.reload({//浏览器同步
      stream: true
    }));
});

var concat = require("gulp-concat");//合并文件
var uglify = require("gulp-uglify");// 压缩代码

// 2. JS合并 压缩混淆
gulp.task("script", function() {
  gulp.src(["jquery-1.11.2.js","BDSearch.js"])
    .pipe(concat('all.js'))//合并
    .pipe(uglify())//压缩
    .pipe(gulp.dest("dis/"))
    .pipe(browserSync.reload({//浏览器同步
      stream: true
    }));
});

// 3. 图片复制
// gulp.task('image', function() {
//   gulp.src('src/images/*.*')
//     .pipe(gulp.dest('dist/images'))
//     .pipe(browserSync.reload({
//       stream: true
//     }));
// });

var htmlmin = require("gulp-htmlmin");//压缩html
// 4. HTML
gulp.task("html", function() {
  gulp.src("BDSearch.html")
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest("dis/"))
    .pipe(browserSync.reload({
      stream: true
    }));
});

var browserSync = require("browser-sync");
gulp.task("serve", function() {
  browserSync({
    server: {
      baseDir: ["dis/"]//输出的根目录，打开文件
    },
  }, function(err, bs) {
    console.log(bs.options.getIn(["urls", "local"]));
  });

  gulp.watch("BDSearch.css",["style"]);
  gulp.watch("BDSeach.js",["script"]);
  // gulp.watch('src/images/*.*',['image']);
  gulp.watch("BDSearch.html",["html"]);
});
