import { SoftDeleteRepository } from './soft-delete.repository';
import { BaseEntity } from './base.entity';

export class BaseRepository<Entity extends BaseEntity> extends SoftDeleteRepository<Entity> {}
