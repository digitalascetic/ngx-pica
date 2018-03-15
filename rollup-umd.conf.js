export default {
    input: 'tmp/esm5/ngx-pica.js',
    output: {
        file: 'dist/bundles/ngx-pica.umd.js',
        format: 'umd'
    },
    name: 'ng.ngx-pica',
    external: ['@angular/core', 'exif-js', 'pica'],
    globals: {
        '@angular/core': 'ng.core',
        'exif-js': 'exifJs',
        'pica': 'pica'
    }
}
