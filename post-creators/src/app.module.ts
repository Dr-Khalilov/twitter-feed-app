import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from './database/database.module';
import { PostModule } from './models/posts/post.module';

@Module({
    imports: [
        DatabaseModule,
        PostModule,
        ConfigModule.forRoot({
            envFilePath: '.env',
            validationSchema: Joi.object({
                DB_TYPE: Joi.string().required(),
                DB_HOST: Joi.string().required(),
                DB_PORT: Joi.number().required(),
                DB_USER: Joi.string().required(),
                DB_PASSWORD: Joi.string().required(),
                DB_NAME: Joi.string().required(),
                TYPEORM_SYNC: Joi.boolean().required(),
                LOAD_ENTITIES: Joi.boolean().required(),
                PORT: Joi.number().required(),
                RABBITMQ_USER: Joi.string().required(),
                RABBITMQ_PASSWORD: Joi.string().required(),
                RABBITMQ_HOST: Joi.string().required(),
                RABBITMQ_QUEUE_NAME: Joi.string().required(),
            }),
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
