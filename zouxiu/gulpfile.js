


// 引入包
var gulp = require("gulp");
var sass = require("gulp-sass");

// 开启gulp任务     sass
gulp.task("compileSass",function(){
    return gulp.src(["./src/sass/*.scss"])
    .pipe(sass({outputStyle:"expanded"}).on('error',sass.logError))
    .pipe(gulp.dest("./src/css/"))
})

// 开启监听任务
gulp.task("jt",function(){
    gulp.watch("./src/sass/*.scss",gulp.series("compileSass"))
})