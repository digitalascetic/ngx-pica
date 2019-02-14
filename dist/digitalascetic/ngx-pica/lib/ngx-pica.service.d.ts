import { Observable } from 'rxjs';
import { NgxPicaResizeOptions } from './ngx-pica-resize-options.interface';
import { NgxPicaExifService } from './ngx-pica-exif.service';
export declare class NgxPicaService {
    private _ngxPicaExifService;
    private picaResizer;
    private MAX_STEPS;
    constructor(_ngxPicaExifService: NgxPicaExifService);
    resizeImages(files: File[], width: number, height: number, options?: NgxPicaResizeOptions): Observable<File>;
    resizeImage(file: File, width: number, height: number, options?: NgxPicaResizeOptions): Observable<File>;
    compressImages(files: File[], sizeInMB: number): Observable<File>;
    compressImage(file: File, sizeInMB: number): Observable<File>;
    private getCompressedImage;
    private checkCompressedImageSize;
    private picaResize;
    private blobToFile;
    private bytesToMB;
}
