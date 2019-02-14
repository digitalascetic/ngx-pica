/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as EXIF from 'exif-js';
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
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            EXIF.getData(((/** @type {?} */ (image))), (/**
             * @return {?}
             */
            function () {
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
                    img_1.onload = (/**
                     * @return {?}
                     */
                    function () {
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
        { type: Injectable }
    ];
    return NgxPicaExifService;
}());
export { NgxPicaExifService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXBpY2EtZXhpZi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRpZ2l0YWxhc2NldGljL25neC1waWNhLyIsInNvdXJjZXMiOlsibGliL25neC1waWNhLWV4aWYuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEtBQUssSUFBSSxNQUFNLFNBQVMsQ0FBQztBQUVoQztJQUFBO0lBOEVBLENBQUM7Ozs7O0lBM0VVLGlEQUFvQjs7OztJQUEzQixVQUE0QixLQUF1QjtRQUMvQyxPQUFPLElBQUksT0FBTzs7Ozs7UUFBbUIsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNqRCxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsbUJBQUEsS0FBSyxFQUFPLENBQUM7OztZQUFFOztvQkFDbkIsZUFBZSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDOztvQkFDMUMsZUFBZSxHQUFHLGVBQWUsQ0FBQyxXQUFXO2dCQUVqRCxJQUFJLGVBQWUsRUFBRTtvQkFFakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUU7d0JBQ2xDLE1BQU0sSUFBSSxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQztxQkFDbEQ7O3dCQUVLLE1BQU0sR0FBc0IsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7O3dCQUM5RCxHQUFHLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7O3dCQUU3QixHQUFHLEdBQUcsQ0FBQzs7d0JBQ1AsRUFBRSxHQUFHLENBQUM7O3dCQUNOLEVBQUUsR0FBRyxDQUFDOzt3QkFDTixLQUFLLEdBQVcsS0FBSyxDQUFDLEtBQUs7O3dCQUMzQixNQUFNLEdBQVcsS0FBSyxDQUFDLE1BQU07b0JBRWpDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7d0JBQzVDLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO3dCQUNyQixNQUFNLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztxQkFDeEI7b0JBRUQsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7b0JBQ3JCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO29CQUV2QixRQUFRLGVBQWUsRUFBRTt3QkFDckIsS0FBSyxDQUFDLENBQUM7d0JBQ1AsS0FBSyxDQUFDOzRCQUNGLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7NEJBQ2xCLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7NEJBQ25CLEdBQUcsR0FBRyxHQUFHLENBQUM7NEJBQ1YsTUFBTTt3QkFDVixLQUFLLENBQUMsQ0FBQzt3QkFDUCxLQUFLLENBQUM7NEJBQ0YsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQzs0QkFDbkIsR0FBRyxHQUFHLEVBQUUsQ0FBQzs0QkFDVCxNQUFNO3dCQUNWLEtBQUssQ0FBQyxDQUFDO3dCQUNQLEtBQUssQ0FBQzs0QkFDRixFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDOzRCQUNsQixHQUFHLEdBQUcsR0FBRyxDQUFDOzRCQUNWLE1BQU07d0JBQ1Y7NEJBQ0ksTUFBTTtxQkFDYjtvQkFFRCxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO3dCQUM1QyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDeEIsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztxQkFDcEI7b0JBRUQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDaEMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDOzt3QkFFdkIsS0FBRyxHQUFHLElBQUksS0FBSyxFQUFFO29CQUV2QixLQUFHLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztvQkFDbEIsS0FBRyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7b0JBRXBCLEtBQUcsQ0FBQyxNQUFNOzs7b0JBQUc7d0JBQ1QsT0FBTyxDQUFDLEtBQUcsQ0FBQyxDQUFDO29CQUNqQixDQUFDLENBQUEsQ0FBQztvQkFFRixLQUFHLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztpQkFDaEM7cUJBQU07b0JBQ0gsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNsQjtZQUNMLENBQUMsRUFBQyxDQUFDO1FBQ1AsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOztnQkE1RUosVUFBVTs7SUE4RVgseUJBQUM7Q0FBQSxBQTlFRCxJQThFQztTQTdFWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBFWElGIGZyb20gJ2V4aWYtanMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmd4UGljYUV4aWZTZXJ2aWNlIHtcblxuICAgIHB1YmxpYyBnZXRFeGlmT3JpZW50ZWRJbWFnZShpbWFnZTogSFRNTEltYWdlRWxlbWVudCk6IFByb21pc2U8SFRNTEltYWdlRWxlbWVudD4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8SFRNTEltYWdlRWxlbWVudD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgRVhJRi5nZXREYXRhKChpbWFnZSBhcyBhbnkpLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYWxsRXhpZk1ldGFEYXRhID0gRVhJRi5nZXRBbGxUYWdzKGltYWdlKSxcbiAgICAgICAgICAgICAgICAgICAgZXhpZk9yaWVudGF0aW9uID0gYWxsRXhpZk1ldGFEYXRhLk9yaWVudGF0aW9uO1xuXG4gICAgICAgICAgICAgICAgaWYgKGV4aWZPcmllbnRhdGlvbikge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghL15bMS04XSQvLnRlc3QoZXhpZk9yaWVudGF0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdvcmllbnRhdGlvbiBzaG91bGQgYmUgWzEtOF0nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBkZWcgPSAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3ggPSAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3kgPSAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IG51bWJlciA9IGltYWdlLndpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBudW1iZXIgPSBpbWFnZS5oZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKFs1LCA2LCA3LCA4XS5pbmRleE9mKGV4aWZPcmllbnRhdGlvbikgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGggPSBpbWFnZS5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQgPSBpbWFnZS53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICAgICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZXhpZk9yaWVudGF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3ggPSAtaW1hZ2Uud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3kgPSAtaW1hZ2UuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZyA9IDE4MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjeSA9IC1pbWFnZS5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVnID0gOTA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3ggPSAtaW1hZ2Uud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVnID0gMjcwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChbMiwgNCwgNSwgN10uaW5kZXhPZihleGlmT3JpZW50YXRpb24pID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC50cmFuc2xhdGUod2lkdGgsIDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnNjYWxlKC0xLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGN0eC5yb3RhdGUoZGVnIC8gMTgwICogTWF0aC5QSSk7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1hZ2UsIGN4LCBjeSk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaW1nLndpZHRoID0gd2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIGltZy5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoaW1nKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICBpbWcuc3JjID0gY2FudmFzLnRvRGF0YVVSTCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoaW1hZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cbiJdfQ==