import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEmailAlreadyExists } from './UserEmailAlreadyExists';

@Module({
  imports: [],
  providers: [UserEmailAlreadyExists],
})
export class CustomValidatorsModule {}
