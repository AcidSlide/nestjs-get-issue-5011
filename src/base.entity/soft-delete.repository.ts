import { BaseEntity, FindManyOptions, ObjectLiteral, Repository } from 'typeorm';
import { SoftDeleteEntity } from './soft-delete.entity';

export class SoftDeleteRepository<Entity extends SoftDeleteEntity> extends Repository<Entity> {}
