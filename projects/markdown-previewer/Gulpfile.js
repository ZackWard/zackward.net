var gulp = require('gulp');
var sass = require('gulp-sass');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

gulp.task('default', ['typescript', 'sass'], function () {
    console.log("Default task");
});

gulp.task("typescript", function () {
    console.log("In task typescript");
    tsProject.src()
        .pipe(ts(tsProject))
        .js.pipe(gulp.dest('./dist'));
});

gulp.task("sass", function () {
    console.log("In task sass");
    gulp.src('./src/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist'));
});