var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleanCss = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync').create(),
    webpack = require("webpack-stream"),
    reload = browserSync.reload;

gulp.task("serve", ["build"], function() {
    browserSync.init({
        server: {
            baseDir: "./public/"
        }
    });

    gulp.watch("./src/assets/**/*.scss", ["sass"]);
    gulp.watch("./src/assets/**/*.js", ["js"]);
    gulp.watch("./src/index.html", ["indexCopy"]);
    gulp.watch("./public/**/*.*").on('change', reload);
});

gulp.task("sass", function() {
    return gulp.src("./src/assets/css/style.scss")
        .pipe(sass())
        .pipe(cleanCss())
        .pipe(gulp.dest("./public/assets/css/"))
        .pipe(browserSync.stream());
});

gulp.task("js", function() {
    return gulp.src("./src/assets/js/index.js")
        .pipe(webpack(require("./webpack.config.js")))
        .pipe(gulp.dest("./public/assets/js/"))
});

gulp.task("indexCopy", function() {
    return gulp.src("./src/index.html")
        .pipe(gulp.dest("./public/"))
});

gulp.task("build", ["sass", "js", "indexCopy"]);

gulp.task("default", ["serve"]);