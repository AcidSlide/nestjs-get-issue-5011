import { BaseEntity } from './base.entity';
import { Column } from 'typeorm';

export abstract class UserModifiableEntity extends BaseEntity {
  @Column({
    name: 'created_by',
    type: 'bigint',
    unsigned: true,
    nullable: true,
    default: null,
    select: false,
  })
  createdBy?: number;

  @Column({
    name: 'updated_by',
    type: 'bigint',
    unsigned: true,
    nullable: true,
    default: null,
    select: false,
  })
  updatedBy?: number;
}
