import {NgModule} from '@angular/core';
import {NgxPicaService} from './ngx-pica.service';
import {NgxPicaImageService} from './ngx-pica-image.service';

@NgModule({
  providers: [
    {provide: NgxPicaService, useClass: NgxPicaService},
    {provide: NgxPicaImageService, useClass: NgxPicaImageService},
  ]
})
export class NgxPicaModule {
}
