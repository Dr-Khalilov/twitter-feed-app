import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfigFactory } from './config/data-source.config';
import joiSchemaConfig from './config/joi-schema.config';
import { AppController } from './app.controller';
import { SharedModule } from './shared/shared.module';

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
        SharedModule,
    ],
    controllers: [AppController],
})
export class AppModule implements OnModuleInit {
    onModuleInit(): void {
        console.log('The module has been initialized.');
    }
}
