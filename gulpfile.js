var browserify = require('browserify');
var concat = require('gulp-concat');
var gulp = require('gulp');
var notify = require('gulp-notify');
var path = require("path");
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var source = require('vinyl-source-stream');

var handleErrors = function () {
    notify.onError({
        message: "<%= error.message %>"
    }).apply(this, arguments);

    this.emit('end');
};

gulp.task('bundle', function () {
    return browserify({
            entries: 'main.js', debug: true,
            paths: [path.join(__dirname)],
        })
        .transform('babelify', {
            plugins: ['transform-class-properties'],
            presets: ['es2015', 'react']
        })
        .bundle()
        .on('error', handleErrors)
        .pipe(source('main.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
    gulp.src('components/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .on('error', handleErrors)
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('dist'));

});

gulp.task('copy', ['bundle', 'sass'], function () {
    return gulp.src(['index.html', 'style.css'])
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['copy']);
