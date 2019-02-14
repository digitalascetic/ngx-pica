/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
export class NgxPicaImageService {
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
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgxPicaImageService.prototype.imageExtensions;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXBpY2EtaW1hZ2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkaWdpdGFsYXNjZXRpYy9uZ3gtcGljYS8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtcGljYS1pbWFnZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE1BQU0sT0FBTyxtQkFBbUI7SUFEaEM7UUFHWSxvQkFBZSxHQUFhO1lBQ2hDLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsTUFBTTtZQUNOLEtBQUs7WUFDTCxNQUFNO1lBQ04sS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsTUFBTTtZQUNOLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLE1BQU07WUFDTixLQUFLO1lBQ0wsTUFBTTtZQUNOLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxNQUFNO1lBQ04sS0FBSztZQUNMLEtBQUs7WUFDTCxNQUFNO1lBQ04sS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsTUFBTTtZQUNOLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsSUFBSTtZQUNKLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLElBQUk7WUFDSixLQUFLO1lBQ0wsTUFBTTtZQUNOLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxJQUFJO1lBQ0osS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxJQUFJO1lBQ0osS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLE1BQU07WUFDTixLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxNQUFNO1lBQ04sS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLE1BQU07WUFDTixNQUFNO1lBQ04sS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxNQUFNO1lBQ04sSUFBSTtZQUNKLEtBQUs7WUFDTCxNQUFNO1lBQ04sS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztTQUNSLENBQUM7SUFNTixDQUFDOzs7OztJQUpVLE9BQU8sQ0FBQyxJQUFVOztjQUNmLGFBQWEsR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUYsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEUsQ0FBQzs7O1lBaklKLFVBQVU7Ozs7Ozs7SUFHUCw4Q0F5SEUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ3hQaWNhSW1hZ2VTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgaW1hZ2VFeHRlbnNpb25zOiBzdHJpbmdbXSA9IFtcbiAgICAgICAgJ2FzZScsXG4gICAgICAgICdhcnQnLFxuICAgICAgICAnYm1wJyxcbiAgICAgICAgJ2JscCcsXG4gICAgICAgICdjZDUnLFxuICAgICAgICAnY2l0JyxcbiAgICAgICAgJ2NwdCcsXG4gICAgICAgICdjcjInLFxuICAgICAgICAnY3V0JyxcbiAgICAgICAgJ2RkcycsXG4gICAgICAgICdkaWInLFxuICAgICAgICAnZGp2dScsXG4gICAgICAgICdlZ3QnLFxuICAgICAgICAnZXhpZicsXG4gICAgICAgICdnaWYnLFxuICAgICAgICAnZ3BsJyxcbiAgICAgICAgJ2dyZicsXG4gICAgICAgICdpY25zJyxcbiAgICAgICAgJ2ljbycsXG4gICAgICAgICdpZmYnLFxuICAgICAgICAnam5nJyxcbiAgICAgICAgJ2pwZWcnLFxuICAgICAgICAnanBnJyxcbiAgICAgICAgJ2pmaWYnLFxuICAgICAgICAnanAyJyxcbiAgICAgICAgJ2pwcycsXG4gICAgICAgICdsYm0nLFxuICAgICAgICAnbWF4JyxcbiAgICAgICAgJ21pZmYnLFxuICAgICAgICAnbW5nJyxcbiAgICAgICAgJ21zcCcsXG4gICAgICAgICduaXRmJyxcbiAgICAgICAgJ290YScsXG4gICAgICAgICdwYm0nLFxuICAgICAgICAncGMxJyxcbiAgICAgICAgJ3BjMicsXG4gICAgICAgICdwYzMnLFxuICAgICAgICAncGNmJyxcbiAgICAgICAgJ3BjeCcsXG4gICAgICAgICdwZG4nLFxuICAgICAgICAncGdtJyxcbiAgICAgICAgJ1BJMScsXG4gICAgICAgICdQSTInLFxuICAgICAgICAnUEkzJyxcbiAgICAgICAgJ3BpY3QnLFxuICAgICAgICAncGN0JyxcbiAgICAgICAgJ3BubScsXG4gICAgICAgICdwbnMnLFxuICAgICAgICAncHBtJyxcbiAgICAgICAgJ3BzYicsXG4gICAgICAgICdwc2QnLFxuICAgICAgICAncGRkJyxcbiAgICAgICAgJ3BzcCcsXG4gICAgICAgICdweCcsXG4gICAgICAgICdweG0nLFxuICAgICAgICAncHhyJyxcbiAgICAgICAgJ3FmeCcsXG4gICAgICAgICdyYXcnLFxuICAgICAgICAncmxlJyxcbiAgICAgICAgJ3NjdCcsXG4gICAgICAgICdzZ2knLFxuICAgICAgICAncmdiJyxcbiAgICAgICAgJ2ludCcsXG4gICAgICAgICdidycsXG4gICAgICAgICd0Z2EnLFxuICAgICAgICAndGlmZicsXG4gICAgICAgICd0aWYnLFxuICAgICAgICAndnRmJyxcbiAgICAgICAgJ3hibScsXG4gICAgICAgICd4Y2YnLFxuICAgICAgICAneHBtJyxcbiAgICAgICAgJzNkdicsXG4gICAgICAgICdhbWYnLFxuICAgICAgICAnYWknLFxuICAgICAgICAnYXdnJyxcbiAgICAgICAgJ2NnbScsXG4gICAgICAgICdjZHInLFxuICAgICAgICAnY214JyxcbiAgICAgICAgJ2R4ZicsXG4gICAgICAgICdlMmQnLFxuICAgICAgICAnZWd0JyxcbiAgICAgICAgJ2VwcycsXG4gICAgICAgICdmcycsXG4gICAgICAgICdnYnInLFxuICAgICAgICAnb2RnJyxcbiAgICAgICAgJ3N2ZycsXG4gICAgICAgICdzdGwnLFxuICAgICAgICAndnJtbCcsXG4gICAgICAgICd4M2QnLFxuICAgICAgICAnc3hkJyxcbiAgICAgICAgJ3YyZCcsXG4gICAgICAgICd2bmQnLFxuICAgICAgICAnd21mJyxcbiAgICAgICAgJ2VtZicsXG4gICAgICAgICdhcnQnLFxuICAgICAgICAneGFyJyxcbiAgICAgICAgJ3BuZycsXG4gICAgICAgICd3ZWJwJyxcbiAgICAgICAgJ2p4cicsXG4gICAgICAgICdoZHAnLFxuICAgICAgICAnd2RwJyxcbiAgICAgICAgJ2N1cicsXG4gICAgICAgICdlY3cnLFxuICAgICAgICAnaWZmJyxcbiAgICAgICAgJ2xibScsXG4gICAgICAgICdsaWZmJyxcbiAgICAgICAgJ25ycmQnLFxuICAgICAgICAncGFtJyxcbiAgICAgICAgJ3BjeCcsXG4gICAgICAgICdwZ2YnLFxuICAgICAgICAnc2dpJyxcbiAgICAgICAgJ3JnYicsXG4gICAgICAgICdyZ2JhJyxcbiAgICAgICAgJ2J3JyxcbiAgICAgICAgJ2ludCcsXG4gICAgICAgICdpbnRhJyxcbiAgICAgICAgJ3NpZCcsXG4gICAgICAgICdyYXMnLFxuICAgICAgICAnc3VuJyxcbiAgICAgICAgJ3RnYSdcbiAgICBdO1xuXG4gICAgcHVibGljIGlzSW1hZ2UoZmlsZTogRmlsZSk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBmaWxlRXh0ZW5zaW9uOiBzdHJpbmcgPSBmaWxlLm5hbWUudG9Mb3dlckNhc2UoKS5zdWJzdHIoZmlsZS5uYW1lLmxhc3RJbmRleE9mKCcuJykgKyAxKTtcbiAgICAgICAgcmV0dXJuICh0aGlzLmltYWdlRXh0ZW5zaW9ucy5pbmRleE9mKGZpbGVFeHRlbnNpb24pICE9PSAtMSk7XG4gICAgfVxufVxuIl19