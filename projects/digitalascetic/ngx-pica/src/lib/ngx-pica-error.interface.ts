export enum NgxPicaErrorType {
  NO_FILES_RECEIVED = 'NO_FILES_RECEIVED',
  READ_ERROR = 'IMAGE_COULD_NOT_BE_LOADED'
}

export interface NgxPicaErrorInterface {
  err: NgxPicaErrorType;
  file?: File;
}
