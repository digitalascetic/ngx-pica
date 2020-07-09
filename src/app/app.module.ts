import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {CommonModule} from "@angular/common";
import {NgxPicaModule} from "../../projects/digitalascetic/ngx-pica/src/public_api";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    NgxPicaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
