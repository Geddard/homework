var browserify = require('browserify');
var concat = require('gulp-concat');
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var notify = require('gulp-notify');
var nodemon = require('gulp-nodemon');
var path = require("path");
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');

var handleErrors = function () {
    notify.onError({
        message: "<%= error.message %>"
    }).apply(this, arguments);

    this.emit('end');
};

var paths = [
    'main.js',
    'components/*.js'
];
var scssPaths = [
    '*.scss',
    'components/*.scss'
];

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
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

gulp.task('sass', function () {
    gulp.src(scssPaths)
        .pipe(sass({outputStyle: 'compressed'}))
        .on('error', handleErrors)
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('dist'))
        .pipe(livereload());

});

gulp.task('copy', ['bundle'], function () {
    return gulp.src(['index.html', 'style.css'])
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['copy', 'sass'], function () {
    livereload.listen(35680);
    gulp.watch(paths, ['copy']);
    gulp.watch(scssPaths, ['sass']);
});

gulp.task('start', ['watch'], function () {
    nodemon({
        script: 'server.js',
        watch: 'server.js',
        env: {
            'NODE_ENV': 'development'
        }
    });
});

gulp.task('default', ['start']);
