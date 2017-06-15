var gulp = require('gulp');
var del = require('del');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var gls = require('gulp-live-server');

gulp.task('clean', function (cb) {
    del([
        'dist',
        'public'
    ], cb);
});

gulp.task('bundle-min', function () {
    return gulp.src(
        [
            'src/**/*.js'
        ]
    )
        .pipe(concat('specialview.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
});
gulp.task('bundle-max', function () {
    return gulp.src(
        [
            'src/**/*.js'
        ]
    )
        .pipe(concat('specialview.js'))
        .pipe(gulp.dest('dist/'));
});
gulp.task('bundle-min', function () {
    return gulp.src(
        [
            'src/**/*.js'
        ]
    )
        .pipe(concat('specialview.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
});

gulp.task('bundle-js', ['bundle-max', 'bundle-min']);

gulp.task("bundle-sass", function () {
    return gulp.src('src/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(concat('site.min.css'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('build', ['clean','bundle-js', 'bundle-sass']);

gulp.task('watch', function () {
    gulp.watch('src/**/*.scss', ['build']);
    gulp.watch('src/**/*.js', ['build']);
});
gulp.task('serve', function () {
    var server = gls.static('./', 8888);
    server.start();
});