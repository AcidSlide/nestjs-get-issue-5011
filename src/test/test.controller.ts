import {Controller, Get, Logger} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {TestService} from './test.service';

@ApiTags('test')
@Controller('test')
export class TestController {
  private readonly logger = new Logger(TestController.name);

  constructor(
    private readonly testService: TestService,
  ) {}

  @Get('/')
  getTest(): any {
    return {
      message: 'This is a test',
    };
  }

  @Get('/getNotWorking')
  getTest2(): any {
    return {
      message: 'Why is it not working??',
    };
  }
}
