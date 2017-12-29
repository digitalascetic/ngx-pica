import {NgModule} from '@angular/core';
import {NgxPicaService} from './ngx-pica.service';
import {NgxPicaExifService} from './ngx-pica-exif.service';

@NgModule({
    providers: [
        {provide: NgxPicaService, useClass: NgxPicaService},
        {provide: NgxPicaExifService, useClass: NgxPicaExifService},
    ]
})
export class NgxPicaModule {
}