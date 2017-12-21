import {NgModule} from '@angular/core';
import {NgxPicaService} from './ngx-pica.service';

@NgModule({
    providers: [
        {provide: NgxPicaService, useClass: NgxPicaService}
    ]
})
export class NgxPicaModule {
}