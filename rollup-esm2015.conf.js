export default {
    input: 'tmp/esm2015/ngx-pica.js',
    output: {
        file: 'dist/esm2015/ngx-pica.js',
        format: 'es'
    },
    external: ['@angular/core', 'exif-js', 'pica']
}
