/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
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
        { type: Injectable }
    ];
    return NgxPicaImageService;
}());
export { NgxPicaImageService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgxPicaImageService.prototype.imageExtensions;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXBpY2EtaW1hZ2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkaWdpdGFsYXNjZXRpYy9uZ3gtcGljYS8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtcGljYS1pbWFnZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDO0lBQUE7UUFHWSxvQkFBZSxHQUFhO1lBQ2hDLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsTUFBTTtZQUNOLEtBQUs7WUFDTCxNQUFNO1lBQ04sS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsTUFBTTtZQUNOLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLE1BQU07WUFDTixLQUFLO1lBQ0wsTUFBTTtZQUNOLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxNQUFNO1lBQ04sS0FBSztZQUNMLEtBQUs7WUFDTCxNQUFNO1lBQ04sS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsTUFBTTtZQUNOLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsSUFBSTtZQUNKLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLElBQUk7WUFDSixLQUFLO1lBQ0wsTUFBTTtZQUNOLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxJQUFJO1lBQ0osS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxJQUFJO1lBQ0osS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLE1BQU07WUFDTixLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxNQUFNO1lBQ04sS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLE1BQU07WUFDTixNQUFNO1lBQ04sS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxNQUFNO1lBQ04sSUFBSTtZQUNKLEtBQUs7WUFDTCxNQUFNO1lBQ04sS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztTQUNSLENBQUM7SUFNTixDQUFDOzs7OztJQUpVLHFDQUFPOzs7O0lBQWQsVUFBZSxJQUFVOztZQUNmLGFBQWEsR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUYsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEUsQ0FBQzs7Z0JBaklKLFVBQVU7O0lBa0lYLDBCQUFDO0NBQUEsQUFsSUQsSUFrSUM7U0FqSVksbUJBQW1COzs7Ozs7SUFFNUIsOENBeUhFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmd4UGljYUltYWdlU2VydmljZSB7XG5cbiAgICBwcml2YXRlIGltYWdlRXh0ZW5zaW9uczogc3RyaW5nW10gPSBbXG4gICAgICAgICdhc2UnLFxuICAgICAgICAnYXJ0JyxcbiAgICAgICAgJ2JtcCcsXG4gICAgICAgICdibHAnLFxuICAgICAgICAnY2Q1JyxcbiAgICAgICAgJ2NpdCcsXG4gICAgICAgICdjcHQnLFxuICAgICAgICAnY3IyJyxcbiAgICAgICAgJ2N1dCcsXG4gICAgICAgICdkZHMnLFxuICAgICAgICAnZGliJyxcbiAgICAgICAgJ2RqdnUnLFxuICAgICAgICAnZWd0JyxcbiAgICAgICAgJ2V4aWYnLFxuICAgICAgICAnZ2lmJyxcbiAgICAgICAgJ2dwbCcsXG4gICAgICAgICdncmYnLFxuICAgICAgICAnaWNucycsXG4gICAgICAgICdpY28nLFxuICAgICAgICAnaWZmJyxcbiAgICAgICAgJ2puZycsXG4gICAgICAgICdqcGVnJyxcbiAgICAgICAgJ2pwZycsXG4gICAgICAgICdqZmlmJyxcbiAgICAgICAgJ2pwMicsXG4gICAgICAgICdqcHMnLFxuICAgICAgICAnbGJtJyxcbiAgICAgICAgJ21heCcsXG4gICAgICAgICdtaWZmJyxcbiAgICAgICAgJ21uZycsXG4gICAgICAgICdtc3AnLFxuICAgICAgICAnbml0ZicsXG4gICAgICAgICdvdGEnLFxuICAgICAgICAncGJtJyxcbiAgICAgICAgJ3BjMScsXG4gICAgICAgICdwYzInLFxuICAgICAgICAncGMzJyxcbiAgICAgICAgJ3BjZicsXG4gICAgICAgICdwY3gnLFxuICAgICAgICAncGRuJyxcbiAgICAgICAgJ3BnbScsXG4gICAgICAgICdQSTEnLFxuICAgICAgICAnUEkyJyxcbiAgICAgICAgJ1BJMycsXG4gICAgICAgICdwaWN0JyxcbiAgICAgICAgJ3BjdCcsXG4gICAgICAgICdwbm0nLFxuICAgICAgICAncG5zJyxcbiAgICAgICAgJ3BwbScsXG4gICAgICAgICdwc2InLFxuICAgICAgICAncHNkJyxcbiAgICAgICAgJ3BkZCcsXG4gICAgICAgICdwc3AnLFxuICAgICAgICAncHgnLFxuICAgICAgICAncHhtJyxcbiAgICAgICAgJ3B4cicsXG4gICAgICAgICdxZngnLFxuICAgICAgICAncmF3JyxcbiAgICAgICAgJ3JsZScsXG4gICAgICAgICdzY3QnLFxuICAgICAgICAnc2dpJyxcbiAgICAgICAgJ3JnYicsXG4gICAgICAgICdpbnQnLFxuICAgICAgICAnYncnLFxuICAgICAgICAndGdhJyxcbiAgICAgICAgJ3RpZmYnLFxuICAgICAgICAndGlmJyxcbiAgICAgICAgJ3Z0ZicsXG4gICAgICAgICd4Ym0nLFxuICAgICAgICAneGNmJyxcbiAgICAgICAgJ3hwbScsXG4gICAgICAgICczZHYnLFxuICAgICAgICAnYW1mJyxcbiAgICAgICAgJ2FpJyxcbiAgICAgICAgJ2F3ZycsXG4gICAgICAgICdjZ20nLFxuICAgICAgICAnY2RyJyxcbiAgICAgICAgJ2NteCcsXG4gICAgICAgICdkeGYnLFxuICAgICAgICAnZTJkJyxcbiAgICAgICAgJ2VndCcsXG4gICAgICAgICdlcHMnLFxuICAgICAgICAnZnMnLFxuICAgICAgICAnZ2JyJyxcbiAgICAgICAgJ29kZycsXG4gICAgICAgICdzdmcnLFxuICAgICAgICAnc3RsJyxcbiAgICAgICAgJ3ZybWwnLFxuICAgICAgICAneDNkJyxcbiAgICAgICAgJ3N4ZCcsXG4gICAgICAgICd2MmQnLFxuICAgICAgICAndm5kJyxcbiAgICAgICAgJ3dtZicsXG4gICAgICAgICdlbWYnLFxuICAgICAgICAnYXJ0JyxcbiAgICAgICAgJ3hhcicsXG4gICAgICAgICdwbmcnLFxuICAgICAgICAnd2VicCcsXG4gICAgICAgICdqeHInLFxuICAgICAgICAnaGRwJyxcbiAgICAgICAgJ3dkcCcsXG4gICAgICAgICdjdXInLFxuICAgICAgICAnZWN3JyxcbiAgICAgICAgJ2lmZicsXG4gICAgICAgICdsYm0nLFxuICAgICAgICAnbGlmZicsXG4gICAgICAgICducnJkJyxcbiAgICAgICAgJ3BhbScsXG4gICAgICAgICdwY3gnLFxuICAgICAgICAncGdmJyxcbiAgICAgICAgJ3NnaScsXG4gICAgICAgICdyZ2InLFxuICAgICAgICAncmdiYScsXG4gICAgICAgICdidycsXG4gICAgICAgICdpbnQnLFxuICAgICAgICAnaW50YScsXG4gICAgICAgICdzaWQnLFxuICAgICAgICAncmFzJyxcbiAgICAgICAgJ3N1bicsXG4gICAgICAgICd0Z2EnXG4gICAgXTtcblxuICAgIHB1YmxpYyBpc0ltYWdlKGZpbGU6IEZpbGUpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgZmlsZUV4dGVuc2lvbjogc3RyaW5nID0gZmlsZS5uYW1lLnRvTG93ZXJDYXNlKCkuc3Vic3RyKGZpbGUubmFtZS5sYXN0SW5kZXhPZignLicpICsgMSk7XG4gICAgICAgIHJldHVybiAodGhpcy5pbWFnZUV4dGVuc2lvbnMuaW5kZXhPZihmaWxlRXh0ZW5zaW9uKSAhPT0gLTEpO1xuICAgIH1cbn1cbiJdfQ==