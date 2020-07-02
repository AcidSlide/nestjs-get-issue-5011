import { BaseRepository } from './base.repository';
import { UserModifiableEntity } from './user-modifiable.entity';

export class UserModifiableRepository<Entity extends UserModifiableEntity> extends BaseRepository<Entity> {}
