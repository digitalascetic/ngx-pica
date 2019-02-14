import { Subject } from 'rxjs';
import { getData, getAllTags } from 'exif-js';
import Pica from 'pica/dist/pica.js';
import { Injectable, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const NgxPicaErrorType = {
    NO_FILES_RECEIVED: 'NO_FILES_RECEIVED',
    CANVAS_CONTEXT_IDENTIFIER_NOT_SUPPORTED: 'CANVAS_CONTEXT_IDENTIFIER_NOT_SUPPORTED',
    NOT_BE_ABLE_TO_COMPRESS_ENOUGH: 'NOT_BE_ABLE_TO_COMPRESS_ENOUGH',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxPicaExifService {
    /**
     * @param {?} image
     * @return {?}
     */
    getExifOrientedImage(image) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            getData(((/** @type {?} */ (image))), (/**
             * @return {?}
             */
            () => {
                /** @type {?} */
                const allExifMetaData = getAllTags(image);
                /** @type {?} */
                const exifOrientation = allExifMetaData.Orientation;
                if (exifOrientation) {
                    if (!/^[1-8]$/.test(exifOrientation)) {
                        throw new Error('orientation should be [1-8]');
                    }
                    /** @type {?} */
                    const canvas = document.createElement('canvas');
                    /** @type {?} */
                    const ctx = canvas.getContext('2d');
                    /** @type {?} */
                    let deg = 0;
                    /** @type {?} */
                    let cx = 0;
                    /** @type {?} */
                    let cy = 0;
                    /** @type {?} */
                    let width = image.width;
                    /** @type {?} */
                    let height = image.height;
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
                    /** @type {?} */
                    const img = new Image();
                    img.width = width;
                    img.height = height;
                    img.onload = (/**
                     * @return {?}
                     */
                    () => {
                        resolve(img);
                    });
                    img.src = canvas.toDataURL();
                }
                else {
                    resolve(image);
                }
            }));
        }));
    }
}
NgxPicaExifService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxPicaService {
    /**
     * @param {?} _ngxPicaExifService
     */
    constructor(_ngxPicaExifService) {
        this._ngxPicaExifService = _ngxPicaExifService;
        this.picaResizer = new Pica();
        this.MAX_STEPS = 20;
        if (!this.picaResizer || !this.picaResizer.resize) {
            this.picaResizer = new Pica();
        }
    }
    /**
     * @param {?} files
     * @param {?} width
     * @param {?} height
     * @param {?=} options
     * @return {?}
     */
    resizeImages(files, width, height, options) {
        /** @type {?} */
        const resizedImage = new Subject();
        /** @type {?} */
        const totalFiles = files.length;
        if (totalFiles > 0) {
            /** @type {?} */
            const nextFile = new Subject();
            /** @type {?} */
            let index = 0;
            /** @type {?} */
            const subscription = nextFile.subscribe((/**
             * @param {?} file
             * @return {?}
             */
            (file) => {
                this.resizeImage(file, width, height, options).subscribe((/**
                 * @param {?} imageResized
                 * @return {?}
                 */
                imageResized => {
                    index++;
                    resizedImage.next(imageResized);
                    if (index < totalFiles) {
                        nextFile.next(files[index]);
                    }
                    else {
                        resizedImage.complete();
                        subscription.unsubscribe();
                    }
                }), (/**
                 * @param {?} err
                 * @return {?}
                 */
                (err) => {
                    /** @type {?} */
                    const ngxPicaError = {
                        file: file,
                        err: err
                    };
                    resizedImage.error(ngxPicaError);
                }));
            }));
            nextFile.next(files[index]);
        }
        else {
            /** @type {?} */
            const ngxPicaError = {
                err: NgxPicaErrorType.NO_FILES_RECEIVED
            };
            resizedImage.error(ngxPicaError);
            resizedImage.complete();
        }
        return resizedImage.asObservable();
    }
    /**
     * @param {?} file
     * @param {?} width
     * @param {?} height
     * @param {?=} options
     * @return {?}
     */
    resizeImage(file, width, height, options) {
        /** @type {?} */
        const resizedImage = new Subject();
        /** @type {?} */
        const originCanvas = document.createElement('canvas');
        /** @type {?} */
        const ctx = originCanvas.getContext('2d');
        /** @type {?} */
        const img = new Image();
        if (ctx) {
            img.onload = (/**
             * @return {?}
             */
            () => {
                this._ngxPicaExifService.getExifOrientedImage(img).then((/**
                 * @param {?} orientedImage
                 * @return {?}
                 */
                orientedImage => {
                    window.URL.revokeObjectURL(img.src);
                    originCanvas.width = orientedImage.width;
                    originCanvas.height = orientedImage.height;
                    ctx.drawImage(orientedImage, 0, 0);
                    /** @type {?} */
                    const imageData = ctx.getImageData(0, 0, orientedImage.width, orientedImage.height);
                    if (options && options.aspectRatio && options.aspectRatio.keepAspectRatio) {
                        /** @type {?} */
                        let ratio = 0;
                        if (options.aspectRatio.forceMinDimensions) {
                            ratio = Math.max(width / imageData.width, height / imageData.height);
                        }
                        else {
                            ratio = Math.min(width / imageData.width, height / imageData.height);
                        }
                        width = Math.round(imageData.width * ratio);
                        height = Math.round(imageData.height * ratio);
                    }
                    /** @type {?} */
                    const destinationCanvas = document.createElement('canvas');
                    destinationCanvas.width = width;
                    destinationCanvas.height = height;
                    this.picaResize(file, originCanvas, destinationCanvas, options)
                        .then((/**
                     * @param {?} imgResized
                     * @return {?}
                     */
                    (imgResized) => resizedImage.next(imgResized)))
                        .catch((/**
                     * @param {?} err
                     * @return {?}
                     */
                    (err) => resizedImage.error(err)));
                }));
            });
            img.src = window.URL.createObjectURL(file);
        }
        else {
            resizedImage.error(NgxPicaErrorType.CANVAS_CONTEXT_IDENTIFIER_NOT_SUPPORTED);
        }
        return resizedImage.asObservable();
    }
    /**
     * @param {?} files
     * @param {?} sizeInMB
     * @return {?}
     */
    compressImages(files, sizeInMB) {
        /** @type {?} */
        const compressedImage = new Subject();
        /** @type {?} */
        const totalFiles = files.length;
        if (totalFiles > 0) {
            /** @type {?} */
            const nextFile = new Subject();
            /** @type {?} */
            let index = 0;
            /** @type {?} */
            const subscription = nextFile.subscribe((/**
             * @param {?} file
             * @return {?}
             */
            (file) => {
                this.compressImage(file, sizeInMB).subscribe((/**
                 * @param {?} imageCompressed
                 * @return {?}
                 */
                imageCompressed => {
                    index++;
                    compressedImage.next(imageCompressed);
                    if (index < totalFiles) {
                        nextFile.next(files[index]);
                    }
                    else {
                        compressedImage.complete();
                        subscription.unsubscribe();
                    }
                }), (/**
                 * @param {?} err
                 * @return {?}
                 */
                (err) => {
                    /** @type {?} */
                    const ngxPicaError = {
                        file: file,
                        err: err
                    };
                    compressedImage.error(ngxPicaError);
                }));
            }));
            nextFile.next(files[index]);
        }
        else {
            /** @type {?} */
            const ngxPicaError = {
                err: NgxPicaErrorType.NO_FILES_RECEIVED
            };
            compressedImage.error(ngxPicaError);
            compressedImage.complete();
        }
        return compressedImage.asObservable();
    }
    /**
     * @param {?} file
     * @param {?} sizeInMB
     * @return {?}
     */
    compressImage(file, sizeInMB) {
        /** @type {?} */
        const compressedImage = new Subject();
        if (this.bytesToMB(file.size) <= sizeInMB) {
            setTimeout((/**
             * @return {?}
             */
            () => compressedImage.next(file)));
        }
        else {
            /** @type {?} */
            const originCanvas = document.createElement('canvas');
            /** @type {?} */
            const ctx = originCanvas.getContext('2d');
            /** @type {?} */
            const img = new Image();
            if (ctx) {
                img.onload = (/**
                 * @return {?}
                 */
                () => {
                    this._ngxPicaExifService.getExifOrientedImage(img).then((/**
                     * @param {?} orientedImage
                     * @return {?}
                     */
                    orientedImage => {
                        window.URL.revokeObjectURL(img.src);
                        originCanvas.width = orientedImage.width;
                        originCanvas.height = orientedImage.height;
                        ctx.drawImage(orientedImage, 0, 0);
                        this.getCompressedImage(originCanvas, file.type, 1, sizeInMB, 0)
                            .catch((/**
                         * @param {?} err
                         * @return {?}
                         */
                        (err) => compressedImage.error(err)))
                            .then((/**
                         * @param {?} blob
                         * @return {?}
                         */
                        (blob) => {
                            /** @type {?} */
                            const imgCompressed = this.blobToFile(blob, file.name, file.type, new Date().getTime());
                            compressedImage.next(imgCompressed);
                        }));
                    }));
                });
                img.src = window.URL.createObjectURL(file);
            }
            else {
                compressedImage.error(NgxPicaErrorType.CANVAS_CONTEXT_IDENTIFIER_NOT_SUPPORTED);
            }
        }
        return compressedImage.asObservable();
    }
    /**
     * @private
     * @param {?} canvas
     * @param {?} type
     * @param {?} quality
     * @param {?} sizeInMB
     * @param {?} step
     * @return {?}
     */
    getCompressedImage(canvas, type, quality, sizeInMB, step) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            this.picaResizer.toBlob(canvas, type, quality)
                .catch((/**
             * @param {?} err
             * @return {?}
             */
            (err) => reject(err)))
                .then((/**
             * @param {?} blob
             * @return {?}
             */
            (blob) => {
                this.checkCompressedImageSize(canvas, blob, quality, sizeInMB, step)
                    .then((/**
                 * @param {?} compressedBlob
                 * @return {?}
                 */
                (compressedBlob) => resolve(compressedBlob)))
                    .catch((/**
                 * @param {?} err
                 * @return {?}
                 */
                (err) => reject(err)));
            }));
        }));
    }
    /**
     * @private
     * @param {?} canvas
     * @param {?} blob
     * @param {?} quality
     * @param {?} sizeInMB
     * @param {?} step
     * @return {?}
     */
    checkCompressedImageSize(canvas, blob, quality, sizeInMB, step) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            if (step > this.MAX_STEPS) {
                reject(NgxPicaErrorType.NOT_BE_ABLE_TO_COMPRESS_ENOUGH);
            }
            else if (this.bytesToMB(blob.size) < sizeInMB) {
                resolve(blob);
            }
            else {
                /** @type {?} */
                const newQuality = quality - (quality * 0.1);
                /** @type {?} */
                const newStep = step + 1;
                // recursively compression
                resolve(this.getCompressedImage(canvas, blob.type, newQuality, sizeInMB, newStep));
            }
        }));
    }
    /**
     * @private
     * @param {?} file
     * @param {?} from
     * @param {?} to
     * @param {?} options
     * @return {?}
     */
    picaResize(file, from, to, options) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            this.picaResizer.resize(from, to, options)
                .catch((/**
             * @param {?} err
             * @return {?}
             */
            (err) => reject(err)))
                .then((/**
             * @param {?} resizedCanvas
             * @return {?}
             */
            (resizedCanvas) => this.picaResizer.toBlob(resizedCanvas, file.type)))
                .then((/**
             * @param {?} blob
             * @return {?}
             */
            (blob) => {
                /** @type {?} */
                const fileResized = this.blobToFile(blob, file.name, file.type, new Date().getTime());
                resolve(fileResized);
            }));
        }));
    }
    /**
     * @private
     * @param {?} blob
     * @param {?} name
     * @param {?} type
     * @param {?} lastModified
     * @return {?}
     */
    blobToFile(blob, name, type, lastModified) {
        return new File([blob], name, { type: type, lastModified: lastModified });
    }
    /**
     * @private
     * @param {?} bytes
     * @return {?}
     */
    bytesToMB(bytes) {
        return bytes / 1048576;
    }
}
NgxPicaService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NgxPicaService.ctorParameters = () => [
    { type: NgxPicaExifService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxPicaImageService {
    constructor() {
        this.imageExtensions = [
            'ase',
            'art',
            'bmp',
            'blp',
            'cd5',
            'cit',
            'cpt',
            'cr2',
            'cut',
            'dds',
            'dib',
            'djvu',
            'egt',
            'exif',
            'gif',
            'gpl',
            'grf',
            'icns',
            'ico',
            'iff',
            'jng',
            'jpeg',
            'jpg',
            'jfif',
            'jp2',
            'jps',
            'lbm',
            'max',
            'miff',
            'mng',
            'msp',
            'nitf',
            'ota',
            'pbm',
            'pc1',
            'pc2',
            'pc3',
            'pcf',
            'pcx',
            'pdn',
            'pgm',
            'PI1',
            'PI2',
            'PI3',
            'pict',
            'pct',
            'pnm',
            'pns',
            'ppm',
            'psb',
            'psd',
            'pdd',
            'psp',
            'px',
            'pxm',
            'pxr',
            'qfx',
            'raw',
            'rle',
            'sct',
            'sgi',
            'rgb',
            'int',
            'bw',
            'tga',
            'tiff',
            'tif',
            'vtf',
            'xbm',
            'xcf',
            'xpm',
            '3dv',
            'amf',
            'ai',
            'awg',
            'cgm',
            'cdr',
            'cmx',
            'dxf',
            'e2d',
            'egt',
            'eps',
            'fs',
            'gbr',
            'odg',
            'svg',
            'stl',
            'vrml',
            'x3d',
            'sxd',
            'v2d',
            'vnd',
            'wmf',
            'emf',
            'art',
            'xar',
            'png',
            'webp',
            'jxr',
            'hdp',
            'wdp',
            'cur',
            'ecw',
            'iff',
            'lbm',
            'liff',
            'nrrd',
            'pam',
            'pcx',
            'pgf',
            'sgi',
            'rgb',
            'rgba',
            'bw',
            'int',
            'inta',
            'sid',
            'ras',
            'sun',
            'tga'
        ];
    }
    /**
     * @param {?} file
     * @return {?}
     */
    isImage(file) {
        /** @type {?} */
        const fileExtension = file.name.toLowerCase().substr(file.name.lastIndexOf('.') + 1);
        return (this.imageExtensions.indexOf(fileExtension) !== -1);
    }
}
NgxPicaImageService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxPicaModule {
}
NgxPicaModule.decorators = [
    { type: NgModule, args: [{
                providers: [
                    { provide: NgxPicaService, useClass: NgxPicaService },
                    { provide: NgxPicaExifService, useClass: NgxPicaExifService },
                    { provide: NgxPicaImageService, useClass: NgxPicaImageService },
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NgxPicaModule, NgxPicaService, NgxPicaImageService, NgxPicaExifService as ɵa };

//# sourceMappingURL=digitalascetic-ngx-pica.js.map