import {UploadFileInterface} from './interfaces/upload-file.interface';
import {StorageTypeEnum} from './storage.constants';
import {PrescriptionStorageAdaptor} from './adaptors/PrescriptionStorageAdaptor';

export class StorageFactory {
  static createStorageForType(type: StorageTypeEnum): UploadFileInterface {
    switch (type) {
      case StorageTypeEnum.PRESCRIPTION:
        return new PrescriptionStorageAdaptor();

      case StorageTypeEnum.PRODUCT:
        return null;

      default:
        return null;
    }
  }
}
