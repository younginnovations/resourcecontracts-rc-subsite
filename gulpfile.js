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

var theme_default = ['./resources/assets/scss/themes/default.scss'];

var theme_rc = ['./resources/assets/scss/themes/rc.scss'];

var theme_olc = ['./resources/assets/scss/themes/olc.scss'];

var theme_blue_style = ['./resources/assets/scss/themes/countries/tn.scss'];

var contract_style = ['./resources/assets/scss/contract/contract.scss'];

var theme_new = ['./resources/assets/scss/new-style.scss'];

var theme_rc_new = ['./resources/assets/scss/themes/new-rc.scss'];

var theme_olc_new = ['./resources/assets/scss/themes/new-olc.scss'];

var country_script = [
  './resources/assets/scripts/vendor/backbone/underscore.js',
  './resources/assets/scripts/vendor/backbone/backbone.js',
  './resources/assets/scripts/vendor/backbone/backbone.fetch-cache.min.js',
  './resources/assets/scripts/countries.js',
];

var resource_script = [
  './resources/assets/scripts/vendor/backbone/underscore.js',
  './resources/assets/scripts/vendor/backbone/backbone.js',
  './resources/assets/scripts/vendor/backbone/backbone.fetch-cache.min.js',
  './resources/assets/scripts/resources.js',
];

var clipping_script = ['./resources/assets/scripts/contract/clip/clip-main.js'];

var homepage_script = [
  './resources/assets/scripts/homepage/d3.min.js',
  './resources/assets/scripts/homepage/geoJson/geoJsonData.js',
  './resources/assets/scripts/homepage/world-map.js',
  './resources/assets/scripts/homepage/slick.js',
  './resources/assets/scripts/homepage/slider.js',
];

/* Compile files from _scss
 */
gulp.task('default_theme', function () {
  return gulp
    .src(theme_default)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(
      postcss([
        autoprefixer({
          browsers: ['last 30 versions', '> 1%', 'ie 8', 'ie 7'],
        }),
      ])
    )
    .pipe(sourcemaps.write('./maps'))
    .pipe(
      uglifycss({
        'max-line-len': 80,
      })
    )
    .pipe(
      rename({
        basename: '',
        prefix: 'style',
        extname: '.css',
      })
    )
    .pipe(gulp.dest('./public/css'));
});

gulp.task('new_theme', function () {
  return gulp
    .src(theme_new)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(
      postcss([
        autoprefixer({
          browsers: ['last 30 versions', '> 1%', 'ie 8', 'ie 7'],
        }),
      ])
    )
    .pipe(sourcemaps.write('./maps'))
    .pipe(
      uglifycss({
        'max-line-len': 80,
      })
    )
    .pipe(
      rename({
        basename: '',
        prefix: 'new-style',
        extname: '.css',
      })
    )
    .pipe(gulp.dest('./public/css'));
});

gulp.task('rc', function () {
  return gulp
    .src(theme_rc)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(
      postcss([
        autoprefixer({
          browsers: ['last 30 versions', '> 1%', 'ie 8', 'ie 7'],
        }),
      ])
    )
    .pipe(sourcemaps.write('./maps'))
    .pipe(
      uglifycss({
        'max-line-len': 80,
      })
    )
    .pipe(
      rename({
        basename: '',
        prefix: 'style',
        extname: '.css',
      })
    )
    .pipe(gulp.dest('./public/css'));
});

gulp.task('olc', function () {
  return gulp
    .src(theme_olc)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(
      postcss([
        autoprefixer({
          browsers: ['last 30 versions', '> 1%', 'ie 8', 'ie 7'],
        }),
      ])
    )
    .pipe(sourcemaps.write('./maps'))
    .pipe(
      uglifycss({
        'max-line-len': 80,
      })
    )
    .pipe(
      rename({
        basename: '',
        prefix: 'style',
        extname: '.css',
      })
    )
    .pipe(gulp.dest('./public/css'));
});

gulp.task('theme_blue', function () {
  return gulp
    .src(theme_blue_style)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(
      postcss([
        autoprefixer({
          browsers: ['last 30 versions', '> 1%', 'ie 8', 'ie 7'],
        }),
      ])
    )
    .pipe(sourcemaps.write('./maps'))
    .pipe(
      uglifycss({
        'max-line-len': 80,
      })
    )
    .pipe(
      rename({
        basename: '',
        prefix: 'style',
        extname: '.css',
      })
    )
    .pipe(gulp.dest('./public/css'));
});

gulp.task('contract-style', function () {
  return gulp
    .src(contract_style)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(
      postcss([
        autoprefixer({
          browsers: ['last 30 versions', '> 1%', 'ie 8', 'ie 7'],
        }),
      ])
    )
    .pipe(sourcemaps.write('./maps'))
    .pipe(
      uglifycss({
        'max-line-len': 80,
      })
    )
    .pipe(
      rename({
        basename: '',
        prefix: 'contract',
        extname: '.css',
      })
    )
    .pipe(gulp.dest('./public/css'))
    .pipe(notify({ message: 'css-contract task complete' }));
});

/*
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
  gulp.watch('./resources/assets/scss/pages/*.scss', ['rc']);
  gulp.watch('./resources/assets/scss/contract/**/*.scss', ['contract-style']);
  gulp.watch(base_script, ['js-base']);
  gulp.watch(country_script, ['js-country']);
  gulp.watch(resource_script, ['js-resource']);
  gulp.watch(clipping_script, ['js-clipping']);
  gulp.watch(homepage_script, ['js-homepage']);
});

/*
 * Default task, running just `gulp` will compile the sass,
 */

gulp.task('default', ['watch']);

var base_script = [
  './resources/assets/scripts/vendor/jquery.js',
  './resources/assets/scripts/vendor/bootstrap.js',
  './resources/assets/scripts/vendor/select2.js',
  './resources/assets/scripts/vendor/dataTables.min.js',
  './resources/assets/scripts/vendor/backbone/underscore.js',
];

gulp.task('js-base', function () {
  return gulp
    .src(base_script)
    .pipe(sourcemaps.init())
    .pipe(concat('plugins-bundle.js'))
    .pipe(gulp.dest('./public/js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'))
    .pipe(notify({ message: 'Js-base task complete' }));
});

gulp.task('js-country', function () {
  return gulp
    .src(country_script)
    .pipe(concat('country.js'))
    .pipe(gulp.dest('./public/js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'))
    .pipe(notify({ message: 'Js-country task complete' }));
});

gulp.task('js-resource', function () {
  return gulp
    .src(resource_script)
    .pipe(concat('resource.js'))
    .pipe(gulp.dest('./public/js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'))
    .pipe(notify({ message: 'Js-resource task complete' }));
});

gulp.task('js-homepage', function () {
  return gulp
    .src(homepage_script)
    .pipe(concat('homepage.js'))
    .pipe(gulp.dest('./public/js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'))
    .pipe(notify({ message: 'Js-homepage task complete' }));
});
