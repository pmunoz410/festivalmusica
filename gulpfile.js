import { src, dest, watch, series, parallel } from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'

const sass = gulpSass(dartSass)

export function js( done ) {
    src('src/js/app.js')
        .pipe( dest('build/js') )

    done()
}

export function css( done ) {
    // src('src/scss/app.scss', { sourcemaps: true })
    //     .pipe( sass().on('error', sass.logError) )
    //     .pipe( dest('build/css', { sourcemaps: true }) )

    // done()
    src('src/scss/app.scss', { sourcemaps: true })
        .pipe(sourcemaps.init()) // Inicia la generación del sourcemap
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: '.' })) // Escribe los sourcemaps en una carpeta separada
        .pipe(dest('build/css'))

    done()
}

export function html(done) {
    src('index.html')
        .pipe(dest('build'));
    done();
}

export function dev() {
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', js)
    watch('index.html', html);
}

export function build( done ) {
    js(done);
    css(done);
    html(done);
}

// export default series( js, css, dev )
export default series(parallel(js, css, html), dev);