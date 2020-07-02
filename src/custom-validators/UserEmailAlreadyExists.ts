import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@ValidatorConstraint({async: true})
@Injectable()
export class UserEmailAlreadyExists implements ValidatorConstraintInterface {
  private readonly logger = new Logger(UserEmailAlreadyExists.name);
  constructor(
  ) {}

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'User email already exists';
  }

  async validate(email: string, validationArguments?: ValidationArguments): Promise<boolean> {
    this.logger.debug('Checking if users exists by email address...');
    return new Promise<boolean>(ok => {
      ok(true);
    });
  }

  private async delay(millis: number) {
    return new Promise(resolve => setTimeout(resolve, millis));
  }
}
