import * as redisStore from 'cache-manager-redis-store';
import {CacheModule, Logger, Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CustomValidatorsModule } from './custom-validators/custom-validators.module';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';
import { UploadFileInterface } from './storages/interfaces/upload-file.interface';
import { StorageAbstract } from './storages/storage.abstract';
import {HandlebarsAdapter, MailerModule} from '@nest-modules/mailer';
import {HttpCacheInterceptor} from './http-cache.interceptor';
import { TestModule } from './test/test.module';
import {TestService} from './test/test.service';

const logger = new Logger('AppModule');

@Module({
  imports: [
    CustomValidatorsModule,
    ConfigModule,
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST') || process.env.REDIS_HOST,
        port: +(configService.get('REDIS_PORT') || process.env.REDIS_PORT),
        ttl: +(configService.get('CACHE_TTL') || process.env.CACHE_TTL),
        max: +(configService.get('CACHE_MAX_ITEMS') || process.env.CACHE_MAX_ITEMS),
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          pool: process.env.MAILER_POOLED === 'true' ? true : false,
          host: process.env.MAILER_SMTP,
          port: +process.env.MAILER_PORT,
          secure: process.env.MAILER_SECURED === 'true' ? true : false,
          auth: {
            user: process.env.MAILER_USER,
            pass: process.env.MAILER_PASSWORD,
          },
          tls: {
            rejectUnauthorized: false,
          },
          logger: true,
          debug: true,
        },
        defaults: {
          from: process.env.MAILER_DEFAULT_FROM,
        },
        template: {
          dir: __dirname + process.env.MAILER_TEMPLATES,
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          }
        },
      }),
    }),
    TestModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpCacheInterceptor,
    },
    AppService,
    ConfigService,
    TestService,
  ],
})
export class AppModule {}
