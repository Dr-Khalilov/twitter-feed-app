import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfigFactory } from './config/data-source.config';
import joiSchemaConfig from './config/joi-schema.config';
import { SharedModule } from './shared/shared.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            envFilePath: '.env',
            validationSchema: joiSchemaConfig,
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: getTypeOrmConfigFactory,
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
            exclude: ['/api*'],
        }),
        SharedModule,
    ],
})
export class AppModule {}
