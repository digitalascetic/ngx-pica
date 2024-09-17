import {Injectable} from '@angular/core';
import {Subject, Observable, Subscription} from 'rxjs';
import {NgxPicaErrorInterface, NgxPicaErrorType} from './ngx-pica-error.interface';
import {switchMap} from 'rxjs/operators';
import imageCompression from 'browser-image-compression';

@Injectable()
export class NgxPicaService {
  private MAX_STEPS = 20;

  public resizeImages(files: File[], width: number, height: number): Observable<File> {
    const resizedImage: Subject<File> = new Subject();
    const totalFiles: number = files.length;

    if (totalFiles > 0) {
      const nextFile: Subject<File> = new Subject();
      let index = 0;

      const subscription: Subscription = nextFile
        .pipe(
          switchMap((file: File) => this.resizeImage(file, width, height))
        )
        .subscribe({
          next: imageResized => {
            index++;
            resizedImage.next(imageResized);

            if (index < totalFiles) {
              nextFile.next(files[index]);

            } else {
              resizedImage.complete();
              subscription.unsubscribe();
            }
          },
          error: (err) => {
            const ngxPicaError: NgxPicaErrorInterface = {
              file: files[index],
              err: err
            };

            resizedImage.error(ngxPicaError);
          }
        });

      nextFile.next(files[index]);
    } else {
      const ngxPicaError: NgxPicaErrorInterface = {
        err: NgxPicaErrorType.NO_FILES_RECEIVED
      };

      resizedImage.error(ngxPicaError);
      resizedImage.complete();
    }

    return resizedImage.asObservable();
  }

  public resizeImage(file: File, width: number, height: number): Observable<File> {
    const resizedImage: Subject<File> = new Subject();

    const maxWidthOrHeight = width > height ? height : width;

    imageCompression.getExifOrientation(file)
      .then(orientation => {
        imageCompression(file, {
          maxWidthOrHeight: maxWidthOrHeight,
          exifOrientation: orientation,
          maxIteration: this.MAX_STEPS
        }).then(resizedFile => {
          resizedImage.next(resizedFile);
          resizedImage.complete();
        }).catch(err => resizedImage.error({err: NgxPicaErrorType.READ_ERROR, file: file, original_error: err}));

      })
      .catch(err => {
        imageCompression(file, {
          maxWidthOrHeight: maxWidthOrHeight,
          maxIteration: this.MAX_STEPS
        }).then(resizedFile => {
          resizedImage.next(resizedFile);
          resizedImage.complete();
        }).catch(err => resizedImage.error({err: NgxPicaErrorType.READ_ERROR, file: file, original_error: err}));
      });

    return resizedImage.asObservable();
  }

  public compressImages(files: File[], sizeInMB: number): Observable<File> {
    const compressedImage: Subject<File> = new Subject();
    const totalFiles: number = files.length;

    if (totalFiles > 0) {
      const nextFile: Subject<File> = new Subject();
      let index = 0;

      const subscription: Subscription = nextFile
        .pipe(
          switchMap((file: File) => this.compressImage(file, sizeInMB))
        )
        .subscribe({
          next: imageCompressed => {
            index++;
            compressedImage.next(imageCompressed);

            if (index < totalFiles) {
              nextFile.next(files[index]);

            } else {
              compressedImage.complete();
              subscription.unsubscribe();
            }
          },
          error: err => {
            const ngxPicaError: NgxPicaErrorInterface = {
              file: files[index],
              err: err
            };

            compressedImage.error(ngxPicaError);
          }
        });

      nextFile.next(files[index]);
    } else {
      const ngxPicaError: NgxPicaErrorInterface = {
        err: NgxPicaErrorType.NO_FILES_RECEIVED
      };

      compressedImage.error(ngxPicaError);
      compressedImage.complete();
    }

    return compressedImage.asObservable();
  }

  public compressImage(file: File, sizeInMB: number): Observable<File> {
    const compressedImage: Subject<File> = new Subject();

    if (this.bytesToMB(file.size) <= sizeInMB) {
      setTimeout(() => {
        compressedImage.next(file);
        compressedImage.complete();
      });
    } else {
      imageCompression.getExifOrientation(file)
        .then(orientation => {
          imageCompression(file, {
            maxSizeMB: sizeInMB,
            exifOrientation: orientation,
            alwaysKeepResolution: true,
            maxIteration: this.MAX_STEPS
          })
            .then(compressedFile => {
              compressedImage.next(compressedFile);
              compressedImage.complete();
            })
            .catch(err => compressedImage.error({err: NgxPicaErrorType.READ_ERROR, file: file, original_error: err}));

        })
        .catch(err => {
          imageCompression(file, {
            maxSizeMB: sizeInMB,
            alwaysKeepResolution: true,
            maxIteration: this.MAX_STEPS
          })
            .then(compressedFile => {
              compressedImage.next(compressedFile);
              compressedImage.complete();
            })
            .catch(err2 => compressedImage.error({err: NgxPicaErrorType.READ_ERROR, file: file, original_error: err2}));
        });
    }

    return compressedImage.asObservable();
  }

  private bytesToMB(bytes: number) {
    return bytes / 1048576;
  }
}
