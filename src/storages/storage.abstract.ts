import {UploadFileInterface} from './interfaces/upload-file.interface';
import { v4 as uuid } from 'uuid';
import * as fs from 'fs';
import * as pump from 'pump';

export abstract class StorageAbstract implements UploadFileInterface {
  protected filename: string;
  protected resizePrefix: string;

  setFilename(value: string) {
    this.filename = value;
  }

  setResizePrefix(value: string): UploadFileInterface {
    this.resizePrefix = value;
    return this;
  }

  protected async saveAsTemp(file): Promise<string> {
    return new Promise((resolve, reject) => {
      const tmpFile = '/tmp/' + uuid();
      // const writeStream = fs.createWriteStream(tmpFile);
      // file.stream
      //   .pipe(writeStream)
      //   .on('error', error => reject(error))
      //   .on('finish', () => resolve(tmpFile));
      pump(file, fs.createWriteStream(tmpFile))
        .on('error', error => reject(error))
        .on('finish', () => resolve(tmpFile));
    });
  }
}
