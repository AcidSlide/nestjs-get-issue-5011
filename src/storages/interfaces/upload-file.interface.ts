import {StorageAbstract} from '../storage.abstract';

export interface UploadFileInterface {
  setFilename(value: string);

  setResizePrefix(value: string): UploadFileInterface;
}
