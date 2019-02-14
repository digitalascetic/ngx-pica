/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NgxPicaErrorType } from './ngx-pica-error.interface';
import { NgxPicaExifService } from './ngx-pica-exif.service';
import Pica from 'pica/dist/pica.js';
var NgxPicaService = /** @class */ (function () {
    function NgxPicaService(_ngxPicaExifService) {
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
    NgxPicaService.prototype.resizeImages = /**
     * @param {?} files
     * @param {?} width
     * @param {?} height
     * @param {?=} options
     * @return {?}
     */
    function (files, width, height, options) {
        var _this = this;
        /** @type {?} */
        var resizedImage = new Subject();
        /** @type {?} */
        var totalFiles = files.length;
        if (totalFiles > 0) {
            /** @type {?} */
            var nextFile_1 = new Subject();
            /** @type {?} */
            var index_1 = 0;
            /** @type {?} */
            var subscription_1 = nextFile_1.subscribe((/**
             * @param {?} file
             * @return {?}
             */
            function (file) {
                _this.resizeImage(file, width, height, options).subscribe((/**
                 * @param {?} imageResized
                 * @return {?}
                 */
                function (imageResized) {
                    index_1++;
                    resizedImage.next(imageResized);
                    if (index_1 < totalFiles) {
                        nextFile_1.next(files[index_1]);
                    }
                    else {
                        resizedImage.complete();
                        subscription_1.unsubscribe();
                    }
                }), (/**
                 * @param {?} err
                 * @return {?}
                 */
                function (err) {
                    /** @type {?} */
                    var ngxPicaError = {
                        file: file,
                        err: err
                    };
                    resizedImage.error(ngxPicaError);
                }));
            }));
            nextFile_1.next(files[index_1]);
        }
        else {
            /** @type {?} */
            var ngxPicaError = {
                err: NgxPicaErrorType.NO_FILES_RECEIVED
            };
            resizedImage.error(ngxPicaError);
            resizedImage.complete();
        }
        return resizedImage.asObservable();
    };
    /**
     * @param {?} file
     * @param {?} width
     * @param {?} height
     * @param {?=} options
     * @return {?}
     */
    NgxPicaService.prototype.resizeImage = /**
     * @param {?} file
     * @param {?} width
     * @param {?} height
     * @param {?=} options
     * @return {?}
     */
    function (file, width, height, options) {
        var _this = this;
        /** @type {?} */
        var resizedImage = new Subject();
        /** @type {?} */
        var originCanvas = document.createElement('canvas');
        /** @type {?} */
        var ctx = originCanvas.getContext('2d');
        /** @type {?} */
        var img = new Image();
        if (ctx) {
            img.onload = (/**
             * @return {?}
             */
            function () {
                _this._ngxPicaExifService.getExifOrientedImage(img).then((/**
                 * @param {?} orientedImage
                 * @return {?}
                 */
                function (orientedImage) {
                    window.URL.revokeObjectURL(img.src);
                    originCanvas.width = orientedImage.width;
                    originCanvas.height = orientedImage.height;
                    ctx.drawImage(orientedImage, 0, 0);
                    /** @type {?} */
                    var imageData = ctx.getImageData(0, 0, orientedImage.width, orientedImage.height);
                    if (options && options.aspectRatio && options.aspectRatio.keepAspectRatio) {
                        /** @type {?} */
                        var ratio = 0;
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
                    var destinationCanvas = document.createElement('canvas');
                    destinationCanvas.width = width;
                    destinationCanvas.height = height;
                    _this.picaResize(file, originCanvas, destinationCanvas, options)
                        .then((/**
                     * @param {?} imgResized
                     * @return {?}
                     */
                    function (imgResized) { return resizedImage.next(imgResized); }))
                        .catch((/**
                     * @param {?} err
                     * @return {?}
                     */
                    function (err) { return resizedImage.error(err); }));
                }));
            });
            img.src = window.URL.createObjectURL(file);
        }
        else {
            resizedImage.error(NgxPicaErrorType.CANVAS_CONTEXT_IDENTIFIER_NOT_SUPPORTED);
        }
        return resizedImage.asObservable();
    };
    /**
     * @param {?} files
     * @param {?} sizeInMB
     * @return {?}
     */
    NgxPicaService.prototype.compressImages = /**
     * @param {?} files
     * @param {?} sizeInMB
     * @return {?}
     */
    function (files, sizeInMB) {
        var _this = this;
        /** @type {?} */
        var compressedImage = new Subject();
        /** @type {?} */
        var totalFiles = files.length;
        if (totalFiles > 0) {
            /** @type {?} */
            var nextFile_2 = new Subject();
            /** @type {?} */
            var index_2 = 0;
            /** @type {?} */
            var subscription_2 = nextFile_2.subscribe((/**
             * @param {?} file
             * @return {?}
             */
            function (file) {
                _this.compressImage(file, sizeInMB).subscribe((/**
                 * @param {?} imageCompressed
                 * @return {?}
                 */
                function (imageCompressed) {
                    index_2++;
                    compressedImage.next(imageCompressed);
                    if (index_2 < totalFiles) {
                        nextFile_2.next(files[index_2]);
                    }
                    else {
                        compressedImage.complete();
                        subscription_2.unsubscribe();
                    }
                }), (/**
                 * @param {?} err
                 * @return {?}
                 */
                function (err) {
                    /** @type {?} */
                    var ngxPicaError = {
                        file: file,
                        err: err
                    };
                    compressedImage.error(ngxPicaError);
                }));
            }));
            nextFile_2.next(files[index_2]);
        }
        else {
            /** @type {?} */
            var ngxPicaError = {
                err: NgxPicaErrorType.NO_FILES_RECEIVED
            };
            compressedImage.error(ngxPicaError);
            compressedImage.complete();
        }
        return compressedImage.asObservable();
    };
    /**
     * @param {?} file
     * @param {?} sizeInMB
     * @return {?}
     */
    NgxPicaService.prototype.compressImage = /**
     * @param {?} file
     * @param {?} sizeInMB
     * @return {?}
     */
    function (file, sizeInMB) {
        var _this = this;
        /** @type {?} */
        var compressedImage = new Subject();
        if (this.bytesToMB(file.size) <= sizeInMB) {
            setTimeout((/**
             * @return {?}
             */
            function () { return compressedImage.next(file); }));
        }
        else {
            /** @type {?} */
            var originCanvas_1 = document.createElement('canvas');
            /** @type {?} */
            var ctx_1 = originCanvas_1.getContext('2d');
            /** @type {?} */
            var img_1 = new Image();
            if (ctx_1) {
                img_1.onload = (/**
                 * @return {?}
                 */
                function () {
                    _this._ngxPicaExifService.getExifOrientedImage(img_1).then((/**
                     * @param {?} orientedImage
                     * @return {?}
                     */
                    function (orientedImage) {
                        window.URL.revokeObjectURL(img_1.src);
                        originCanvas_1.width = orientedImage.width;
                        originCanvas_1.height = orientedImage.height;
                        ctx_1.drawImage(orientedImage, 0, 0);
                        _this.getCompressedImage(originCanvas_1, file.type, 1, sizeInMB, 0)
                            .catch((/**
                         * @param {?} err
                         * @return {?}
                         */
                        function (err) { return compressedImage.error(err); }))
                            .then((/**
                         * @param {?} blob
                         * @return {?}
                         */
                        function (blob) {
                            /** @type {?} */
                            var imgCompressed = _this.blobToFile(blob, file.name, file.type, new Date().getTime());
                            compressedImage.next(imgCompressed);
                        }));
                    }));
                });
                img_1.src = window.URL.createObjectURL(file);
            }
            else {
                compressedImage.error(NgxPicaErrorType.CANVAS_CONTEXT_IDENTIFIER_NOT_SUPPORTED);
            }
        }
        return compressedImage.asObservable();
    };
    /**
     * @private
     * @param {?} canvas
     * @param {?} type
     * @param {?} quality
     * @param {?} sizeInMB
     * @param {?} step
     * @return {?}
     */
    NgxPicaService.prototype.getCompressedImage = /**
     * @private
     * @param {?} canvas
     * @param {?} type
     * @param {?} quality
     * @param {?} sizeInMB
     * @param {?} step
     * @return {?}
     */
    function (canvas, type, quality, sizeInMB, step) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this.picaResizer.toBlob(canvas, type, quality)
                .catch((/**
             * @param {?} err
             * @return {?}
             */
            function (err) { return reject(err); }))
                .then((/**
             * @param {?} blob
             * @return {?}
             */
            function (blob) {
                _this.checkCompressedImageSize(canvas, blob, quality, sizeInMB, step)
                    .then((/**
                 * @param {?} compressedBlob
                 * @return {?}
                 */
                function (compressedBlob) { return resolve(compressedBlob); }))
                    .catch((/**
                 * @param {?} err
                 * @return {?}
                 */
                function (err) { return reject(err); }));
            }));
        }));
    };
    /**
     * @private
     * @param {?} canvas
     * @param {?} blob
     * @param {?} quality
     * @param {?} sizeInMB
     * @param {?} step
     * @return {?}
     */
    NgxPicaService.prototype.checkCompressedImageSize = /**
     * @private
     * @param {?} canvas
     * @param {?} blob
     * @param {?} quality
     * @param {?} sizeInMB
     * @param {?} step
     * @return {?}
     */
    function (canvas, blob, quality, sizeInMB, step) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            if (step > _this.MAX_STEPS) {
                reject(NgxPicaErrorType.NOT_BE_ABLE_TO_COMPRESS_ENOUGH);
            }
            else if (_this.bytesToMB(blob.size) < sizeInMB) {
                resolve(blob);
            }
            else {
                /** @type {?} */
                var newQuality = quality - (quality * 0.1);
                /** @type {?} */
                var newStep = step + 1;
                // recursively compression
                resolve(_this.getCompressedImage(canvas, blob.type, newQuality, sizeInMB, newStep));
            }
        }));
    };
    /**
     * @private
     * @param {?} file
     * @param {?} from
     * @param {?} to
     * @param {?} options
     * @return {?}
     */
    NgxPicaService.prototype.picaResize = /**
     * @private
     * @param {?} file
     * @param {?} from
     * @param {?} to
     * @param {?} options
     * @return {?}
     */
    function (file, from, to, options) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this.picaResizer.resize(from, to, options)
                .catch((/**
             * @param {?} err
             * @return {?}
             */
            function (err) { return reject(err); }))
                .then((/**
             * @param {?} resizedCanvas
             * @return {?}
             */
            function (resizedCanvas) { return _this.picaResizer.toBlob(resizedCanvas, file.type); }))
                .then((/**
             * @param {?} blob
             * @return {?}
             */
            function (blob) {
                /** @type {?} */
                var fileResized = _this.blobToFile(blob, file.name, file.type, new Date().getTime());
                resolve(fileResized);
            }));
        }));
    };
    /**
     * @private
     * @param {?} blob
     * @param {?} name
     * @param {?} type
     * @param {?} lastModified
     * @return {?}
     */
    NgxPicaService.prototype.blobToFile = /**
     * @private
     * @param {?} blob
     * @param {?} name
     * @param {?} type
     * @param {?} lastModified
     * @return {?}
     */
    function (blob, name, type, lastModified) {
        return new File([blob], name, { type: type, lastModified: lastModified });
    };
    /**
     * @private
     * @param {?} bytes
     * @return {?}
     */
    NgxPicaService.prototype.bytesToMB = /**
     * @private
     * @param {?} bytes
     * @return {?}
     */
    function (bytes) {
        return bytes / 1048576;
    };
    NgxPicaService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    NgxPicaService.ctorParameters = function () { return [
        { type: NgxPicaExifService }
    ]; };
    return NgxPicaService;
}());
export { NgxPicaService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXBpY2Euc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkaWdpdGFsYXNjZXRpYy9uZ3gtcGljYS8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtcGljYS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQTRCLE1BQU0sTUFBTSxDQUFDO0FBQ3pELE9BQU8sRUFBZ0IsZ0JBQWdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUU1RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM3RCxPQUFPLElBQUksTUFBTSxtQkFBbUIsQ0FBQztBQUlyQztJQUtJLHdCQUFvQixtQkFBdUM7UUFBdkMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFvQjtRQUhuRCxnQkFBVyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDekIsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUduQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFO1lBQy9DLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztTQUNqQztJQUNMLENBQUM7Ozs7Ozs7O0lBRU0scUNBQVk7Ozs7Ozs7SUFBbkIsVUFDSSxLQUFhLEVBQ2IsS0FBYSxFQUNiLE1BQWMsRUFDZCxPQUE4QjtRQUpsQyxpQkEyQ0M7O1lBckNTLFlBQVksR0FBa0IsSUFBSSxPQUFPLEVBQUU7O1lBQzNDLFVBQVUsR0FBVyxLQUFLLENBQUMsTUFBTTtRQUV2QyxJQUFJLFVBQVUsR0FBRyxDQUFDLEVBQUU7O2dCQUNWLFVBQVEsR0FBa0IsSUFBSSxPQUFPLEVBQUU7O2dCQUN6QyxPQUFLLEdBQUcsQ0FBQzs7Z0JBRVAsY0FBWSxHQUFpQixVQUFRLENBQUMsU0FBUzs7OztZQUFDLFVBQUMsSUFBVTtn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ICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QsIE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTmd4UGljYUVycm9yLCBOZ3hQaWNhRXJyb3JUeXBlIH0gZnJvbSAnLi9uZ3gtcGljYS1lcnJvci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgTmd4UGljYVJlc2l6ZU9wdGlvbnMgfSBmcm9tICcuL25neC1waWNhLXJlc2l6ZS1vcHRpb25zLmludGVyZmFjZSc7XG5pbXBvcnQgeyBOZ3hQaWNhRXhpZlNlcnZpY2UgfSBmcm9tICcuL25neC1waWNhLWV4aWYuc2VydmljZSc7XG5pbXBvcnQgUGljYSBmcm9tICdwaWNhL2Rpc3QvcGljYS5qcyc7XG5cbmRlY2xhcmUgbGV0IHdpbmRvdzogYW55O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmd4UGljYVNlcnZpY2Uge1xuICAgIHByaXZhdGUgcGljYVJlc2l6ZXIgPSBuZXcgUGljYSgpO1xuICAgIHByaXZhdGUgTUFYX1NURVBTID0gMjA7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9uZ3hQaWNhRXhpZlNlcnZpY2U6IE5neFBpY2FFeGlmU2VydmljZSkge1xuICAgICAgICBpZiAoIXRoaXMucGljYVJlc2l6ZXIgfHwgIXRoaXMucGljYVJlc2l6ZXIucmVzaXplKSB7XG4gICAgICAgICAgICB0aGlzLnBpY2FSZXNpemVyID0gbmV3IFBpY2EoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyByZXNpemVJbWFnZXMoXG4gICAgICAgIGZpbGVzOiBGaWxlW10sXG4gICAgICAgIHdpZHRoOiBudW1iZXIsXG4gICAgICAgIGhlaWdodDogbnVtYmVyLFxuICAgICAgICBvcHRpb25zPzogTmd4UGljYVJlc2l6ZU9wdGlvbnNcbiAgICApOiBPYnNlcnZhYmxlPEZpbGU+IHtcbiAgICAgICAgY29uc3QgcmVzaXplZEltYWdlOiBTdWJqZWN0PEZpbGU+ID0gbmV3IFN1YmplY3QoKTtcbiAgICAgICAgY29uc3QgdG90YWxGaWxlczogbnVtYmVyID0gZmlsZXMubGVuZ3RoO1xuXG4gICAgICAgIGlmICh0b3RhbEZpbGVzID4gMCkge1xuICAgICAgICAgICAgY29uc3QgbmV4dEZpbGU6IFN1YmplY3Q8RmlsZT4gPSBuZXcgU3ViamVjdCgpO1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcblxuICAgICAgICAgICAgY29uc3Qgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBuZXh0RmlsZS5zdWJzY3JpYmUoKGZpbGU6IEZpbGUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZUltYWdlKGZpbGUsIHdpZHRoLCBoZWlnaHQsIG9wdGlvbnMpLnN1YnNjcmliZShpbWFnZVJlc2l6ZWQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgICAgICAgICByZXNpemVkSW1hZ2UubmV4dChpbWFnZVJlc2l6ZWQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPCB0b3RhbEZpbGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0RmlsZS5uZXh0KGZpbGVzW2luZGV4XSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNpemVkSW1hZ2UuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgKGVycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZ3hQaWNhRXJyb3I6IE5neFBpY2FFcnJvciA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGU6IGZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnI6IGVyclxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIHJlc2l6ZWRJbWFnZS5lcnJvcihuZ3hQaWNhRXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG5leHRGaWxlLm5leHQoZmlsZXNbaW5kZXhdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IG5neFBpY2FFcnJvcjogTmd4UGljYUVycm9yID0ge1xuICAgICAgICAgICAgICAgIGVycjogTmd4UGljYUVycm9yVHlwZS5OT19GSUxFU19SRUNFSVZFRFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJlc2l6ZWRJbWFnZS5lcnJvcihuZ3hQaWNhRXJyb3IpO1xuICAgICAgICAgICAgcmVzaXplZEltYWdlLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzaXplZEltYWdlLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZXNpemVJbWFnZShcbiAgICAgICAgZmlsZTogRmlsZSxcbiAgICAgICAgd2lkdGg6IG51bWJlcixcbiAgICAgICAgaGVpZ2h0OiBudW1iZXIsXG4gICAgICAgIG9wdGlvbnM/OiBOZ3hQaWNhUmVzaXplT3B0aW9uc1xuICAgICk6IE9ic2VydmFibGU8RmlsZT4ge1xuICAgICAgICBjb25zdCByZXNpemVkSW1hZ2U6IFN1YmplY3Q8RmlsZT4gPSBuZXcgU3ViamVjdCgpO1xuICAgICAgICBjb25zdCBvcmlnaW5DYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgIGNvbnN0IGN0eCA9IG9yaWdpbkNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcblxuICAgICAgICBpZiAoY3R4KSB7XG4gICAgICAgICAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX25neFBpY2FFeGlmU2VydmljZS5nZXRFeGlmT3JpZW50ZWRJbWFnZShpbWcpLnRoZW4ob3JpZW50ZWRJbWFnZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKGltZy5zcmMpO1xuICAgICAgICAgICAgICAgICAgICBvcmlnaW5DYW52YXMud2lkdGggPSBvcmllbnRlZEltYWdlLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICBvcmlnaW5DYW52YXMuaGVpZ2h0ID0gb3JpZW50ZWRJbWFnZS5oZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShvcmllbnRlZEltYWdlLCAwLCAwKTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbWFnZURhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIG9yaWVudGVkSW1hZ2Uud2lkdGgsIG9yaWVudGVkSW1hZ2UuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5hc3BlY3RSYXRpbyAmJiBvcHRpb25zLmFzcGVjdFJhdGlvLmtlZXBBc3BlY3RSYXRpbykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJhdGlvID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmFzcGVjdFJhdGlvLmZvcmNlTWluRGltZW5zaW9ucykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhdGlvID0gTWF0aC5tYXgod2lkdGggLyBpbWFnZURhdGEud2lkdGgsIGhlaWdodCAvIGltYWdlRGF0YS5oZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYXRpbyA9IE1hdGgubWluKHdpZHRoIC8gaW1hZ2VEYXRhLndpZHRoLCBoZWlnaHQgLyBpbWFnZURhdGEuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoID0gTWF0aC5yb3VuZChpbWFnZURhdGEud2lkdGggKiByYXRpbyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQgPSBNYXRoLnJvdW5kKGltYWdlRGF0YS5oZWlnaHQgKiByYXRpbyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZXN0aW5hdGlvbkNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgICAgICAgICAgICAgZGVzdGluYXRpb25DYW52YXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgZGVzdGluYXRpb25DYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGljYVJlc2l6ZShmaWxlLCBvcmlnaW5DYW52YXMsIGRlc3RpbmF0aW9uQ2FudmFzLCBvcHRpb25zKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGltZ1Jlc2l6ZWQ6IEZpbGUpID0+IHJlc2l6ZWRJbWFnZS5uZXh0KGltZ1Jlc2l6ZWQpKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHJlc2l6ZWRJbWFnZS5lcnJvcihlcnIpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpbWcuc3JjID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNpemVkSW1hZ2UuZXJyb3IoTmd4UGljYUVycm9yVHlwZS5DQU5WQVNfQ09OVEVYVF9JREVOVElGSUVSX05PVF9TVVBQT1JURUQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc2l6ZWRJbWFnZS5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY29tcHJlc3NJbWFnZXMoZmlsZXM6IEZpbGVbXSwgc2l6ZUluTUI6IG51bWJlcik6IE9ic2VydmFibGU8RmlsZT4ge1xuICAgICAgICBjb25zdCBjb21wcmVzc2VkSW1hZ2U6IFN1YmplY3Q8RmlsZT4gPSBuZXcgU3ViamVjdCgpO1xuICAgICAgICBjb25zdCB0b3RhbEZpbGVzOiBudW1iZXIgPSBmaWxlcy5sZW5ndGg7XG5cbiAgICAgICAgaWYgKHRvdGFsRmlsZXMgPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBuZXh0RmlsZTogU3ViamVjdDxGaWxlPiA9IG5ldyBTdWJqZWN0KCk7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuXG4gICAgICAgICAgICBjb25zdCBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IG5leHRGaWxlLnN1YnNjcmliZSgoZmlsZTogRmlsZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tcHJlc3NJbWFnZShmaWxlLCBzaXplSW5NQikuc3Vic2NyaWJlKGltYWdlQ29tcHJlc3NlZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICAgICAgICAgIGNvbXByZXNzZWRJbWFnZS5uZXh0KGltYWdlQ29tcHJlc3NlZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA8IHRvdGFsRmlsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRGaWxlLm5leHQoZmlsZXNbaW5kZXhdKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXByZXNzZWRJbWFnZS5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5neFBpY2FFcnJvcjogTmd4UGljYUVycm9yID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZTogZmlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycjogZXJyXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGNvbXByZXNzZWRJbWFnZS5lcnJvcihuZ3hQaWNhRXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG5leHRGaWxlLm5leHQoZmlsZXNbaW5kZXhdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IG5neFBpY2FFcnJvcjogTmd4UGljYUVycm9yID0ge1xuICAgICAgICAgICAgICAgIGVycjogTmd4UGljYUVycm9yVHlwZS5OT19GSUxFU19SRUNFSVZFRFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbXByZXNzZWRJbWFnZS5lcnJvcihuZ3hQaWNhRXJyb3IpO1xuICAgICAgICAgICAgY29tcHJlc3NlZEltYWdlLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29tcHJlc3NlZEltYWdlLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb21wcmVzc0ltYWdlKGZpbGU6IEZpbGUsIHNpemVJbk1COiBudW1iZXIpOiBPYnNlcnZhYmxlPEZpbGU+IHtcbiAgICAgICAgY29uc3QgY29tcHJlc3NlZEltYWdlOiBTdWJqZWN0PEZpbGU+ID0gbmV3IFN1YmplY3QoKTtcblxuICAgICAgICBpZiAodGhpcy5ieXRlc1RvTUIoZmlsZS5zaXplKSA8PSBzaXplSW5NQikge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBjb21wcmVzc2VkSW1hZ2UubmV4dChmaWxlKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBvcmlnaW5DYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgICAgICBjb25zdCBjdHggPSBvcmlnaW5DYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuXG4gICAgICAgICAgICBpZiAoY3R4KSB7XG4gICAgICAgICAgICAgICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmd4UGljYUV4aWZTZXJ2aWNlLmdldEV4aWZPcmllbnRlZEltYWdlKGltZykudGhlbihvcmllbnRlZEltYWdlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKGltZy5zcmMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luQ2FudmFzLndpZHRoID0gb3JpZW50ZWRJbWFnZS53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbkNhbnZhcy5oZWlnaHQgPSBvcmllbnRlZEltYWdlLmhlaWdodDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShvcmllbnRlZEltYWdlLCAwLCAwKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRDb21wcmVzc2VkSW1hZ2Uob3JpZ2luQ2FudmFzLCBmaWxlLnR5cGUsIDEsIHNpemVJbk1CLCAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiBjb21wcmVzc2VkSW1hZ2UuZXJyb3IoZXJyKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoYmxvYjogQmxvYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbWdDb21wcmVzc2VkOiBGaWxlID0gdGhpcy5ibG9iVG9GaWxlKGJsb2IsIGZpbGUubmFtZSwgZmlsZS50eXBlLCBuZXcgRGF0ZSgpLmdldFRpbWUoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXByZXNzZWRJbWFnZS5uZXh0KGltZ0NvbXByZXNzZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaW1nLnNyYyA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb21wcmVzc2VkSW1hZ2UuZXJyb3IoTmd4UGljYUVycm9yVHlwZS5DQU5WQVNfQ09OVEVYVF9JREVOVElGSUVSX05PVF9TVVBQT1JURUQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbXByZXNzZWRJbWFnZS5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldENvbXByZXNzZWRJbWFnZShcbiAgICAgICAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCxcbiAgICAgICAgdHlwZTogc3RyaW5nLFxuICAgICAgICBxdWFsaXR5OiBudW1iZXIsXG4gICAgICAgIHNpemVJbk1COiBudW1iZXIsXG4gICAgICAgIHN0ZXA6IG51bWJlclxuICAgICk6IFByb21pc2U8QmxvYj4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8QmxvYj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5waWNhUmVzaXplci50b0Jsb2IoY2FudmFzLCB0eXBlLCBxdWFsaXR5KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiByZWplY3QoZXJyKSlcbiAgICAgICAgICAgICAgICAudGhlbigoYmxvYjogQmxvYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQ29tcHJlc3NlZEltYWdlU2l6ZShjYW52YXMsIGJsb2IsIHF1YWxpdHksIHNpemVJbk1CLCBzdGVwKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGNvbXByZXNzZWRCbG9iOiBCbG9iKSA9PiByZXNvbHZlKGNvbXByZXNzZWRCbG9iKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiByZWplY3QoZXJyKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hlY2tDb21wcmVzc2VkSW1hZ2VTaXplKFxuICAgICAgICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LFxuICAgICAgICBibG9iOiBCbG9iLFxuICAgICAgICBxdWFsaXR5OiBudW1iZXIsXG4gICAgICAgIHNpemVJbk1COiBudW1iZXIsXG4gICAgICAgIHN0ZXA6IG51bWJlclxuICAgICk6IFByb21pc2U8QmxvYj4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8QmxvYj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKHN0ZXAgPiB0aGlzLk1BWF9TVEVQUykge1xuICAgICAgICAgICAgICAgIHJlamVjdChOZ3hQaWNhRXJyb3JUeXBlLk5PVF9CRV9BQkxFX1RPX0NPTVBSRVNTX0VOT1VHSCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYnl0ZXNUb01CKGJsb2Iuc2l6ZSkgPCBzaXplSW5NQikge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoYmxvYik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1F1YWxpdHk6IG51bWJlciA9IHF1YWxpdHkgLSAocXVhbGl0eSAqIDAuMSk7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3U3RlcDogbnVtYmVyID0gc3RlcCArIDE7XG4gICAgICAgICAgICAgICAgLy8gcmVjdXJzaXZlbHkgY29tcHJlc3Npb25cbiAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMuZ2V0Q29tcHJlc3NlZEltYWdlKGNhbnZhcywgYmxvYi50eXBlLCBuZXdRdWFsaXR5LCBzaXplSW5NQiwgbmV3U3RlcCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHBpY2FSZXNpemUoXG4gICAgICAgIGZpbGU6IEZpbGUsXG4gICAgICAgIGZyb206IEhUTUxDYW52YXNFbGVtZW50LFxuICAgICAgICB0bzogSFRNTENhbnZhc0VsZW1lbnQsXG4gICAgICAgIG9wdGlvbnM6IGFueVxuICAgICk6IFByb21pc2U8RmlsZT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8RmlsZT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5waWNhUmVzaXplci5yZXNpemUoZnJvbSwgdG8sIG9wdGlvbnMpXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHJlamVjdChlcnIpKVxuICAgICAgICAgICAgICAgIC50aGVuKChyZXNpemVkQ2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkgPT4gdGhpcy5waWNhUmVzaXplci50b0Jsb2IocmVzaXplZENhbnZhcywgZmlsZS50eXBlKSlcbiAgICAgICAgICAgICAgICAudGhlbigoYmxvYjogQmxvYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWxlUmVzaXplZDogRmlsZSA9IHRoaXMuYmxvYlRvRmlsZShibG9iLCBmaWxlLm5hbWUsIGZpbGUudHlwZSwgbmV3IERhdGUoKS5nZXRUaW1lKCkpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZpbGVSZXNpemVkKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBibG9iVG9GaWxlKGJsb2I6IEJsb2IsIG5hbWU6IHN0cmluZywgdHlwZTogc3RyaW5nLCBsYXN0TW9kaWZpZWQ6IG51bWJlcik6IEZpbGUge1xuICAgICAgICByZXR1cm4gbmV3IEZpbGUoW2Jsb2JdLCBuYW1lLCB7IHR5cGU6IHR5cGUsIGxhc3RNb2RpZmllZDogbGFzdE1vZGlmaWVkIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgYnl0ZXNUb01CKGJ5dGVzOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIGJ5dGVzIC8gMTA0ODU3NjtcbiAgICB9XG59XG4iXX0=