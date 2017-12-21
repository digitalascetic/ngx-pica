import {Injectable} from '@angular/core';
import pica from 'pica/dist/pica';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

declare let window: any;

@Injectable()
export class NgxPicaService {


    public resizeImages(files: File[], width: number, height: number, keepAspectRatio: boolean = false): Observable<File> {
        const resizedImage: Subject<File> = new Subject();
        const totalFiles: number = files.length;

        for (let i = 0; i < totalFiles; i++) {
            this.resizeImage(files[i], width, height, keepAspectRatio).subscribe(imageResized => {
                resizedImage.next(imageResized);
            }, (err) => {
                resizedImage.error(err);
            });
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
                        let fileResized: File = this.generateResultFile(blob, file.name, file.type, new Date().getTime());
                        resizedImage.next(fileResized);
                    });
            };

            img.src = window.URL.createObjectURL(file);
        } else {
            resizedImage.error('Canvas context identifier is not supported.');
        }

        return resizedImage.asObservable();
    }

    private generateResultFile(blob: Blob, name: string, type: string, lastModified: number): File {
        let resultFile = new Blob([blob], {type: type});
        return this.blobToFile(resultFile, name, lastModified);
    }

    private blobToFile(blob: Blob, name: string, lastModified: number): File {
        let file: any = blob;
        file.name = name;
        file.lastModified = lastModified;

        //Cast to a File() type
        return <File> file;
    }

}