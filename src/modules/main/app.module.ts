import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from '@modules/main/app.config';
import {
    PPResonseInterceptorModule,
    BaseModule,
    SERVICE,
    PPHttpExceptionFilterModule,
    PPLoggingInterceptorModule,
} from 'pp-stark-industries';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            ignoreEnvFile: true,
            load: [configuration],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    type: configService.get('DB_TYPE'),
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_DATABASE'),
                    entities: [__dirname + './../**/**.entity{.ts,.js}'],
                    synchronize: configService.get('DB_SYNC') === 'true',
                    timezone: 'Z',
                } as TypeOrmModuleAsyncOptions;
            },
        }),
        BaseModule.forRoot(SERVICE.AUTO_INVEST_SERVICE.CODE, SERVICE.AUTO_INVEST_SERVICE.NAME),
        PPLoggingInterceptorModule.register(),
        PPResonseInterceptorModule.register(),
        PPHttpExceptionFilterModule.register(),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
