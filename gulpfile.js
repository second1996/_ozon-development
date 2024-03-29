let preprocessor = 'sass'; // Preprocessor (sass, scss, less, styl)
let fileswatch = 'html,htm,txt,json,md,woff2'; // List of files extensions for watching & hard reload (comma separated)
let imageswatch = 'jpg,jpeg,png,webp,svg'; // List of images extensions for watching & compression (comma separated)

const { src, dest, parallel, series, watch, lastRun } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const scss = require('gulp-sass')(require('sass'));
const less = require('gulp-less');
const styl = require('gulp-stylus');
const cleancss = require('gulp-clean-css');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const rsync = require('gulp-rsync');
const del = require('del');

// Local Server

function browsersync() {
  browserSync.init({
    server: { baseDir: 'app' },
    notify: false,
    // online: false, // Work offline without internet connection
  });
}

// Custom Styles

function styles() {
  return src('app/' + preprocessor + '/main.*')
    .pipe(eval(preprocessor)())
    .pipe(concat('app.min.css'))
    .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
    .pipe(cleancss({ level: { 1: { specialComments: 0 } } }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream());
}

// Scripts & JS Libraries

function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.min.js', // jQuery Lib
    'node_modules/swiper/js/swiper.min.js', // Swiper Carousel
    'node_modules/vanilla-lazyload/dist/lazyload.min.js', // LazyLoad
    'node_modules/bootstrap/js/dist/util.js', // Bootstrap Lib Util
    'node_modules/bootstrap/js/dist/modal.js', // Bootstrap Modal
    'node_modules/bootstrap/js/dist/tab.js', // Bootstrap Tabs
    'app/libs/popper.min.js', // Lib Popper
    'app/libs/fancybox/dist/jquery.fancybox.min.js', // Fancybox 3
    'app/libs/jquery.inputmask.min.js', // jQuery Inputmask
    'app/libs/jquery.marquee.min.js', // Marquee String
    'app/js/app.js', // Main JS
  ])
    .pipe(concat('app.min.js'))
    .pipe(uglify()) // Minify JS (opt.)
    .pipe(dest('app/js'))
    .pipe(browserSync.stream());
}

// Images

function images() {
  return src('app/images/src/**/*')
    .pipe(newer('app/images/dest'))
    .pipe(imagemin())
    .pipe(dest('app/images/dest'));
}

function cleanimg() {
  return del('app/images/dest/**/*', { force: true });
}

// Deploy

function deploy() {
  return src('app/').pipe(
    rsync({
      root: 'app/',
      hostname: 'username@yousite.com',
      destination: 'yousite/public_html/',
      // include: ['*.htaccess'], // Included files
      exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excluded files
      recursive: true,
      archive: true,
      silent: false,
      compress: true,
    }),
  );
}

// Watching

function startwatch() {
  watch('app/' + preprocessor + '/**/*', styles);
  watch(['app/**/*.js', '!app/js/*.min.js'], scripts);
  watch(['app/**/*.{' + imageswatch + '}'], images);
  watch(['app/**/*.{' + fileswatch + '}']).on('change', browserSync.reload);
}

exports.browsersync = browsersync;
exports.assets = series(cleanimg, styles, scripts, images);
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.cleanimg = cleanimg;
exports.deploy = deploy;
exports.default = parallel(images, styles, scripts, browsersync, startwatch);
