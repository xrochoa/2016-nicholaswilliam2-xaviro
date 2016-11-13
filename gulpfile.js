//gulp gulp-imagemin gulp-htmlmin gulp-sass gulp-autoprefixer gulp-clean-css gulp-jshint gulp-include gulp-uglify del run-sequence gulp-sourcemaps browser-sync gulp-babel jshint
/*----------  GULP  ----------*/

var gulp = require('gulp');

/*----------  PLUGINS  ----------*/

//img
var imagemin = require('gulp-imagemin');

//html
var htmlmin = require('gulp-htmlmin');

//css
var sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css');

//js and module bundler
var eslint = require('gulp-eslint'),
    include = require('gulp-include'),
    uglify = require('gulp-uglify'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer');

//utils
var del = require('del'),
    runSequence = require('run-sequence'),
    sourcemaps = require('gulp-sourcemaps');

//server
var browserSync = require('browser-sync').create();

/*----------  CLEAN  ----------*/

//Clean dist folder before tasks
gulp.task('clean', function() {
    return del(['./dist/*']);
});

/*----------  RESOURCES  ----------*/

//Copy files from resources
gulp.task('res', function() {
    return gulp.src('./src/assets/res/**/*')
        .pipe(gulp.dest('./dist/assets/res'))
        .pipe(browserSync.stream());

});

/*----------  HTML  ----------*/

//Minify html
gulp.task('html', function() {
    return gulp.src('./src/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());

});

/*----------  IMAGES  ----------*/

//Minify png, jpg, gif and svg images
gulp.task('img', function() {
    return gulp.src('./src/assets/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/assets/img'))
        .pipe(browserSync.stream());

});

/*----------  JAVASCRIPT  ----------*/


//Lint
gulp.task('js:lint', function() {
    return gulp.src('./src/app/**/*.jsx')
        .pipe(eslint());
});

//Concat and minify lib
gulp.task('js:lib', function() {
    return gulp.src('./src/assets/js/lib.js')
        .pipe(sourcemaps.init())
        .pipe(include())
        //.pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/assets/js'))
        .pipe(browserSync.stream());
});

//Concat and minify custom js
gulp.task('js:jsx', function() {
    return browserify({ entries: './src/app/main.jsx', extensions: ['.jsx'], debug: true }) //debug adds sourcemaps
        .transform('babelify', { presets: ['es2015', 'react'] })
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        //.pipe(uglify()) removes sourcemaps
        .pipe(gulp.dest('./dist/app'))
        .pipe(browserSync.stream());
});

gulp.task('js', ['js:lint', 'js:lib', 'js:jsx']);

/*----------  CSS  ----------*/

//Compile scss to css and minify
gulp.task('css', function() {
    return gulp.src('./src/assets/scss/**/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: [
                "Android 2.3",
                "Android >= 4",
                "Chrome >= 20",
                "Firefox >= 24",
                "Explorer >= 8",
                "iOS >= 6",
                "Opera >= 12",
                "Safari >= 6"
            ],
            cascade: false
        }))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/assets/css'))
        .pipe(browserSync.stream());

});


/*----------  WATCH  ----------*/


//Watches Files For Changes
gulp.task('watch', function() {

    browserSync.init({
        server: {
            baseDir: './dist'
        },
        open: false,
        notify: {
            styles: {
                top: 'auto',
                bottom: '0'
            }
        }
    });

    gulp.watch('src/assets/res/**/*', ['res']);
    gulp.watch('src/assets/img/**/*', ['img']);
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/assets/scss/**/*.scss', ['css']);
    gulp.watch('src/app/**/*.jsx', ['js:jsx']);
    gulp.watch('src/assets/js/**/*.js', ['js:lib']);

});

/*----------  DEFAULT  ----------*/

// Default Task
gulp.task('default', function() {
    runSequence('clean', 'res', 'img', 'html', 'css', 'js', 'watch');
});
