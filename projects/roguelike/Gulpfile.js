var gulp = require('gulp');
var ts = require('gulp-typescript');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var webpack = require('webpack-stream');

var sassFiles = [
    "./src/sass/app.scss"
];

gulp.task('default', ['sass', 'webpack'], function () {

});

gulp.task("sass", function () {
    gulp.src(sassFiles)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist'));
});

gulp.task('webpack', function () {
    gulp.src('./src/index.tsx')
        .pipe(webpack( require('./webpack.config.js') ))
        .pipe(gulp.dest('dist/'));
});