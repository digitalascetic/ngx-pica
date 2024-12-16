export enum NgxPicaErrorType {
  NO_FILES_RECEIVED = 'NO_FILES_RECEIVED',
  READ_ERROR = 'IMAGE_COULD_NOT_BE_LOADED',
  NOT_BE_ABLE_TO_COMPRESS_ENOUGH = 'NOT_BE_ABLE_TO_COMPRESS_ENOUGH'
}

export interface NgxPicaErrorInterface {
  err: NgxPicaErrorType;
  file?: File;
}
