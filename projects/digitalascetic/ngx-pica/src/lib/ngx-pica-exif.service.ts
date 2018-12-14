import {Injectable} from '@angular/core';
import * as EXIF from 'exif-js';


@Injectable()
export class NgxPicaExifService {

    public getExifOrientedImage(image: HTMLImageElement): Promise<HTMLImageElement> {
        return new Promise<HTMLImageElement>((resolve, reject) => {
            EXIF.getData((image as any), () => {
                const allExifMetaData = EXIF.getAllTags(image),
                    exifOrientation = allExifMetaData.Orientation;

                if (exifOrientation) {

                    if (!/^[1-8]$/.test(exifOrientation)) {
                        throw new Error('orientation should be [1-8]');
                    }

                    const canvas: HTMLCanvasElement = document.createElement('canvas'),
                        ctx = canvas.getContext('2d');

                    let deg = 0,
                        cx = 0,
                        cy = 0,
                        width: number = image.width,
                        height: number = image.height;

                    if ([5, 6, 7, 8].indexOf(exifOrientation) > -1) {
                        width = image.height;
                        height = image.width;
                    }

                    canvas.width = width;
                    canvas.height = height;

                    switch (exifOrientation) {
                        case 3:
                        case 4:
                            cx = -image.width;
                            cy = -image.height;
                            deg = 180;
                            break;
                        case 5:
                        case 6:
                            cy = -image.height;
                            deg = 90;
                            break;
                        case 7:
                        case 8:
                            cx = -image.width;
                            deg = 270;
                            break;
                        default:
                            break;
                    }

                    if ([2, 4, 5, 7].indexOf(exifOrientation) > -1) {
                        ctx.translate(width, 0);
                        ctx.scale(-1, 1);
                    }

                    ctx.rotate(deg / 180 * Math.PI);
                    ctx.drawImage(image, cx, cy);

                    const img = new Image();

                    img.width = width;
                    img.height = height;

                    img.onload = () => {
                        resolve(img);
                    };

                    img.src = canvas.toDataURL();
                } else {
                    resolve(image);
                }
            });
        });
    }

}
