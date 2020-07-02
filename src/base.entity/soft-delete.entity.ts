import { BaseEntity, BeforeRemove, Column, EntityManager, FindManyOptions, FindOneOptions, getManager, RemoveOptions } from 'typeorm';
import { Logger } from '@nestjs/common';

export abstract class SoftDeleteEntity extends BaseEntity {
  @Column({
    name: 'deleted',
    type: 'boolean',
    default: false,
    select: false,
  })
  isDeleted?: boolean;

  async remove(options?: RemoveOptions): Promise<this> {
    if (this.isDeleted) {
      throw new Error(`Attempted to soft-delete a(n) ${this.constructor.name} that has already been soft-deleted`);
    }
    this.isDeleted = true;

    return await this.save();
  }

  async forceRemove(options?: RemoveOptions): Promise<this> {
    return await super.remove(options);
  }

// @BeforeRemove()
  // beforeRemove() {
  //   throw new Error(`Attempted to hard-delete a soft-deletable ${this.constructor.name}`);
  // }
  //
  // async softRemove(): Promise<void> {
  //   await this.softRemoveInternal();
  // }
  //
  // async softRemoveUsing(manager: EntityManager): Promise<void> {
  //   await this.softRemoveInternal(manager);
  // }
  //
  // protected async softRemoveInternal(manager = getManager()): Promise<void> {
  //   if (this.isDeleted) {
  //     throw new Error(`Attempted to soft-delete a(n) ${this.constructor.name} that has already been soft-deleted`);
  //   }
  //
  //   this.isDeleted = true;
  //
  //   await manager.save(this);
  // }
  //
  // static async count<TStatic extends typeof BaseEntity, T extends InstanceType<TStatic>>(
  //   this: TStatic,
  //   options?: FindManyOptions<T>,
  // ): Promise<number> {
  //   return super.count<T>({
  //     where: { isDeleted: false },
  //     ...options,
  //   });
  // }
  //
  // static async find<TStatic extends typeof BaseEntity, T extends InstanceType<TStatic>>(
  //   this: TStatic,
  //   options?: FindManyOptions<T>,
  // ): Promise<T[]> {
  //   return super.find<T>({
  //     where: { isDeleted: false },
  //     ...options,
  //   });
  // }
  //
  // static async findAndCount<TStatic extends typeof BaseEntity, T extends InstanceType<TStatic>>(
  //   this: TStatic,
  //   options?: FindManyOptions<T>,
  // ): Promise<[T[], number]> {
  //   return super.findAndCount<T>({
  //     where: { isDeleted: false },
  //     ...options,
  //   });
  // }
  //
  // static async findByIds<TStatic extends typeof BaseEntity, T extends InstanceType<TStatic>>(
  //   this: TStatic,
  //   ids: string[],
  //   options?: FindManyOptions<T>,
  // ): Promise<T[]> {
  //   return super.findByIds<T>(ids, {
  //     where: { isDeleted: false },
  //     ...options,
  //   });
  // }
  //
  // static async findOne<TStatic extends typeof BaseEntity, T extends InstanceType<TStatic>>(
  //   this: TStatic,
  //   id?: string,
  //   options?: FindOneOptions<T>,
  // ): Promise<T | undefined>;
  // static async findOne<TStatic extends typeof BaseEntity, T extends InstanceType<TStatic>>(
  //   this: TStatic,
  //   options?: FindOneOptions<T>,
  // ): Promise<T | undefined>;
  // static async findOne<TStatic extends typeof BaseEntity, T extends InstanceType<TStatic>>(
  //   this: TStatic,
  //   idOrOptions?: string | FindOneOptions<T>,
  //   maybeOptions?: FindOneOptions<T>,
  // ): Promise<T | undefined> {
  //   const logger = new Logger(SoftDeleteEntity.name);
  //   logger.debug('Called static async findOne...');
  //   const id = idOrOptions instanceof Object ? undefined : idOrOptions;
  //   const options: FindOneOptions<T> = {
  //     where: { isDeleted: false },
  //     ...idOrOptions instanceof Object ? idOrOptions : maybeOptions,
  //   };
  //
  //   logger.debug(id);
  //   logger.debug(options);
  //   return super.findOne<T>(id, options);
  // }
  //
  // static async findOneOrFail<TStatic extends typeof BaseEntity, T extends InstanceType<TStatic>>(
  //   this: TStatic,
  //   id?: string,
  //   options?: FindOneOptions<T>,
  // ): Promise<T | undefined>;
  // static async findOneOrFail<TStatic extends typeof BaseEntity, T extends InstanceType<TStatic>>(
  //   this: TStatic,
  //   options?: FindOneOptions<T>,
  // ): Promise<T | undefined>;
  // static async findOneOrFail<TStatic extends typeof BaseEntity, T extends InstanceType<TStatic>>(
  //   this: TStatic,
  //   idOrOptions?: string | FindOneOptions<T>,
  //   maybeOptions?: FindOneOptions<T>,
  // ): Promise<T | undefined> {
  //   const id = idOrOptions instanceof Object ? undefined : idOrOptions;
  //   const options: FindOneOptions<T> = {
  //     where: { isDeleted: false },
  //     ...idOrOptions instanceof Object ? idOrOptions : maybeOptions,
  //   };
  //
  //   return super.findOneOrFail<T>(id, options);
  // }
}
