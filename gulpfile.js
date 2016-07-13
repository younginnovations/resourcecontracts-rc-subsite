var gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    react = require('gulp-react');

var css_files = [
    './resources/assets/styles/bootstrap.css',
    './resources/assets/styles/sb-admin-2.css',
    './resources/assets/styles/font-awesome.css',
    './resources/assets/styles/select2.css'
];

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

var contract_view_scripts = [
    './resources/assets/scripts/lib/underscore.js',
    './resources/assets/scripts/lib/backbone.js',
    './resources/assets/scripts/lib/director.min.js',
    './resources/assets/scripts/contract.view.custom/models/pages.js',
    './resources/assets/scripts/contract.view.custom/models/annotations.js',
    './resources/assets/scripts/contract.view.custom/models/search.js',
    './resources/assets/scripts/contract.view.custom/models/metadata.js',
    './resources/assets/scripts/contract.view.custom/models/contract.js',
    './resources/assets/scripts/contract.view.custom/models/pdf.js',
    './resources/assets/scripts/lib/annotator/annotator-full.min.js',
    './resources/assets/scripts/contract.view.custom/annotation/annotator.utils.js',
    './resources/assets/scripts/contract.view.custom/annotation/annotator.plugin.event.js',
    './resources/assets/scripts/contract.view.custom/annotation/annotator.plugin.viewer.js',
    './resources/assets/scripts/lib/pdf-annotator.js',
    './resources/assets/scripts/contract.view.custom/annotation/rc.annotator.js',
    './resources/assets/scripts/contract.view.custom/rc.utils.js',
    './resources/assets/scripts/lib/react/react-with-addons.js',
    './resources/assets/scripts/contract.view.custom/views/react.waypoint.js',
    './resources/assets/scripts/contract.view.custom/views/react.pdf.js',
//    './resources/assets/scripts/contract.view.custom/views/ReactPDF.js',
    './resources/assets/scripts/contract.view.custom/views/pdf.view.js',
    './resources/assets/scripts/contract.view.custom/views/metadata.view.js',
    './resources/assets/scripts/contract.view.custom/views/text.view.js',
    './resources/assets/scripts/contract.view.custom/views/text.search.js',
    './resources/assets/scripts/contract.view.custom/views/annotations.view.js',
    './resources/assets/scripts/contract.view.custom/views/main.view.js'
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
    gulp.watch('./resources/assets/scss/contract-view.scss', ['sass']);
    gulp.watch('./resources/assets/scss/responsive.scss', ['sass']);
    gulp.watch('./resources/assets/scss/style.scss', ['sass']);
    gulp.watch(base_script, ['js-base']);
    gulp.watch(country_script, ['js-country']);
    gulp.watch(resource_script, ['js-resource']);
    gulp.watch(page_script, ['js-page']);
    gulp.watch(contract_view_scripts, ['js-react']);
    gulp.watch(css_files, ['css-main']);
});

/*
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

gulp.task('js-react', function () {
    return gulp.src(contract_view_scripts)
        .pipe(sourcemaps.init())
        .pipe(react())
        .pipe(concat('contract-view.js'))
        .pipe(gulp.dest('./public/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'))
        .pipe(notify({message: 'React task complete'}));
});

gulp.task('css-main', function () {
    return gulp.src(css_files)
        .pipe(sourcemaps.init())
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./public/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('./public/css'))
        .pipe(notify({message: 'Min-css task complete'}));
});