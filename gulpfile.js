var gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

var base_script = [
    './resources/assets/scripts/jquery.js',
    './resources/assets/scripts/bootstrap.js',
    './resources/assets/scripts/select2.js',
    './resources/assets/scripts/script.js',
    './resources/assets/scripts/sb-admin.js'
];

var country_script = [
    './resources/assets/scripts/lib/underscore.js',
    './resources/assets/scripts/lib/backbone.js',
    './resources/assets/scripts/lib/backbone.fetch-cache.min.js',
    './resources/assets/scripts/countries.js'
];

var resource_script = [
    './resources/assets/scripts/lib/underscore.js',
    './resources/assets/scripts/lib/backbone.js',
    './resources/assets/scripts/lib/backbone.fetch-cache.min.js',
    './resources/assets/scripts/resources.js'
];

var page_script = [
    './public/js/lib/summernote/summernote.js',
    './public/js/lib/editable/bootstrap-editable.min.js',
    './resources/assets/scripts/page.js'
];

/**
 * Compile files from _scss
 */
gulp.task('sass', function () {
    return gulp.src('./resources/assets/scss/*-style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer({browsers: ['last 30 versions', '> 1%', 'ie 8', 'ie 7']})]))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./public/css'));
});

/*
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('./resources/assets/scss/*-style.scss', ['sass']);
    gulp.watch(base_script, ['js-base']);
    gulp.watch(country_script, ['js-resource']);
    gulp.watch(resource_script, ['js-resource']);
    gulp.watch(page_script, ['js-page']);

});

/*
 * Default task, running just `gulp` will compile the sass,
 */
gulp.task('default', ['sass', 'watch','js-base','js-country','js-resource','js-page']);


gulp.task('js-base', function () {
    return gulp.src(base_script)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./public/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'))
        .pipe(notify({message: 'Js-base task complete'}));
});

gulp.task('js-country', function () {
    return gulp.src(country_script)
        .pipe(concat('country.js'))
        .pipe(gulp.dest('./public/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'))
        .pipe(notify({message: 'Js-country task complete'}));
});

gulp.task('js-resource', function () {
    return gulp.src(resource_script)
        .pipe(concat('resource.js'))
        .pipe(gulp.dest('./public/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'))
        .pipe(notify({message: 'Js-resource task complete'}));
});

gulp.task('js-page', function () {
    return gulp.src(page_script)
        .pipe(concat('page.js'))
        .pipe(gulp.dest('./public/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'))
        .pipe(notify({message: 'Js-page task complete'}));
});