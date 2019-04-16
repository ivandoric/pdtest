const gulp = require('gulp')
const sass = require('gulp-sass')
const browsersync = require('browser-sync').create()

function scss () {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(gulp.dest('./css'))
        .pipe(browsersync.stream({match: '**/*.css'}))
}

function browserSync(done) {
    browsersync.init({
        proxy: 'podravka.io.localhost',
        notify: false,
        port: 3000
    });
    done();
}

function browserSyncReload(done) {
    browsersync.reload();
    done();
}

function watchFiles() {
    gulp.watch('./scss/**/*.scss', scss)
    gulp.watch(['./**/*.html']).on('change', browsersync.reload)
}

// Define tasks
const watch = gulp.parallel(watchFiles, browserSync)

// Export tasks
exports.watch = watch
exports.scss = scss
