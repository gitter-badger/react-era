var
  gulp              = require('gulp'),
  browserSync       = require('browser-sync').create(),
  sass              = require('gulp-sass'),
  sourcemaps        = require('gulp-sourcemaps'),
  autoprefixer      = require('gulp-autoprefixer');
  uglify            = require('gulp-uglify');
  concat            = require('gulp-concat');
  notify            = require('gulp-notify');
;

// Static Server + watching scss/html files
gulp.task('dev', ['sass', 'runtime'], function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch("src/scss/**/*.scss", ['sass']);
  gulp.watch("src/js/*.js", ['runtime']).on('change', browserSync.reload);
  gulp.watch("*.html").on('change', browserSync.reload);
});

// Minify js files
gulp.task('runtime', function () {
  return gulp.src(['src/js/*.js']) //select all javascript files under js/ (no subdirectory)
    .pipe(concat('react-era.min.js')) //the name of the resulting file
    .pipe(uglify())
    .pipe(gulp.dest('dist/js')) //the destination folder
    .pipe(notify({ message: 'Finished minifying JavaScript'}));
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("src/scss/**/*.scss")
    .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'compressed'}))
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

gulp.task('default', ['dev']);
