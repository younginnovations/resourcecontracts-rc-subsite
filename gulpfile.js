var gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    uglifycss = require('gulp-uglifycss'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    react = require('gulp-react');

var theme_default = [
    './resources/assets/scss/themes/default.scss',
];

var theme_rc = [
    './resources/assets/scss/themes/rc.scss',
];

var theme_olc = [
    './resources/assets/scss/themes/olc.scss',
];

var contract_style = [
    './resources/assets/scss/contract/contract.scss',
];

var homepage_style = [
    './resources/assets/styles/slick.css',
];

var base_script = [
    './resources/assets/scripts/jquery.js',
    './resources/assets/scripts/lib/jquery.cookie.js',
    './resources/assets/scripts/lib/underscore.js',
    './resources/assets/scripts/lib/backbone.js',
    './resources/assets/scripts/lib/backbone.localstorage.js',
    './resources/assets/scripts/clips/collection/clip.local.js',
    './resources/assets/scripts/clips/main.js',

    './resources/assets/scripts/bootstrap.js',
    './resources/assets/scripts/select2.js',
    './resources/assets/scripts/script.js',
    './resources/assets/scripts/sb-admin.js'
];

var country_script = [
    './resources/assets/scripts/lib/backbone.fetch-cache.min.js',
    './resources/assets/scripts/countries.js'
];

var resource_script = [
    './resources/assets/scripts/lib/backbone.fetch-cache.min.js',
    './resources/assets/scripts/resources.js',
];

var clipping_script = [
    './resources/assets/scripts/lib/react/react-with-addons.js',
    './resources/assets/scripts/lib/backbone.paginator.min.js',
    './resources/assets/scripts/clips/collection/clip.js',
    './resources/assets/scripts/clips/views/filter.js',
    './resources/assets/scripts/clips/views/clipselectcount.js',
    './resources/assets/scripts/clips/views/download.js',
    './resources/assets/scripts/clips/views/share.js',
    './resources/assets/scripts/clips/views/pagination.js',
    './resources/assets/scripts/clips/views/item.js',
    './resources/assets/scripts/clips/views/listing.js',
    './resources/assets/scripts/clips/views/main.js',
    './resources/assets/scripts/clips/views/clip.main.js',
    './resources/assets/scripts/clips/clip.main.js'
];


var page_script = [
    './resources/assets/scripts/lib/summernote.js',
    './resources/assets/scripts/lib/bootstrap-editable.min.js',
    './resources/assets/scripts/page.js'
];

var contract_view_scripts = [
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

var homepage_script = [
    './resources/assets/scripts/homepage/d3.min.js',
    './resources/assets/scripts/homepage/geoJson/geoJsonData.js',
    './resources/assets/scripts/homepage/world-map.js',
    './resources/assets/scripts/homepage/slick.js',
    './resources/assets/scripts/homepage/slider.js',
];

/* Compile files from _scss */
gulp.task('default_theme', function () {
    return gulp.src(theme_default)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer({browsers: ['last 30 versions', '> 1%', 'ie 8', 'ie 7']})]))
        .pipe(sourcemaps.write('./maps'))
        .pipe(uglifycss({
            "max-line-len": 80
        }))
        .pipe(rename({
            basename: "",
            prefix: "style",
            extname: ".css"
        }))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('rc', function () {
    return gulp.src(theme_rc)

        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer({browsers: ['last 30 versions', '> 1%', 'ie 8', 'ie 7']})]))
        .pipe(sourcemaps.write('./maps'))
        .pipe(uglifycss({
            "max-line-len": 80
        }))
        .pipe(rename({
            basename: "",
            prefix: "style",
            extname: ".css"
        }))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('olc', function () {
    return gulp.src(theme_olc)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer({browsers: ['last 30 versions', '> 1%', 'ie 8', 'ie 7']})]))
        .pipe(sourcemaps.write('./maps'))
        .pipe(uglifycss({
            "max-line-len": 80
        }))
        .pipe(rename({
            basename: "",
            prefix: "style",
            extname: ".css"
        }))
        .pipe(gulp.dest('./public/css'));
});



/*
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('./resources/assets/scss/pages/*.scss', ['olc']);
    gulp.watch(contract_style, ['contract-style']);
    gulp.watch(base_script, ['js-base']);
    gulp.watch(country_script, ['js-country']);
    gulp.watch(resource_script, ['js-resource']);
    gulp.watch(clipping_script,['js-clipping']);
    gulp.watch(page_script, ['js-page']);
    gulp.watch(contract_view_scripts, ['js-react']);
    gulp.watch(homepage_script, ['js-homepage']);
});

gulp.task('homepage-style',function(){
    return gulp.src(homepage_style)
        .pipe(concat('homepage.css'))
        .pipe(gulp.dest('./public/css'))
        .pipe(uglifycss({
            "max-line-len": 80
        }))
        .pipe(gulp.dest('./public/css'))
        .pipe(notify({message: 'css-homepage task complete'}));
});

gulp.task('contract-style',function(){
    return gulp.src(contract_style)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer({browsers: ['last 30 versions', '> 1%', 'ie 8', 'ie 7']})]))
        .pipe(sourcemaps.write('./maps'))
        .pipe(uglifycss({
            "max-line-len": 80
        }))
        .pipe(rename({
            basename: "",
            prefix: "contract",
            extname: ".css"
        }))
        .pipe(gulp.dest('./public/css'))
        .pipe(notify({message: 'css-contract task complete'}));
});


/*
 * Default task, running just `gulp` will compile the sass,
 */

gulp.task('default', ['watch']);


gulp.task('js-base', function () {
    return gulp.src(base_script)
        .pipe(react())
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

gulp.task('js-clipping', function () {
    return gulp.src(clipping_script)
        .pipe(react())
        .pipe(concat('clipping.js'))
        .pipe(gulp.dest('./public/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'))
        .pipe(notify({message: 'Js-clipping task complete'}));
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

gulp.task('js-homepage', function () {
    return gulp.src(homepage_script)
        .pipe(concat('homepage.js'))
        .pipe(gulp.dest('./public/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'))
        .pipe(notify({message: 'Js-homepage task complete'}));
});
