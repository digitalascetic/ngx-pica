import {Injectable} from '@angular/core';
import * as EXIF from 'exif-js';


@Injectable()
export class NgxPicaExifService {

    public getExifOrientedImage(image: HTMLImageElement): Promise<HTMLImageElement> {
        return new Promise<HTMLImageElement>((resolve, reject) => {
            EXIF.getData(image, () => {
                const allExifMetaData = EXIF.getAllTags(image),
                    exifOrientation = allExifMetaData.Orientation;

                if (exifOrientation) {
                    const canvas: HTMLCanvasElement = document.createElement('canvas'),
                        ctx = canvas.getContext('2d'),
                        width = image.width,
                        height = image.height;

                    if ([5, 6, 7, 8].indexOf(exifOrientation) > -1) {
                        canvas.width = height;
                        canvas.height = width;
                    } else {
                        canvas.width = width;
                        canvas.height = height;
                    }

                    if (ctx) {
                        // transform context before drawing image
                        switch (exifOrientation) {
                            case 2:
                                ctx.transform(-1, 0, 0, 1, width, 0);
                                break;
                            case 3:
                                ctx.transform(-1, 0, 0, -1, width, height);
                                break;
                            case 4:
                                ctx.transform(1, 0, 0, -1, 0, height);
                                break;
                            case 5:
                                ctx.transform(0, 1, 1, 0, 0, 0);
                                break;
                            case 6:
                                ctx.transform(0, 1, -1, 0, height, 0);
                                break;
                            case 7:
                                ctx.transform(0, -1, -1, 0, height, width);
                                break;
                            case 8:
                                ctx.transform(0, -1, 1, 0, 0, width);
                                break;
                            default:
                                ctx.transform(1, 0, 0, 1, 0, 0);
                        }

                        // Draw img into canvas
                        ctx.drawImage(image, 0, 0, width, height);

                        const img = new Image();

                        img.width = width;
                        img.height = height;

                        img.onload = () => {
                            resolve(img);
                        };

                        img.src = canvas.toDataURL();
                    }
                } else {
                    resolve(image);
                }
            });
        });
    }

}