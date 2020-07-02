import {Controller, Get, Request, Post, UseGuards, Req, Res, Logger, Ip} from '@nestjs/common';
import { AppService } from './app.service';
import {ApiBearerAuth, ApiOperation, ApiTags} from '@nestjs/swagger';

@ApiTags('default')
@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(
    private readonly appService: AppService,
  ) {}

  @Get('/')
  getHello(@Ip() ip): string {
    this.logger.warn(`IP: ${ip}`);
    return this.appService.getHello();
  }

  @Get('/test')
  getTest(): string {
    return 'this is just a test';
  }
}
