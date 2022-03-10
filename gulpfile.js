const {src, dest, watch, parallel, series} = require('gulp'); 

const sass         = require('gulp-sass'),
      concat       = require('gulp-concat'),
      browserSync  = require('browser-sync').create(),
      uglify       = require('gulp-uglify-es').default,
      autoprefixer = require('gulp-autoprefixer'),
      imagemin     = require('gulp-imagemin'),
      del          = require('del');



function browsersync() {
  browserSync.init({
    server: {
      baseDir: "app/"
    },
    notify: false
  });
}


function watching() {
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  watch(['app/*.html']).on('change', browserSync.reload);
}


function styles() {
  return src([
        'app/scss/style.scss',
        'node_modules/normalize.css/normalize.css'
  ])
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
          overrideBrowserslist: ['last 10 version'],
          grid: true
        }))
        .pipe(dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
}


function scripts() {
  return src([
        'node_modules/jquery/dist/jquery.js',
        'app/js/main.js'
  ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.reload({stream: true}))
}


function build() {
  return src([
        'app/css/style.min.css',
        'app/fonts/**/*',
        'app/js/main.min.js',
        'app/*.html'
  ],{base:'app'})
        .pipe(dest('dist'))
}


function images() {
  return src('app/images/**/*')
  .pipe(imagemin([
    imagemin.gifsicle({interlaced: true}),
    imagemin.mozjpeg({quality: 75, progressive: true}),
    imagemin.optipng({optimizationLevel: 5}),
    imagemin.svgo({
        plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
        ]
    })
]))
  .pipe(dest('dist/images'))
}

function cleanDist() {
  return del('dist')
}


exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;
exports.images = images;
exports.cleanDist = cleanDist;


exports.build = series(cleanDist, images, build);
exports.default = parallel(styles, scripts, browsersync, watching);