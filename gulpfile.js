var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    postcss      = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    concat  = require('gulp-concat');

/**
* Compile files from _scss
*/
gulp.task('sass', function () {
    return gulp.src('./resources/assets/scss/*-style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([ autoprefixer({ browsers: ['last 30 versions', '> 1%', 'ie 8', 'ie 7'] }) ]))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./public/css'));
});

/*
* Watch scss files for changes & recompile
* Watch html/md files, run jekyll & reload BrowserSync
*/
gulp.task('watch', function () {
    gulp.watch('./resources/assets/scss/*-style.scss', ['sass']);
});

/*
* Default task, running just `gulp` will compile the sass,
*/
gulp.task('default', ['sass', 'watch']);