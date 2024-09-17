import {Injectable} from '@angular/core';
import {Subject, Observable, Subscription} from 'rxjs';
import {NgxPicaErrorInterface, NgxPicaErrorType} from './ngx-pica-error.interface';
import {switchMap} from 'rxjs/operators';
import Compressor from 'compressorjs';

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

    new Compressor(file, {
      width: width,
      height: height,
      convertTypes: [],
      success(result) {
        let resizedFile: File;

        if (!(result instanceof File)) {
          resizedFile = new File([result], file.name, {type: file.type,});
        } else {
          resizedFile = result;
        }

        resizedImage.next(resizedFile);
        resizedImage.complete();
      },
      error(err) {
        resizedImage.error({err: NgxPicaErrorType.READ_ERROR, file: file, original_error: err});
      },
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

    this.getCompressedImage(file, 1, sizeInMB, 0)
      .then(imgCompressed => {
        compressedImage.next(imgCompressed);
        compressedImage.complete();
      })
      .catch(err => {
        compressedImage.error({err: NgxPicaErrorType.READ_ERROR, file: file, original_error: err});
      });

    return compressedImage.asObservable();
  }

  private getCompressedImage(file: File, quality: number, sizeInMB: number, step: number): Promise<File> {
    return new Promise<File>((resolve, reject) => {
      console.log(file.size);
      new Compressor(file, {
        quality: quality,
        success: (result) => {
          let compressedFile: File;

          if (result instanceof Blob) {
            compressedFile = new File([result], file.name, {type: file.type});
          } else {
            compressedFile = result;
          }

          this.checkCompressedImageSize(compressedFile, quality, sizeInMB, step)
            .then((compressedImage: File) => {
                resolve(compressedImage);
              }
            )
            .catch((err) => reject(err));
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  private checkCompressedImageSize(
    file: File,
    quality: number,
    sizeInMB: number,
    step: number
  ): Promise<File> {
    return new Promise<File>((resolve, reject) => {
      if (step > this.MAX_STEPS) {
        reject(NgxPicaErrorType.NOT_BE_ABLE_TO_COMPRESS_ENOUGH);
      } else if (this.bytesToMB(file.size) <= sizeInMB) {
        resolve(file);
      } else {
        const newQuality: number = quality - 0.5;
        const newStep: number = step + 1;

        resolve(this.getCompressedImage(file, newQuality, sizeInMB, newStep));
      }
    });
  }

  private bytesToMB(bytes: number) {
    return bytes / 1048576;
  }
}
