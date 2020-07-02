import {CacheInterceptor, ExecutionContext, Injectable, Logger} from '@nestjs/common';
// import * as crypto from 'crypto';
import * as md5 from 'md5';

@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
  private readonly logger = new Logger(HttpCacheInterceptor.name);

  trackBy(context: ExecutionContext): string | undefined {
    const request = context.switchToHttp().getRequest();
    const method = request.raw.method;
    if (method === 'GET') {
      let authHeader = request.headers.authorization;
      if (authHeader === undefined) {
        authHeader = 'none';
      } else {
        const bearerValue = authHeader.replace('Bearer ', '');
        // authHeader = authHeader.replace('Bearer ', '');
        // authHeader = crypto.createHash('md5').update(bearerValue).digest('hex');
        authHeader = md5(bearerValue);
        // const testMd5 = md5(bearerValue);
        // this.logger.debug(`authHeader: "${authHeader}"`);
        // this.logger.debug(`testMd5: "${testMd5}"`);
      }
      const endpoint = request.raw.url;
      return endpoint + '-' + authHeader;
    } else {
      return undefined;
    }
  }
}
