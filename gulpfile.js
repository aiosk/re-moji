const gulp = require( 'gulp');
const babel = require( 'gulp-babel');
const sass = require( 'gulp-sass');
const pug = require( 'gulp-pug');
const plumber = require( 'gulp-plumber');
const autoprefixer = require( 'gulp-autoprefixer');
const cleanCSS = require( 'gulp-clean-css');
const filter = require( 'gulp-filter');
const uglify = require( 'gulp-uglify');


const babelOpts = {presets: ['es2015'], compact: false};

gulp.task('webHtml', () => {
    const pugOpts = {
        data: {},
        pretty: false,
        compileDebug: true
    };
    gulp.src('./src/html/**/*.pug')
        .pipe(filter(file => !/\/_/.test(file.path) && !/^_/.test(file.relative)))
        .pipe(plumber())
        .pipe(pug(pugOpts))
        .pipe(gulp.dest('./dist/'))
});

gulp.task('webCss', () => {
    const sassOpts = { outputStyle: 'nested'};

    gulp.src(`./src/css/main.scss`)
        .pipe(sass(sassOpts).on('error', sass.logError))
        .pipe(autoprefixer({browsers: ['ff >= 4', 'Chrome >= 19', 'ie >= 9'], cascade: false}))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist/css/'))
});

gulp.task('webJs', () => {

    gulp.src('./src/js/**/*.js')
        .pipe(plumber())
        .pipe(babel(babelOpts))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'))
});

gulp.task('build', ['webJs','webCss']);

gulp.task('default', () => {
    gulp.watch('./src/css/**/*.scss', ['webCss']);

    gulp.watch('./src/html/**/*.pug', ['webHtml']);
    gulp.watch('./src/js/**/*.js', ['webJs']);
});