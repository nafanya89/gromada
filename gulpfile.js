/* ========================================================
                  Dimasion's autotaskeR :P
======================================================== */
var gulp = require('gulp'),

    //Browser servers
    browserSync = require('browser-sync').create(),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload'),

    //HTML
    jade = require('gulp-jade'),

    //CSS
    cleanCSS = require('gulp-clean-css'),
    //ADDITON => Забирає лишній текст з js (коментарі, т.д.)
    concatCss = require('gulp-concat-css'),
    //ADDITON => Об'єднує CSS файли

    //JS
    fixmyjs = require("gulp-fixmyjs"),
    //ADDITON => Забирає лишній текст з js (коментарі, т.д.)
    concat = require('gulp-concat'),
    //ADDITON => Об'єднує JS файли

    //SASS
    sass = require("gulp-sass"),

    //Images
    imagemin = require('gulp-imagemin'),
    svgstore = require('gulp-svgstore'),
    inject = require('gulp-inject'),
    //ADDITON => Вибирає інформацію з декількох файлів та записує в необхідний файл
    //ADDITON => / для того щоб вказати куди саме записати вибрану інформацію слід
    //ADDITON => вказати коментар н-п.: <!-- inject:svg --><!-- endinject -->

    //Others
    rename = require('gulp-rename'),
    prefix = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'), //Мінімізація файлів
    clean = require('gulp-clean'),

    //Fonts
    fontmin = require('gulp-fontmin');



/* ========================================================
                  Variables configuration
======================================================== */
var config = {
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//~~~~~~~~~~~~~~~~~~~ DOCUMENTATION ~~~~~~~~~~~~~~~~~~~~~//
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
/*
                app__ - application way
                ass__ - assets way
*/
    //application
    app__html: 'app',
    app__html_includes: 'app/html',
    app__css: 'app/css',
    app__js_c: 'app/js',
    app__js_l: 'app/js/libs',
    app__fonts: 'app/fonts/',
    app__img: 'app/img',
    app__svg_img: 'app/img/svg-images/',
    app__svg_out: 'app/img/svg-sprites/',

    //assets
    ass__jade: ['assets/template/*.jade'],
    ass__jade_watch: ['assets/template/**/*.jade'],
    ass__css: 'assets/scss/collector.scss',
    ass__css_w: ['assets/scss/**/*.scss'],
    ass__js_g: ['assets/js/global/*.js'],
    ass__js_p: ['assets/js/pages/*.js'],
    ass__js_l: ['assets/js/libs/*.js'],
    ass__fonts: ['assets/fonts/*.*'],
    ass__img: ['assets/img/*.*'],
    ass__svg_ico: ['assets/img/svg-icons/*.svg'],
    ass__svg_img: ['assets/img/svg-images/*.svg'],
    ass__svg_sprite: ['assets/img/svg-sprites/*.svg']
};



/* ========================================================
                        CSS TASKS
======================================================== */
gulp.task('sass', function () {
    gulp.src(config.ass__css)
        .pipe(sass())
        .pipe(concatCss("main.css"))
        .pipe(prefix('last 3 versions'))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(config.app__css))
        .pipe(livereload());
});



/* ========================================================
                        JS TASKS
======================================================== */
gulp.task('global-scripts', function () {
    return gulp.src(config.ass__js_g)
        .pipe(concat('common.js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(fixmyjs())
        .pipe(gulp.dest(config.app__js_c))
        .pipe(livereload());
});

gulp.task('pages-scripts', function () {
    return gulp.src(config.ass__js_p)
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(fixmyjs())
        .pipe(gulp.dest(config.app__js_c))
        .pipe(livereload());
});

gulp.task('libs-scripts', function () {
    return gulp.src(config.ass__js_l)
        .pipe(gulp.dest(config.app__js_l))
        .pipe(livereload());
});


/* ========================================================
                        HTML TASKS
======================================================== */
gulp.task('templates', function() {
  gulp.src(config.ass__jade)
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest(config.app__html))
    .pipe(livereload());
});


/* ========================================================
                        FONTS TASKS
======================================================== */
gulp.task('fonts', function () {
    gulp.src(config.ass__fonts)
        .pipe(gulp.dest(config.app__fonts))
        .pipe(fontmin())
        .pipe(livereload());
});



/* ========================================================
                        IMAGES TASKS
======================================================== */
gulp.task('images', function () {
    gulp.src(config.ass__img)
        .pipe(imagemin({ optimizationLevel: 100 }))
        .pipe(gulp.dest(config.app__img))
        .pipe(livereload());
});

/* ========================================================
                        SVG TASKS
======================================================== */

//~~~~~~~~~~~~~~~~~~~ SVG IMAGES TASKS ~~~~~~~~~~~~~~~~~~//
gulp.task('svg-images', function () {
    gulp.src(config.ass__svg_img)
        .pipe(imagemin({ optimizationLevel: 100 }))
        .pipe(gulp.dest(config.app__svg_img))
        .pipe(livereload());
});

//~~~~~~~~~~~~~~~~~~~ SVG ICONS TASKS ~~~~~~~~~~~~~~~~~~~//
gulp.task('svg-icons', function () {
    var svgs = gulp
        .src(config.ass__svg_ico, { base: 'src/svg' })
        .pipe(rename({prefix: 'icon-'}))
        .pipe(svgstore({
            inlineSvg: true
        }));

    function fileContents(filePath, file) {
        return file.contents.toString();
    }

    return gulp
        .src(config.ass__svg_sprite)
        .pipe(inject(svgs, {
            transform: fileContents
    }))
    .pipe(livereload())
    .pipe(gulp.dest(config.app__svg_out));
});


/* ========================================================
                      SERVERS TASKS
======================================================== */

//EXTERNAL SERVER - BROWSER SYNC - localhost:3003 for settings
//gulp.task('browser-sync', function () {
//    browserSync.init({
//        server: {
//            baseDir: "app/html"
//        }
//    });
//});
//
//CONNECT SERVER - FOR LIVE RELOAD
gulp.task('connect', function () {
    connect.server({
        root: 'app',
        port: 3000,
        livereload: true
    });
});

/* ========================================================
                   CLEAN APPLICATION TASK
======================================================== */

gulp.task('clean', function () {
	return gulp
        .src(['app/css/*.css', 'app/js/**/*.js', 'app/img/**/*.*'], {read: false})
		.pipe(clean());
});


/* ========================================================
                      WATCH TASKS
======================================================== */
//IMAGES
gulp.task('watch-images', function () {
    livereload.listen();
    gulp.watch(config.ass__img, ['images']);
});

//FONTS
gulp.task('watch-fonts', function () {
    livereload.listen();
    gulp.watch(config.ass__fonts, ['fonts']);
});

//CSS
gulp.task('watch-sass', function () {
    livereload.listen();
    gulp.watch(config.ass__css_w, ['sass']);
});

//JAVASCRIPT
gulp.task('watch-js', function () {
    livereload.listen();
    gulp.watch(config.ass__js_g, ['global-scripts']);
    gulp.watch(config.ass__js_p, ['pages-scripts']);
    gulp.watch(config.ass__js_l, ['libs-scripts']);
});

//HTML
gulp.task('watch-jade', function () {
livereload.listen();
gulp.watch(config.ass__jade_watch, ['templates']);
});

//SVG IMAGES
gulp.task('watch-svg-images', function () {
    livereload.listen();
    gulp.watch(config.ass__svg_img, ['svg-images']);
});

//SVG ICONS
gulp.task('watch-svg-icons', function () {
    livereload.listen();
    gulp.watch(config.ass__svg_ico, ['svg-icons']);
});



/* ========================================================
                        DEFAULT
======================================================== */
gulp.task('default', [
    'fonts', 'sass','templates',
    'pages-scripts', 'global-scripts', 'libs-scripts', 'images',
    'svg-images', 'svg-icons',
    //watch
    'watch-images', 'watch-fonts', 'watch-sass', 'watch-jade', 'watch-js', 'watch-svg-images',
    'watch-svg-icons',
    //servers
    'connect'
]);
