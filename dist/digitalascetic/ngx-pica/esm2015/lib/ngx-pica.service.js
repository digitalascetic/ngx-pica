/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NgxPicaErrorType } from './ngx-pica-error.interface';
import { NgxPicaExifService } from './ngx-pica-exif.service';
import Pica from 'pica/dist/pica.js';
export class NgxPicaService {
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
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgxPicaService.prototype.picaResizer;
    /**
     * @type {?}
     * @private
     */
    NgxPicaService.prototype.MAX_STEPS;
    /**
     * @type {?}
     * @private
     */
    NgxPicaService.prototype._ngxPicaExifService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXBpY2Euc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkaWdpdGFsYXNjZXRpYy9uZ3gtcGljYS8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtcGljYS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQTRCLE1BQU0sTUFBTSxDQUFDO0FBQ3pELE9BQU8sRUFBZ0IsZ0JBQWdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUU1RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM3RCxPQUFPLElBQUksTUFBTSxtQkFBbUIsQ0FBQztBQUtyQyxNQUFNLE9BQU8sY0FBYzs7OztJQUl2QixZQUFvQixtQkFBdUM7UUFBdkMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFvQjtRQUhuRCxnQkFBVyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDekIsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUduQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFO1lBQy9DLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztTQUNqQztJQUNMLENBQUM7Ozs7Ozs7O0lBRU0sWUFBWSxDQUNmLEtBQWEsRUFDYixLQUFhLEVBQ2IsTUFBYyxFQUNkLE9BQThCOztjQUV4QixZQUFZLEdBQWtCLElBQUksT0FBTyxFQUFFOztjQUMzQyxVQUFVLEdBQVcsS0FBSyxDQUFDLE1BQU07UUFFdkMsSUFBSSxVQUFVLEdBQUcsQ0FBQyxFQUFFOztrQkFDVixRQUFRLEdBQWtCLElBQUksT0FBTyxFQUFFOztnQkFDekMsS0FBSyxHQUFHLENBQUM7O2tCQUVQLFlBQVksR0FBaUIsUUFBUSxDQUFDLFNBQVM7Ozs7WUFBQyxDQUFDLElBQVUsRUFBRSxFQUFF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QU0sQ0FBQyxHQUFHLENBQUMsRUFBQztpQkFDM0IsSUFBSTs7OztZQUFDLENBQUMsYUFBZ0MsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQztpQkFDN0YsSUFBSTs7OztZQUFDLENBQUMsSUFBVSxFQUFFLEVBQUU7O3NCQUNYLFdBQVcsR0FBUyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDM0YsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3pCLENBQUMsRUFBQyxDQUFDO1FBQ1gsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7Ozs7Ozs7SUFFTyxVQUFVLENBQUMsSUFBVSxFQUFFLElBQVksRUFBRSxJQUFZLEVBQUUsWUFBb0I7UUFDM0UsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7SUFDOUUsQ0FBQzs7Ozs7O0lBRU8sU0FBUyxDQUFDLEtBQWE7UUFDM0IsT0FBTyxLQUFLLEdBQUcsT0FBTyxDQUFDO0lBQzNCLENBQUM7OztZQW5QSixVQUFVOzs7O1lBTEYsa0JBQWtCOzs7Ozs7O0lBT3ZCLHFDQUFpQzs7Ozs7SUFDakMsbUNBQXVCOzs7OztJQUVYLDZDQUErQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QsIE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTmd4UGljYUVycm9yLCBOZ3hQaWNhRXJyb3JUeXBlIH0gZnJvbSAnLi9uZ3gtcGljYS1lcnJvci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgTmd4UGljYVJlc2l6ZU9wdGlvbnMgfSBmcm9tICcuL25neC1waWNhLXJlc2l6ZS1vcHRpb25zLmludGVyZmFjZSc7XG5pbXBvcnQgeyBOZ3hQaWNhRXhpZlNlcnZpY2UgfSBmcm9tICcuL25neC1waWNhLWV4aWYuc2VydmljZSc7XG5pbXBvcnQgUGljYSBmcm9tICdwaWNhL2Rpc3QvcGljYS5qcyc7XG5cbmRlY2xhcmUgbGV0IHdpbmRvdzogYW55O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmd4UGljYVNlcnZpY2Uge1xuICAgIHByaXZhdGUgcGljYVJlc2l6ZXIgPSBuZXcgUGljYSgpO1xuICAgIHByaXZhdGUgTUFYX1NURVBTID0gMjA7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9uZ3hQaWNhRXhpZlNlcnZpY2U6IE5neFBpY2FFeGlmU2VydmljZSkge1xuICAgICAgICBpZiAoIXRoaXMucGljYVJlc2l6ZXIgfHwgIXRoaXMucGljYVJlc2l6ZXIucmVzaXplKSB7XG4gICAgICAgICAgICB0aGlzLnBpY2FSZXNpemVyID0gbmV3IFBpY2EoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyByZXNpemVJbWFnZXMoXG4gICAgICAgIGZpbGVzOiBGaWxlW10sXG4gICAgICAgIHdpZHRoOiBudW1iZXIsXG4gICAgICAgIGhlaWdodDogbnVtYmVyLFxuICAgICAgICBvcHRpb25zPzogTmd4UGljYVJlc2l6ZU9wdGlvbnNcbiAgICApOiBPYnNlcnZhYmxlPEZpbGU+IHtcbiAgICAgICAgY29uc3QgcmVzaXplZEltYWdlOiBTdWJqZWN0PEZpbGU+ID0gbmV3IFN1YmplY3QoKTtcbiAgICAgICAgY29uc3QgdG90YWxGaWxlczogbnVtYmVyID0gZmlsZXMubGVuZ3RoO1xuXG4gICAgICAgIGlmICh0b3RhbEZpbGVzID4gMCkge1xuICAgICAgICAgICAgY29uc3QgbmV4dEZpbGU6IFN1YmplY3Q8RmlsZT4gPSBuZXcgU3ViamVjdCgpO1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcblxuICAgICAgICAgICAgY29uc3Qgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBuZXh0RmlsZS5zdWJzY3JpYmUoKGZpbGU6IEZpbGUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZUltYWdlKGZpbGUsIHdpZHRoLCBoZWlnaHQsIG9wdGlvbnMpLnN1YnNjcmliZShpbWFnZVJlc2l6ZWQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgICAgICAgICByZXNpemVkSW1hZ2UubmV4dChpbWFnZVJlc2l6ZWQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPCB0b3RhbEZpbGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0RmlsZS5uZXh0KGZpbGVzW2luZGV4XSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNpemVkSW1hZ2UuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgKGVycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZ3hQaWNhRXJyb3I6IE5neFBpY2FFcnJvciA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGU6IGZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnI6IGVyclxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIHJlc2l6ZWRJbWFnZS5lcnJvcihuZ3hQaWNhRXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG5leHRGaWxlLm5leHQoZmlsZXNbaW5kZXhdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IG5neFBpY2FFcnJvcjogTmd4UGljYUVycm9yID0ge1xuICAgICAgICAgICAgICAgIGVycjogTmd4UGljYUVycm9yVHlwZS5OT19GSUxFU19SRUNFSVZFRFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJlc2l6ZWRJbWFnZS5lcnJvcihuZ3hQaWNhRXJyb3IpO1xuICAgICAgICAgICAgcmVzaXplZEltYWdlLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzaXplZEltYWdlLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZXNpemVJbWFnZShcbiAgICAgICAgZmlsZTogRmlsZSxcbiAgICAgICAgd2lkdGg6IG51bWJlcixcbiAgICAgICAgaGVpZ2h0OiBudW1iZXIsXG4gICAgICAgIG9wdGlvbnM/OiBOZ3hQaWNhUmVzaXplT3B0aW9uc1xuICAgICk6IE9ic2VydmFibGU8RmlsZT4ge1xuICAgICAgICBjb25zdCByZXNpemVkSW1hZ2U6IFN1YmplY3Q8RmlsZT4gPSBuZXcgU3ViamVjdCgpO1xuICAgICAgICBjb25zdCBvcmlnaW5DYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgIGNvbnN0IGN0eCA9IG9yaWdpbkNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcblxuICAgICAgICBpZiAoY3R4KSB7XG4gICAgICAgICAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX25neFBpY2FFeGlmU2VydmljZS5nZXRFeGlmT3JpZW50ZWRJbWFnZShpbWcpLnRoZW4ob3JpZW50ZWRJbWFnZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKGltZy5zcmMpO1xuICAgICAgICAgICAgICAgICAgICBvcmlnaW5DYW52YXMud2lkdGggPSBvcmllbnRlZEltYWdlLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICBvcmlnaW5DYW52YXMuaGVpZ2h0ID0gb3JpZW50ZWRJbWFnZS5oZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShvcmllbnRlZEltYWdlLCAwLCAwKTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbWFnZURhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIG9yaWVudGVkSW1hZ2Uud2lkdGgsIG9yaWVudGVkSW1hZ2UuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5hc3BlY3RSYXRpbyAmJiBvcHRpb25zLmFzcGVjdFJhdGlvLmtlZXBBc3BlY3RSYXRpbykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJhdGlvID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmFzcGVjdFJhdGlvLmZvcmNlTWluRGltZW5zaW9ucykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhdGlvID0gTWF0aC5tYXgod2lkdGggLyBpbWFnZURhdGEud2lkdGgsIGhlaWdodCAvIGltYWdlRGF0YS5oZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYXRpbyA9IE1hdGgubWluKHdpZHRoIC8gaW1hZ2VEYXRhLndpZHRoLCBoZWlnaHQgLyBpbWFnZURhdGEuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoID0gTWF0aC5yb3VuZChpbWFnZURhdGEud2lkdGggKiByYXRpbyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQgPSBNYXRoLnJvdW5kKGltYWdlRGF0YS5oZWlnaHQgKiByYXRpbyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZXN0aW5hdGlvbkNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgICAgICAgICAgICAgZGVzdGluYXRpb25DYW52YXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgZGVzdGluYXRpb25DYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGljYVJlc2l6ZShmaWxlLCBvcmlnaW5DYW52YXMsIGRlc3RpbmF0aW9uQ2FudmFzLCBvcHRpb25zKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGltZ1Jlc2l6ZWQ6IEZpbGUpID0+IHJlc2l6ZWRJbWFnZS5uZXh0KGltZ1Jlc2l6ZWQpKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHJlc2l6ZWRJbWFnZS5lcnJvcihlcnIpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpbWcuc3JjID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNpemVkSW1hZ2UuZXJyb3IoTmd4UGljYUVycm9yVHlwZS5DQU5WQVNfQ09OVEVYVF9JREVOVElGSUVSX05PVF9TVVBQT1JURUQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc2l6ZWRJbWFnZS5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY29tcHJlc3NJbWFnZXMoZmlsZXM6IEZpbGVbXSwgc2l6ZUluTUI6IG51bWJlcik6IE9ic2VydmFibGU8RmlsZT4ge1xuICAgICAgICBjb25zdCBjb21wcmVzc2VkSW1hZ2U6IFN1YmplY3Q8RmlsZT4gPSBuZXcgU3ViamVjdCgpO1xuICAgICAgICBjb25zdCB0b3RhbEZpbGVzOiBudW1iZXIgPSBmaWxlcy5sZW5ndGg7XG5cbiAgICAgICAgaWYgKHRvdGFsRmlsZXMgPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBuZXh0RmlsZTogU3ViamVjdDxGaWxlPiA9IG5ldyBTdWJqZWN0KCk7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuXG4gICAgICAgICAgICBjb25zdCBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IG5leHRGaWxlLnN1YnNjcmliZSgoZmlsZTogRmlsZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tcHJlc3NJbWFnZShmaWxlLCBzaXplSW5NQikuc3Vic2NyaWJlKGltYWdlQ29tcHJlc3NlZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICAgICAgICAgIGNvbXByZXNzZWRJbWFnZS5uZXh0KGltYWdlQ29tcHJlc3NlZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA8IHRvdGFsRmlsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRGaWxlLm5leHQoZmlsZXNbaW5kZXhdKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXByZXNzZWRJbWFnZS5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5neFBpY2FFcnJvcjogTmd4UGljYUVycm9yID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZTogZmlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycjogZXJyXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGNvbXByZXNzZWRJbWFnZS5lcnJvcihuZ3hQaWNhRXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG5leHRGaWxlLm5leHQoZmlsZXNbaW5kZXhdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IG5neFBpY2FFcnJvcjogTmd4UGljYUVycm9yID0ge1xuICAgICAgICAgICAgICAgIGVycjogTmd4UGljYUVycm9yVHlwZS5OT19GSUxFU19SRUNFSVZFRFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbXByZXNzZWRJbWFnZS5lcnJvcihuZ3hQaWNhRXJyb3IpO1xuICAgICAgICAgICAgY29tcHJlc3NlZEltYWdlLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29tcHJlc3NlZEltYWdlLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb21wcmVzc0ltYWdlKGZpbGU6IEZpbGUsIHNpemVJbk1COiBudW1iZXIpOiBPYnNlcnZhYmxlPEZpbGU+IHtcbiAgICAgICAgY29uc3QgY29tcHJlc3NlZEltYWdlOiBTdWJqZWN0PEZpbGU+ID0gbmV3IFN1YmplY3QoKTtcblxuICAgICAgICBpZiAodGhpcy5ieXRlc1RvTUIoZmlsZS5zaXplKSA8PSBzaXplSW5NQikge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBjb21wcmVzc2VkSW1hZ2UubmV4dChmaWxlKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBvcmlnaW5DYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgICAgICBjb25zdCBjdHggPSBvcmlnaW5DYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuXG4gICAgICAgICAgICBpZiAoY3R4KSB7XG4gICAgICAgICAgICAgICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmd4UGljYUV4aWZTZXJ2aWNlLmdldEV4aWZPcmllbnRlZEltYWdlKGltZykudGhlbihvcmllbnRlZEltYWdlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKGltZy5zcmMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luQ2FudmFzLndpZHRoID0gb3JpZW50ZWRJbWFnZS53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbkNhbnZhcy5oZWlnaHQgPSBvcmllbnRlZEltYWdlLmhlaWdodDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShvcmllbnRlZEltYWdlLCAwLCAwKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRDb21wcmVzc2VkSW1hZ2Uob3JpZ2luQ2FudmFzLCBmaWxlLnR5cGUsIDEsIHNpemVJbk1CLCAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiBjb21wcmVzc2VkSW1hZ2UuZXJyb3IoZXJyKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoYmxvYjogQmxvYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbWdDb21wcmVzc2VkOiBGaWxlID0gdGhpcy5ibG9iVG9GaWxlKGJsb2IsIGZpbGUubmFtZSwgZmlsZS50eXBlLCBuZXcgRGF0ZSgpLmdldFRpbWUoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXByZXNzZWRJbWFnZS5uZXh0KGltZ0NvbXByZXNzZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaW1nLnNyYyA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb21wcmVzc2VkSW1hZ2UuZXJyb3IoTmd4UGljYUVycm9yVHlwZS5DQU5WQVNfQ09OVEVYVF9JREVOVElGSUVSX05PVF9TVVBQT1JURUQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbXByZXNzZWRJbWFnZS5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldENvbXByZXNzZWRJbWFnZShcbiAgICAgICAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCxcbiAgICAgICAgdHlwZTogc3RyaW5nLFxuICAgICAgICBxdWFsaXR5OiBudW1iZXIsXG4gICAgICAgIHNpemVJbk1COiBudW1iZXIsXG4gICAgICAgIHN0ZXA6IG51bWJlclxuICAgICk6IFByb21pc2U8QmxvYj4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8QmxvYj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5waWNhUmVzaXplci50b0Jsb2IoY2FudmFzLCB0eXBlLCBxdWFsaXR5KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiByZWplY3QoZXJyKSlcbiAgICAgICAgICAgICAgICAudGhlbigoYmxvYjogQmxvYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQ29tcHJlc3NlZEltYWdlU2l6ZShjYW52YXMsIGJsb2IsIHF1YWxpdHksIHNpemVJbk1CLCBzdGVwKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGNvbXByZXNzZWRCbG9iOiBCbG9iKSA9PiByZXNvbHZlKGNvbXByZXNzZWRCbG9iKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiByZWplY3QoZXJyKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hlY2tDb21wcmVzc2VkSW1hZ2VTaXplKFxuICAgICAgICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LFxuICAgICAgICBibG9iOiBCbG9iLFxuICAgICAgICBxdWFsaXR5OiBudW1iZXIsXG4gICAgICAgIHNpemVJbk1COiBudW1iZXIsXG4gICAgICAgIHN0ZXA6IG51bWJlclxuICAgICk6IFByb21pc2U8QmxvYj4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8QmxvYj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKHN0ZXAgPiB0aGlzLk1BWF9TVEVQUykge1xuICAgICAgICAgICAgICAgIHJlamVjdChOZ3hQaWNhRXJyb3JUeXBlLk5PVF9CRV9BQkxFX1RPX0NPTVBSRVNTX0VOT1VHSCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYnl0ZXNUb01CKGJsb2Iuc2l6ZSkgPCBzaXplSW5NQikge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoYmxvYik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1F1YWxpdHk6IG51bWJlciA9IHF1YWxpdHkgLSAocXVhbGl0eSAqIDAuMSk7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3U3RlcDogbnVtYmVyID0gc3RlcCArIDE7XG4gICAgICAgICAgICAgICAgLy8gcmVjdXJzaXZlbHkgY29tcHJlc3Npb25cbiAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMuZ2V0Q29tcHJlc3NlZEltYWdlKGNhbnZhcywgYmxvYi50eXBlLCBuZXdRdWFsaXR5LCBzaXplSW5NQiwgbmV3U3RlcCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHBpY2FSZXNpemUoXG4gICAgICAgIGZpbGU6IEZpbGUsXG4gICAgICAgIGZyb206IEhUTUxDYW52YXNFbGVtZW50LFxuICAgICAgICB0bzogSFRNTENhbnZhc0VsZW1lbnQsXG4gICAgICAgIG9wdGlvbnM6IGFueVxuICAgICk6IFByb21pc2U8RmlsZT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8RmlsZT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5waWNhUmVzaXplci5yZXNpemUoZnJvbSwgdG8sIG9wdGlvbnMpXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHJlamVjdChlcnIpKVxuICAgICAgICAgICAgICAgIC50aGVuKChyZXNpemVkQ2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkgPT4gdGhpcy5waWNhUmVzaXplci50b0Jsb2IocmVzaXplZENhbnZhcywgZmlsZS50eXBlKSlcbiAgICAgICAgICAgICAgICAudGhlbigoYmxvYjogQmxvYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWxlUmVzaXplZDogRmlsZSA9IHRoaXMuYmxvYlRvRmlsZShibG9iLCBmaWxlLm5hbWUsIGZpbGUudHlwZSwgbmV3IERhdGUoKS5nZXRUaW1lKCkpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZpbGVSZXNpemVkKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBibG9iVG9GaWxlKGJsb2I6IEJsb2IsIG5hbWU6IHN0cmluZywgdHlwZTogc3RyaW5nLCBsYXN0TW9kaWZpZWQ6IG51bWJlcik6IEZpbGUge1xuICAgICAgICByZXR1cm4gbmV3IEZpbGUoW2Jsb2JdLCBuYW1lLCB7IHR5cGU6IHR5cGUsIGxhc3RNb2RpZmllZDogbGFzdE1vZGlmaWVkIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgYnl0ZXNUb01CKGJ5dGVzOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIGJ5dGVzIC8gMTA0ODU3NjtcbiAgICB9XG59XG4iXX0=