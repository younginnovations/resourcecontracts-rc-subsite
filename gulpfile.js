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
    './resources/assets/scripts/lib/summernote.js',
    './resources/assets/scripts/lib/bootstrap-editable.min.js',
    './resources/assets/scripts/page.js'
];

var annotation_view_script = [
    './public/scripts/lib/underscore.js',
    './public/scripts/lib/backbone.js',
    './public/scripts/lib/director.min.js',
    './public/scripts/contract.view.custom/models/pages.js',
    './public/scripts/contract.view.custom/models/annotations.js',
    './public/scripts/contract.view.custom/models/search.js',
    './public/scripts/contract.view.custom/models/metadata.js',
    './public/scripts/contract.view.custom/models/contract.js',
    './public/scripts/contract.view.custom/models/pdf.js',
    './public/scripts/lib/annotator/annotator-full.min.js',
    './public/scripts/lib/annotator.plugin.annotorious.js',
    './public/scripts/contract.view.custom/annotation/annotator.utils.js',
    './public/scripts/contract.view.custom/annotation/annotator.plugin.event.js',
    './public/scripts/contract.view.custom/annotation/annotator.plugin.viewer.js',
    './public/scripts/contract.view.custom/annotation/rc.annotator.js',
    './public/scripts/contract.view.custom/rc.utils.js'
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
    gulp.watch(annotation_view_script, ['js-annotation']);

});

/*ation-
 * Default task, running just `gulp` will compile the sass,
 */
gulp.task('default', ['sass', 'watch']);


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

gulp.task('js-annotation', function () {
    return gulp.src(annotation_view_script)
        .pipe(concat('contract-view.js'))
        .pipe(gulp.dest('./public/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'))
        .pipe(notify({message: 'Js-annotation task complete'}));
});