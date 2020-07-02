import {StorageAbstract} from '../storage.abstract';

export class PrescriptionStorageAdaptor extends StorageAbstract {

  private userId: number;
  private userHash: string;

  constructor() {
    super();
  }
}
