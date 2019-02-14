(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs'), require('exif-js'), require('pica/dist/pica.js'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('@digitalascetic/ngx-pica', ['exports', 'rxjs', 'exif-js', 'pica/dist/pica.js', '@angular/core'], factory) :
    (factory((global.digitalascetic = global.digitalascetic || {}, global.digitalascetic['ngx-pica'] = {}),global.rxjs,global.EXIF,global.Pica,global.ng.core));
}(this, (function (exports,rxjs,EXIF,Pica,core) { 'use strict';

    Pica = Pica && Pica.hasOwnProperty('default') ? Pica['default'] : Pica;

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {string} */
    var NgxPicaErrorType = {
        NO_FILES_RECEIVED: 'NO_FILES_RECEIVED',
        CANVAS_CONTEXT_IDENTIFIER_NOT_SUPPORTED: 'CANVAS_CONTEXT_IDENTIFIER_NOT_SUPPORTED',
        NOT_BE_ABLE_TO_COMPRESS_ENOUGH: 'NOT_BE_ABLE_TO_COMPRESS_ENOUGH',
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgxPicaExifService = /** @class */ (function () {
        function NgxPicaExifService() {
        }
        /**
         * @param {?} image
         * @return {?}
         */
        NgxPicaExifService.prototype.getExifOrientedImage = /**
         * @param {?} image
         * @return {?}
         */
            function (image) {
                return new Promise(( /**
                 * @param {?} resolve
                 * @param {?} reject
                 * @return {?}
                 */function (resolve, reject) {
                    EXIF.getData((( /** @type {?} */(image))), ( /**
                     * @return {?}
                     */function () {
                        /** @type {?} */
                        var allExifMetaData = EXIF.getAllTags(image);
                        /** @type {?} */
                        var exifOrientation = allExifMetaData.Orientation;
                        if (exifOrientation) {
                            if (!/^[1-8]$/.test(exifOrientation)) {
                                throw new Error('orientation should be [1-8]');
                            }
                            /** @type {?} */
                            var canvas = document.createElement('canvas');
                            /** @type {?} */
                            var ctx = canvas.getContext('2d');
                            /** @type {?} */
                            var deg = 0;
                            /** @type {?} */
                            var cx = 0;
                            /** @type {?} */
                            var cy = 0;
                            /** @type {?} */
                            var width = image.width;
                            /** @type {?} */
                            var height = image.height;
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
                            var img_1 = new Image();
                            img_1.width = width;
                            img_1.height = height;
                            img_1.onload = ( /**
                             * @return {?}
                             */function () {
                                resolve(img_1);
                            });
                            img_1.src = canvas.toDataURL();
                        }
                        else {
                            resolve(image);
                        }
                    }));
                }));
            };
        NgxPicaExifService.decorators = [
            { type: core.Injectable }
        ];
        return NgxPicaExifService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
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
                var resizedImage = new rxjs.Subject();
                /** @type {?} */
                var totalFiles = files.length;
                if (totalFiles > 0) {
                    /** @type {?} */
                    var nextFile_1 = new rxjs.Subject();
                    /** @type {?} */
                    var index_1 = 0;
                    /** @type {?} */
                    var subscription_1 = nextFile_1.subscribe(( /**
                     * @param {?} file
                     * @return {?}
                     */function (file) {
                        _this.resizeImage(file, width, height, options).subscribe(( /**
                         * @param {?} imageResized
                         * @return {?}
                         */function (imageResized) {
                            index_1++;
                            resizedImage.next(imageResized);
                            if (index_1 < totalFiles) {
                                nextFile_1.next(files[index_1]);
                            }
                            else {
                                resizedImage.complete();
                                subscription_1.unsubscribe();
                            }
                        }), ( /**
                         * @param {?} err
                         * @return {?}
                         */function (err) {
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
                var resizedImage = new rxjs.Subject();
                /** @type {?} */
                var originCanvas = document.createElement('canvas');
                /** @type {?} */
                var ctx = originCanvas.getContext('2d');
                /** @type {?} */
                var img = new Image();
                if (ctx) {
                    img.onload = ( /**
                     * @return {?}
                     */function () {
                        _this._ngxPicaExifService.getExifOrientedImage(img).then(( /**
                         * @param {?} orientedImage
                         * @return {?}
                         */function (orientedImage) {
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
                                .then(( /**
                         * @param {?} imgResized
                         * @return {?}
                         */function (imgResized) { return resizedImage.next(imgResized); }))
                                .catch(( /**
                         * @param {?} err
                         * @return {?}
                         */function (err) { return resizedImage.error(err); }));
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
                var compressedImage = new rxjs.Subject();
                /** @type {?} */
                var totalFiles = files.length;
                if (totalFiles > 0) {
                    /** @type {?} */
                    var nextFile_2 = new rxjs.Subject();
                    /** @type {?} */
                    var index_2 = 0;
                    /** @type {?} */
                    var subscription_2 = nextFile_2.subscribe(( /**
                     * @param {?} file
                     * @return {?}
                     */function (file) {
                        _this.compressImage(file, sizeInMB).subscribe(( /**
                         * @param {?} imageCompressed
                         * @return {?}
                         */function (imageCompressed) {
                            index_2++;
                            compressedImage.next(imageCompressed);
                            if (index_2 < totalFiles) {
                                nextFile_2.next(files[index_2]);
                            }
                            else {
                                compressedImage.complete();
                                subscription_2.unsubscribe();
                            }
                        }), ( /**
                         * @param {?} err
                         * @return {?}
                         */function (err) {
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
                var compressedImage = new rxjs.Subject();
                if (this.bytesToMB(file.size) <= sizeInMB) {
                    setTimeout(( /**
                     * @return {?}
                     */function () { return compressedImage.next(file); }));
                }
                else {
                    /** @type {?} */
                    var originCanvas_1 = document.createElement('canvas');
                    /** @type {?} */
                    var ctx_1 = originCanvas_1.getContext('2d');
                    /** @type {?} */
                    var img_1 = new Image();
                    if (ctx_1) {
                        img_1.onload = ( /**
                         * @return {?}
                         */function () {
                            _this._ngxPicaExifService.getExifOrientedImage(img_1).then(( /**
                             * @param {?} orientedImage
                             * @return {?}
                             */function (orientedImage) {
                                window.URL.revokeObjectURL(img_1.src);
                                originCanvas_1.width = orientedImage.width;
                                originCanvas_1.height = orientedImage.height;
                                ctx_1.drawImage(orientedImage, 0, 0);
                                _this.getCompressedImage(originCanvas_1, file.type, 1, sizeInMB, 0)
                                    .catch(( /**
                             * @param {?} err
                             * @return {?}
                             */function (err) { return compressedImage.error(err); }))
                                    .then(( /**
                             * @param {?} blob
                             * @return {?}
                             */function (blob) {
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
                return new Promise(( /**
                 * @param {?} resolve
                 * @param {?} reject
                 * @return {?}
                 */function (resolve, reject) {
                    _this.picaResizer.toBlob(canvas, type, quality)
                        .catch(( /**
                 * @param {?} err
                 * @return {?}
                 */function (err) { return reject(err); }))
                        .then(( /**
                 * @param {?} blob
                 * @return {?}
                 */function (blob) {
                        _this.checkCompressedImageSize(canvas, blob, quality, sizeInMB, step)
                            .then(( /**
                     * @param {?} compressedBlob
                     * @return {?}
                     */function (compressedBlob) { return resolve(compressedBlob); }))
                            .catch(( /**
                     * @param {?} err
                     * @return {?}
                     */function (err) { return reject(err); }));
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
                return new Promise(( /**
                 * @param {?} resolve
                 * @param {?} reject
                 * @return {?}
                 */function (resolve, reject) {
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
                return new Promise(( /**
                 * @param {?} resolve
                 * @param {?} reject
                 * @return {?}
                 */function (resolve, reject) {
                    _this.picaResizer.resize(from, to, options)
                        .catch(( /**
                 * @param {?} err
                 * @return {?}
                 */function (err) { return reject(err); }))
                        .then(( /**
                 * @param {?} resizedCanvas
                 * @return {?}
                 */function (resizedCanvas) { return _this.picaResizer.toBlob(resizedCanvas, file.type); }))
                        .then(( /**
                 * @param {?} blob
                 * @return {?}
                 */function (blob) {
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
            { type: core.Injectable }
        ];
        /** @nocollapse */
        NgxPicaService.ctorParameters = function () {
            return [
                { type: NgxPicaExifService }
            ];
        };
        return NgxPicaService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgxPicaImageService = /** @class */ (function () {
        function NgxPicaImageService() {
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
        NgxPicaImageService.prototype.isImage = /**
         * @param {?} file
         * @return {?}
         */
            function (file) {
                /** @type {?} */
                var fileExtension = file.name.toLowerCase().substr(file.name.lastIndexOf('.') + 1);
                return (this.imageExtensions.indexOf(fileExtension) !== -1);
            };
        NgxPicaImageService.decorators = [
            { type: core.Injectable }
        ];
        return NgxPicaImageService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgxPicaModule = /** @class */ (function () {
        function NgxPicaModule() {
        }
        NgxPicaModule.decorators = [
            { type: core.NgModule, args: [{
                        providers: [
                            { provide: NgxPicaService, useClass: NgxPicaService },
                            { provide: NgxPicaExifService, useClass: NgxPicaExifService },
                            { provide: NgxPicaImageService, useClass: NgxPicaImageService },
                        ]
                    },] }
        ];
        return NgxPicaModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.NgxPicaModule = NgxPicaModule;
    exports.NgxPicaService = NgxPicaService;
    exports.NgxPicaImageService = NgxPicaImageService;
    exports.ɵa = NgxPicaExifService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=digitalascetic-ngx-pica.umd.js.map