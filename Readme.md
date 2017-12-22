# ng2-pica
Simple Angular 5 wrapper for <a href="https://github.com/nodeca/pica">pica</a> to resize images in browser. 

## Install
1. Add `ngx-pica` module as dependency to your project.
```bash
$ npm install ngx-pica --save
```
2. Include `NgxPicaModule` into your main AppModule or in module where you will use it.
```
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPicaModule } from 'ngx-pica';

@NgModule({
  imports: [
    BrowserModule,
    NgxPicaModule
  ],
  declarations: [ AppComponent ],
  exports: [ AppComponent ]
})
export class AppModule {}
```

## Methods
### `.resizeImages(files: File[], width: number, height: number, keepAspectRatio: boolean = false): Observable<File>`
This method resize an array of images doing it sequentially to optimize CPU and memory use. 

The Observable receives a next on every file that has been resized.
If something goes wrong the Observable receive an error.

### `.resizeImage(file: File, width: number, height: number, keepAspectRatio: boolean = false): Observable<File>`
Same as above but only takes one file instead of an array of files.

## Example


```ts
import { Component, EventEmitter } from '@angular/core';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-pica';

@Component({
  selector: 'app-home',
  template: `
      <img *ngFor="let image of images" [src]="image" />
  
      <input type="file" [attr.accept]="image/*" multiple
             (change)="handleFiles($event)">
  `
})
export class AppHomeComponent {
    images: File[] = [];
    
    constructor(private _ngxPicaService: NgxPicaService) {
    
    }
    
    public handleFiles(event: any) {
        const files: File[] = event.target.files;
        
        this._ngxPicaService.resizeImages(files, 1200, 880)
            .subscribe((imageResized: File) => {
                let reader: FileReader = new FileReader();
                
                reader.addEventListener('load', (event: any) => {
                    this.images.push(event.target.result);
                }, false);
                
                reader.readAsDataURL(imageResized);
                
            }, (err) => {
                throw err;
            });
    }
```  