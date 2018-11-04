import {Injectable} from '@angular/core';
import {Subject, Observable, Subscription} from 'rxjs';
import {NgxPicaErrorInterface, NgxPicaErrorType} from './ngx-pica-error.interface';
import {NgxPicaResizeOptionsInterface} from './ngx-pica-resize-options.interface';
import {NgxPicaExifService} from './ngx-pica-exif.service';
import * as pica from 'pica';


declare let window: any;

@Injectable()
export class NgxPicaService {
    private picaResizer = new pica();
    private MAX_STEPS = 20;

    constructor(private _ngxPicaExifService: NgxPicaExifService) {
        if (!this.picaResizer || !this.picaResizer.resize) {
            this.picaResizer = new window.pica();
        }
    }

    public resizeImages(files: File[], width: number, height: number, options?: NgxPicaResizeOptionsInterface): Observable<File> {
        const resizedImage: Subject<File> = new Subject();
        const totalFiles: number = files.length;

        if (totalFiles > 0) {
            const nextFile: Subject<File> = new Subject();
            let index = 0;

            const subscription: Subscription = nextFile.subscribe((file: File) => {
                this.resizeImage(file, width, height, options).subscribe(imageResized => {
                    index++;
                    resizedImage.next(imageResized);

                    if (index < totalFiles) {
                        nextFile.next(files[index]);

                    } else {
                        resizedImage.complete();
                        subscription.unsubscribe();
                    }
                }, (err) => {
                    const ngxPicaError: NgxPicaErrorInterface = {
                        file: file,
                        err: err
                    };

                    resizedImage.error(ngxPicaError);
                });
            });

            nextFile.next(files[index]);
        } else {
            const ngxPicaError: NgxPicaErrorInterface = {
                err: NgxPicaErrorType.NO_FILES_RECEIVED
            };

            resizedImage.error(ngxPicaError);
            resizedImage.complete();
        }

        return resizedImage.asObservable();
    }

    public resizeImage(file: File, width: number, height: number, options?: NgxPicaResizeOptionsInterface): Observable<File> {
        const resizedImage: Subject<File> = new Subject();
        const originCanvas: HTMLCanvasElement = document.createElement('canvas');
        const ctx = originCanvas.getContext('2d');
        const img = new Image();

        if (ctx) {
            img.onload = () => {
                this._ngxPicaExifService.getExifOrientedImage(img).then(orientedImage => {
                    window.URL.revokeObjectURL(img.src);
                    originCanvas.width = orientedImage.width;
                    originCanvas.height = orientedImage.height;

                    ctx.drawImage(orientedImage, 0, 0);

                    const imageData = ctx.getImageData(0, 0, orientedImage.width, orientedImage.height);
                    if (options && options.aspectRatio && options.aspectRatio.keepAspectRatio) {
                        let ratio = 0;

                        if (options.aspectRatio.forceMinDimensions) {
                            ratio = Math.max(width / imageData.width, height / imageData.height);
                        } else {
                            ratio = Math.min(width / imageData.width, height / imageData.height);
                        }

                        width = Math.round(imageData.width * ratio);
                        height = Math.round(imageData.height * ratio);
                    }

                    const destinationCanvas: HTMLCanvasElement = document.createElement('canvas');
                    destinationCanvas.width = width;
                    destinationCanvas.height = height;

                    this.picaResize(file, originCanvas, destinationCanvas, options)
                        .catch((err) => resizedImage.error(err))
                        .then((imgResized: File) => {
                            resizedImage.next(imgResized);
                        });
                });
            };

            img.src = window.URL.createObjectURL(file);
        } else {
            resizedImage.error(NgxPicaErrorType.CANVAS_CONTEXT_IDENTIFIER_NOT_SUPPORTED);
        }

        return resizedImage.asObservable();
    }

    public compressImages(files: File[], sizeInMB: number): Observable<File> {
        const compressedImage: Subject<File> = new Subject();
        const totalFiles: number = files.length;

        if (totalFiles > 0) {
            const nextFile: Subject<File> = new Subject();
            let index = 0;

            const subscription: Subscription = nextFile.subscribe((file: File) => {
                this.compressImage(file, sizeInMB).subscribe(imageCompressed => {
                    index++;
                    compressedImage.next(imageCompressed);

                    if (index < totalFiles) {
                        nextFile.next(files[index]);

                    } else {
                        compressedImage.complete();
                        subscription.unsubscribe();
                    }
                }, (err) => {
                    const ngxPicaError: NgxPicaErrorInterface = {
                        file: file,
                        err: err
                    };

                    compressedImage.error(ngxPicaError);
                });
            });

            nextFile.next(files[index]);
        } else {
            const ngxPicaError: NgxPicaErrorInterface = {
                err: NgxPicaErrorType.NO_FILES_RECEIVED
            };

            compressedImage.error(ngxPicaError);
            compressedImage.complete();
        }

        return compressedImage.asObservable();
    }

    public compressImage(file: File, sizeInMB: number): Observable<File> {
        const compressedImage: Subject<File> = new Subject();

        if (this.bytesToMB(file.size) <= sizeInMB) {
            setTimeout(() => {
                compressedImage.next(file);
            });
        } else {

            const originCanvas: HTMLCanvasElement = document.createElement('canvas');
            const ctx = originCanvas.getContext('2d');
            const img = new Image();

            if (ctx) {
                img.onload = () => {
                    this._ngxPicaExifService.getExifOrientedImage(img).then(orientedImage => {
                        window.URL.revokeObjectURL(img.src);
                        originCanvas.width = orientedImage.width;
                        originCanvas.height = orientedImage.height;

                        ctx.drawImage(orientedImage, 0, 0);

                        this.getCompressedImage(originCanvas, file.type, 1, sizeInMB, 0)
                            .catch((err) => compressedImage.error(err))
                            .then((blob: Blob) => {
                                const imgCompressed: File = this.blobToFile(blob, file.name, file.type, new Date().getTime());

                                compressedImage.next(imgCompressed);
                            });
                    });
                };

                img.src = window.URL.createObjectURL(file);
            } else {
                compressedImage.error(NgxPicaErrorType.CANVAS_CONTEXT_IDENTIFIER_NOT_SUPPORTED);
            }
        }

        return compressedImage.asObservable();
    }

    private getCompressedImage(canvas: HTMLCanvasElement, type: string, quality: number, sizeInMB: number, step: number): Promise<Blob> {
        return new Promise<Blob>((resolve, reject) => {
            this.picaResizer.toBlob(canvas, type, quality)
                .catch((err) => reject(err))
                .then((blob: Blob) => {
                    this.checkCompressedImageSize(canvas, blob, quality, sizeInMB, step)
                        .catch((err) => reject(err))
                        .then((compressedBlob: Blob) => {
                                resolve(compressedBlob);
                            }
                        );
                });
        });
    }

    private checkCompressedImageSize(
        canvas: HTMLCanvasElement,
        blob: Blob,
        quality: number,
        sizeInMB: number,
        step: number
    ): Promise<Blob> {
        return new Promise<Blob>((resolve,
            reject) => {

            if (step > this.MAX_STEPS) {
                reject(NgxPicaErrorType.NOT_BE_ABLE_TO_COMPRESS_ENOUGH);
            } else if (this.bytesToMB(blob.size) < sizeInMB) {
                resolve(blob);
            } else {
                const newQuality: number = quality - (quality * 0.1);
                const newStep: number = step + 1;

                // recursively compression
                resolve(this.getCompressedImage(canvas, blob.type, newQuality, sizeInMB, newStep));
            }
        });
    }

    private picaResize(file: File, from: HTMLCanvasElement, to: HTMLCanvasElement, options: any): Promise<File> {
        return new Promise<File>((resolve, reject) => {
            this.picaResizer.resize(from, to, options)
                .catch((err) => reject(err))
                .then((resizedCanvas: HTMLCanvasElement) => this.picaResizer.toBlob(resizedCanvas, file.type))
                .then((blob: Blob) => {
                    const fileResized: File = this.blobToFile(blob, file.name, file.type, new Date().getTime());
                    resolve(fileResized);
                });
        });
    }

    private blobToFile(blob: Blob, name: string, type: string, lastModified: number): File {
        return new File([blob], name, {type: type, lastModified: lastModified});
    }

    private bytesToMB(bytes: number) {
        return bytes / 1048576;
    }
}
