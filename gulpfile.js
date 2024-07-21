import { src, dest, watch, series, parallel } from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'

const sass = gulpSass(dartSass)

export function js( done ) {
    src('src/js/app.js')
        .pipe( dest('public/js') ) // .pipe( dest('build/js') )

    done()
}

export function css( done ) {
    src('src/scss/app.scss', { sourcemaps: true })
        .pipe( sass().on('error', sass.logError) )
        .pipe( dest('public/css', { sourcemaps: true }) ) // .pipe( dest('build/css', { sourcemaps: true }) )

    done()
}

export function dev() {
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', js)
}

export function build( done ) {
    js(done);
    css(done);
}

// export default series( js, css, dev )
export default series(parallel(js, css), dev);