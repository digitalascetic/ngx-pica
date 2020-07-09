export interface ExifOptions {
  forceExifOrientation: boolean;
}

export interface AspectRatioOptions {
  keepAspectRatio: boolean;
  forceMinDimensions?: boolean;
}

export interface NgxPicaResizeOptionsInterface {
  exifOptions: ExifOptions;
  aspectRatio?: AspectRatioOptions;
  quality?: number;
  alpha?: boolean;
  unsharpAmount?: number;
  unsharpRadius?: number;
  unsharpThreshold?: number;
}

export interface NgxPicaCompressOptionsInterface {
  exifOptions: ExifOptions;
}
