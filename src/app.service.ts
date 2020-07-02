import {Get, Injectable, Ip, Logger} from '@nestjs/common';
import {MailerService} from '@nest-modules/mailer';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    // protected readonly userRepository: UsersRepository,
    protected readonly mailerService: MailerService,
  ) {}

  @Get()
  getHello(): any {
    return {
      message: `Hello World! Test...`,
    };
  }

}
