'use strict';

const gulp = require('gulp');
const server = require('gulp-develop-server');
const util = require('gulp-util');
const vendors = require('main-bower-files');
const filter = require('gulp-filter');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const combine = require('stream-combiner2').obj;
const uglify = require('gulp-uglify');
const rev = require('gulp-rev');
const named = require('vinyl-named');
const plumber = require('gulp-plumber');
const webpackStream = require('webpack-stream');
const ngAnnotate = require('gulp-ng-annotate');
const postcss = require('gulp-postcss');
const cssnano = require('gulp-cssnano');
const less = require('gulp-less');
const webpack = webpackStream.webpack;

const port = 8090;
let dev = process.env.NODE_ENV !== 'production';

gulp.task('default', ['vendors', 'js', 'css', 'watch'], () => {
    server.listen({
        path: 'server.js',
    }, function() {
        util.log(util.colors.cyan.bold(':: Development server listening ::'));
    });
});

// @gulp:vendors => build vendors
gulp.task('vendors', () => {
    return gulp.src(vendors())
        .pipe(filter('**/*.js', {
            restore: true
        }))
        .pipe(concat('vendors.js'))
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(gulpif(!dev, combine(
            uglify()
        )))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/js'));
});

// @gulp:js => build application
gulp.task('js', (callback) => {

    // Webpack options
    let options = {
        output: {
            publicPath: '/js/',
            filename: 'app.js'
        },
        plugins: [
            new webpack.NoErrorsPlugin()
        ],
        module: {
            loaders: [{
                test: /\.html$/,
                loader: 'raw',
                exclude: /(node_modules|bower_components)/,
            }, {
                test: /\.json$/,
                loader: 'json',
                exclude: /(node_modules|bower_components)/,
            }, {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }]
        },
        watch: dev,
        devtool: dev ? 'eval' : null
    }

    gulp.src('src/js/bootstrap.js')
        .pipe(named())
        .pipe(plumber())
        .pipe(webpackStream(options))
        .pipe(ngAnnotate())
        .pipe(gulpif(!dev, uglify()))
        .pipe(gulp.dest('public/js'))
        .on('data', function() {
            if (!callback.called) {
                callback.called = true;
                callback();
            }
        });
})

gulp.task('css', function() {
    return gulp.src('src/css/*.css')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(postcss([
            require('precss'),
            require('postcss-clearfix'),
            require('postcss-color-short'),
            require('postcss-cssnext'),
            require('postcss-size'),
            require("postcss-colour-functions")
        ]))
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))
        .on('error', function() {
            console.log(arguments)
        })
        .pipe(gulp.dest('public/css'))
        .pipe(gulpif(!dev, combine(
            rev.manifest('css.json'),
            gulp.dest('manifest')
        )));
});

// Watch files changes
gulp.task('watch', function() {
    gulp.watch('src/css/**/*.css', ['css']);
    gulp.watch('src/index.html', ['assets']);
});