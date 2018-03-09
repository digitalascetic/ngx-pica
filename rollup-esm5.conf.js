export default {
    input: 'tmp/esm5/ngx-pica.js',
    output: {
        file: 'dist/esm5/ngx-pica.js',
        format: 'es'
    },
    external: ['@angular/core', 'exif-js', 'pica']
}
