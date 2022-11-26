import gulp from 'gulp';
import browser from 'browser-sync';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);

export const styles = () => {
    return gulp.src('./source/scss/style.scss', { sourcemaps: true })
        .pipe(sass())
        .pipe(gulp.dest('./source/css', { sourcemaps: '.' }))
        .pipe(browser.stream());
}

export const server = (done) => {
    browser.init({
        server: {
            baseDir: 'source'
        },
        cors: true,
        notify: false,
        ui: false,
    });
    done();
}

export const watcher = () => {
    gulp.watch('./source/scss/**/*.scss', gulp.series(styles));
    gulp.watch('./source/scss/**/*.scss').on('change', browser.reload);
    gulp.watch('./source/*.html').on('change', browser.reload);
};

export default gulp.series(
    server,
    watcher,
    styles
);