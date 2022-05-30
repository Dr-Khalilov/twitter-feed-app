import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import joiSchemaConfig from './config/joi-schema.config';
import { PostCreatorsModule } from './post-creators.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            envFilePath: '.env',
            validationSchema: joiSchemaConfig,
        }),
        PostCreatorsModule,
    ],
})
export class AppModule {}
