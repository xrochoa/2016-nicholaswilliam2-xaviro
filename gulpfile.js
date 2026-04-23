/*----------  GULP 4 BUILD PIPELINE  ----------*/

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');

// HTML
const htmlmin = require('gulp-htmlmin');

// CSS
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

// JS
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');

// Utils
const del = require('del');
const historyApiFallback = require('connect-history-api-fallback');
const browserSync = require('browser-sync').create();

const IS_PROD = process.env.NODE_ENV === 'production';

/*----------  CLEAN  ----------*/

function clean() {
    return del(['./dist/**', '!./dist']);
}

/*----------  STATIC RESOURCES  ----------*/

function res() {
    return gulp.src('./src/assets/res/**/*', { allowEmpty: true, encoding: false })
        .pipe(gulp.dest('./dist/assets/res'))
        .pipe(browserSync.stream());
}

function img() {
    return gulp.src('./src/assets/img/**/*', { encoding: false })
        .pipe(gulp.dest('./dist/assets/img'))
        .pipe(browserSync.stream());
}

/*----------  HTML  ----------*/

function html() {
    return gulp.src('./src/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
}

/*----------  CSS  ----------*/

function css() {
    return gulp.src('./src/assets/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ quietDeps: true, silenceDeprecations: ['legacy-js-api', 'slash-div', 'import'] }).on('error', sass.logError))
        .pipe(autoprefixer({ cascade: false }))
        .pipe(cleanCSS({ compatibility: 'ie9' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/assets/css'))
        .pipe(browserSync.stream());
}

/*----------  JAVASCRIPT  ----------*/

function js() {
    const bundler = browserify({
        entries: './src/app/main.jsx',
        extensions: ['.jsx', '.js'],
        debug: !IS_PROD
    }).transform(babelify, { presets: ['@babel/preset-env', '@babel/preset-react'], extensions: ['.jsx', '.js'] });

    let stream = bundler.bundle()
        .on('error', function (err) { console.error(err.toString()); this.emit('end'); })
        .pipe(source('main.js'))
        .pipe(buffer());

    if (IS_PROD) stream = stream.pipe(uglify());

    return stream
        .pipe(gulp.dest('./dist/app'))
        .pipe(browserSync.stream());
}

/*----------  SERVER + WATCH  ----------*/

function serve() {
    browserSync.init({
        server: { baseDir: './dist' },
        middleware: [
            historyApiFallback(),
            // Local mock of the Netlify function that handles Stripe token on deploy
            function mockSaveToken(req, res, next) {
                if (req.method === 'POST' && req.url === '/savetoken') {
                    let body = '';
                    req.on('data', (chunk) => { body += chunk; });
                    req.on('end', () => {
                        try { JSON.parse(body || '{}'); } catch (e) { /* ignore */ }
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ success: true, demo: true }));
                    });
                    return;
                }
                next();
            }
        ],
        open: false,
        port: 3001,
        notify: false
    });

    gulp.watch('src/assets/res/**/*', res);
    gulp.watch('src/assets/img/**/*', img);
    gulp.watch('src/**/*.html', html);
    gulp.watch('src/assets/scss/**/*.scss', css);
    gulp.watch('src/app/**/*.{js,jsx}', js);
}

/*----------  PUBLIC TASKS  ----------*/

const build = gulp.series(clean, gulp.parallel(res, img, html, css, js));

exports.clean = clean;
exports.build = build;
exports.serve = gulp.series(build, serve);
exports.default = exports.serve;
