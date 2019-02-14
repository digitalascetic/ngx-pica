/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as EXIF from 'exif-js';
export class NgxPicaExifService {
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
            EXIF.getData(((/** @type {?} */ (image))), (/**
             * @return {?}
             */
            () => {
                /** @type {?} */
                const allExifMetaData = EXIF.getAllTags(image);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXBpY2EtZXhpZi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRpZ2l0YWxhc2NldGljL25neC1waWNhLyIsInNvdXJjZXMiOlsibGliL25neC1waWNhLWV4aWYuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEtBQUssSUFBSSxNQUFNLFNBQVMsQ0FBQztBQUdoQyxNQUFNLE9BQU8sa0JBQWtCOzs7OztJQUVwQixvQkFBb0IsQ0FBQyxLQUF1QjtRQUMvQyxPQUFPLElBQUksT0FBTzs7Ozs7UUFBbUIsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLG1CQUFBLEtBQUssRUFBTyxDQUFDOzs7WUFBRSxHQUFHLEVBQUU7O3NCQUN4QixlQUFlLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7O3NCQUMxQyxlQUFlLEdBQUcsZUFBZSxDQUFDLFdBQVc7Z0JBRWpELElBQUksZUFBZSxFQUFFO29CQUVqQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRTt3QkFDbEMsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO3FCQUNsRDs7MEJBRUssTUFBTSxHQUFzQixRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQzs7MEJBQzlELEdBQUcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQzs7d0JBRTdCLEdBQUcsR0FBRyxDQUFDOzt3QkFDUCxFQUFFLEdBQUcsQ0FBQzs7d0JBQ04sRUFBRSxHQUFHLENBQUM7O3dCQUNOLEtBQUssR0FBVyxLQUFLLENBQUMsS0FBSzs7d0JBQzNCLE1BQU0sR0FBVyxLQUFLLENBQUMsTUFBTTtvQkFFakMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTt3QkFDNUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7d0JBQ3JCLE1BQU0sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO3FCQUN4QjtvQkFFRCxNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztvQkFDckIsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7b0JBRXZCLFFBQVEsZUFBZSxFQUFFO3dCQUNyQixLQUFLLENBQUMsQ0FBQzt3QkFDUCxLQUFLLENBQUM7NEJBQ0YsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQzs0QkFDbEIsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQzs0QkFDbkIsR0FBRyxHQUFHLEdBQUcsQ0FBQzs0QkFDVixNQUFNO3dCQUNWLEtBQUssQ0FBQyxDQUFDO3dCQUNQLEtBQUssQ0FBQzs0QkFDRixFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDOzRCQUNuQixHQUFHLEdBQUcsRUFBRSxDQUFDOzRCQUNULE1BQU07d0JBQ1YsS0FBSyxDQUFDLENBQUM7d0JBQ1AsS0FBSyxDQUFDOzRCQUNGLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7NEJBQ2xCLEdBQUcsR0FBRyxHQUFHLENBQUM7NEJBQ1YsTUFBTTt3QkFDVjs0QkFDSSxNQUFNO3FCQUNiO29CQUVELElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7d0JBQzVDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUN4QixHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO3FCQUNwQjtvQkFFRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUNoQyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7OzBCQUV2QixHQUFHLEdBQUcsSUFBSSxLQUFLLEVBQUU7b0JBRXZCLEdBQUcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO29CQUNsQixHQUFHLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztvQkFFcEIsR0FBRyxDQUFDLE1BQU07OztvQkFBRyxHQUFHLEVBQUU7d0JBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNqQixDQUFDLENBQUEsQ0FBQztvQkFFRixHQUFHLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztpQkFDaEM7cUJBQU07b0JBQ0gsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNsQjtZQUNMLENBQUMsRUFBQyxDQUFDO1FBQ1AsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7WUE1RUosVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIEVYSUYgZnJvbSAnZXhpZi1qcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ3hQaWNhRXhpZlNlcnZpY2Uge1xuXG4gICAgcHVibGljIGdldEV4aWZPcmllbnRlZEltYWdlKGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50KTogUHJvbWlzZTxIVE1MSW1hZ2VFbGVtZW50PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxIVE1MSW1hZ2VFbGVtZW50PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBFWElGLmdldERhdGEoKGltYWdlIGFzIGFueSksICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBhbGxFeGlmTWV0YURhdGEgPSBFWElGLmdldEFsbFRhZ3MoaW1hZ2UpLFxuICAgICAgICAgICAgICAgICAgICBleGlmT3JpZW50YXRpb24gPSBhbGxFeGlmTWV0YURhdGEuT3JpZW50YXRpb247XG5cbiAgICAgICAgICAgICAgICBpZiAoZXhpZk9yaWVudGF0aW9uKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCEvXlsxLThdJC8udGVzdChleGlmT3JpZW50YXRpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ29yaWVudGF0aW9uIHNob3VsZCBiZSBbMS04XScpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGRlZyA9IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBjeCA9IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBjeSA9IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogbnVtYmVyID0gaW1hZ2Uud2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IG51bWJlciA9IGltYWdlLmhlaWdodDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoWzUsIDYsIDcsIDhdLmluZGV4T2YoZXhpZk9yaWVudGF0aW9uKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aCA9IGltYWdlLmhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodCA9IGltYWdlLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChleGlmT3JpZW50YXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjeCA9IC1pbWFnZS53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjeSA9IC1pbWFnZS5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVnID0gMTgwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN5ID0gLWltYWdlLmhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWcgPSA5MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjeCA9IC1pbWFnZS53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWcgPSAyNzA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKFsyLCA0LCA1LCA3XS5pbmRleE9mKGV4aWZPcmllbnRhdGlvbikgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZSh3aWR0aCwgMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguc2NhbGUoLTEsIDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY3R4LnJvdGF0ZShkZWcgLyAxODAgKiBNYXRoLlBJKTtcbiAgICAgICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWFnZSwgY3gsIGN5KTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcblxuICAgICAgICAgICAgICAgICAgICBpbWcud2lkdGggPSB3aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgaW1nLmhlaWdodCA9IGhlaWdodDtcblxuICAgICAgICAgICAgICAgICAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShpbWcpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIGltZy5zcmMgPSBjYW52YXMudG9EYXRhVVJMKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShpbWFnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuIl19