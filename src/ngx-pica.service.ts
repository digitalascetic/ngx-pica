import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import pica from 'pica/dist/pica';
import {NgxPicaErrorInterface} from './ngx-pica-error.interface';

declare let window: any;

@Injectable()
export class NgxPicaService {


    public resizeImages(files: File[], width: number, height: number, keepAspectRatio: boolean = false): Observable<File> {
        const resizedImage: Subject<File> = new Subject();
        const totalFiles: number = files.length;

        if (totalFiles > 0) {
            const nextFile: Subject<File> = new Subject();
            let index: number = 0;

            const subscription: Subscription = nextFile.subscribe((file: File) => {
                this.resizeImage(file, width, height, keepAspectRatio).subscribe(imageResized => {
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
                err: 'NO_FILES_RECEIVED'
            };

            resizedImage.error(ngxPicaError);
            resizedImage.complete();
        }

        return resizedImage.asObservable();
    }

    public resizeImage(file: File, width: number, height: number, keepAspectRatio: boolean = false): Observable<File> {
        const resizedImage: Subject<File> = new Subject();
        const originCanvas: HTMLCanvasElement = document.createElement('canvas');
        const ctx = originCanvas.getContext('2d');
        const img = new Image();

        let resizer = new pica();

        if (!resizer || !resizer.resize) {
            resizer = new window.pica();
        }

        if (ctx) {
            img.onload = () => {
                originCanvas.width = img.width;
                originCanvas.height = img.height;

                ctx.drawImage(img, 0, 0);

                let imageData = ctx.getImageData(0, 0, img.width, img.height);
                if (keepAspectRatio) {
                    let ratio = Math.min(width / imageData.width, height / imageData.height);
                    width = Math.round(imageData.width * ratio);
                    height = Math.round(imageData.height * ratio);
                }

                const destinationCanvas: HTMLCanvasElement = document.createElement('canvas');
                destinationCanvas.width = width;
                destinationCanvas.height = height;

                resizer.resize(originCanvas, destinationCanvas)
                    .catch((err) => resizedImage.error(err))
                    .then((resizedCanvas: HTMLCanvasElement) => resizer.toBlob(resizedCanvas, file.type))
                    .then((blob: Blob) => {
                        window.URL.revokeObjectURL(img.src);
                        let fileResized: File = this.generateResultFile(blob, file.name, file.type, new Date().getTime());
                        resizedImage.next(fileResized);
                    });
            };

            img.src = window.URL.createObjectURL(file);
        } else {
            resizedImage.error('CANVAS_CONTEXT_IDENTIFIER_NOT_SUPPORTED');
        }

        return resizedImage.asObservable();
    }

    private generateResultFile(blob: Blob, name: string, type: string, lastModified: number): File {
        return new File([blob], name, {type: type, lastModified: lastModified});
    }

}