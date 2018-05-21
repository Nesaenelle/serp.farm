var gulp = require('gulp');
var sass = require('gulp-sass');
var server = require('gulp-server-livereload');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pump = require('pump');
var cssmin = require('gulp-cssmin');

//style paths
var sassFiles = 'scss/style.scss',
    cssDest = './dist';

gulp.task('styles', function() {
    gulp.src(sassFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(gulp.dest(cssDest));
});



gulp.task('scripts', function(cb) {
    pump([
            gulp.src('./js/*.js'),
         //   uglify(),
            concat('all.js'),
            gulp.dest('dist')
        ],
        cb
    );
});

gulp.task('watch', function() {
    gulp.watch('scss/**', ['styles']);
    gulp.watch('js/**', ['scripts']);
});

gulp.task('webserver', ['styles', 'scripts', 'watch'], function() {
    gulp.src('')
        .pipe(server({
            livereload: true,
            defaultFile: 'index.html',
            open: false
        }));
});