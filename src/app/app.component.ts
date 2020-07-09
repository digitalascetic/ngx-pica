import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {
  NgxPicaErrorInterface,
  NgxPicaResizeOptionsInterface,
  NgxPicaService
} from "../../projects/digitalascetic/ngx-pica/src/public_api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'ngx-pica';
  image: File;
  time: any;

  constructor(private _ngxPicaService: NgxPicaService,
              private _cdRef: ChangeDetectorRef) {

  }

  public handleFiles(event: any) {
    const fileList: File[] = event.target.files;

    const start = performance.now();

    const options: NgxPicaResizeOptionsInterface = {
      exifOptions: {
        forceExifOrientation: false
      },
      aspectRatio: {
        keepAspectRatio: true
      }
    };

    this._ngxPicaService.resizeImages(fileList, 880, 1280, options)
      .subscribe((imageResized: File) => {
        let reader: FileReader = new FileReader();

        reader.addEventListener('load', (event: any) => {
          this.time = (performance.now() - start).toFixed(2);
          this.image = event.target.result;
          this._cdRef.detectChanges();
        }, false);

        reader.readAsDataURL(imageResized);

      }, (err: NgxPicaErrorInterface) => {
        throw err.err;
      });
  }
}
