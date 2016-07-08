var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var concat = require('gulp-concat');

var fileList = [
   './src/components/MDPDisplay.jsx',
   './src/components/MDPInput.jsx',
   './src/components/MDPApp.jsx'
];

gulp.task('default', ['sass', 'babel'], function () {
});

gulp.task("sass", function () {
    gulp.src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./dist'));
});

gulp.task("babel", function () {
    gulp.src(fileList)
        .pipe(babel({
            presets: ['react']
        }))
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist'));
});