import {
    DynamicModule,
    MiddlewareConsumer,
    Module,
    NestModule,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PostRepository } from './models/posts/post.repository';
import { PostService } from './models/posts/post.service';
import { PostController } from './models/posts/post.controller';

const repositories: DynamicModule = TypeOrmModule.forFeature([PostRepository]);
const services = [PostService];
const controllers = [PostController];

@Module({
    imports: [ConfigModule, repositories],
    providers: [...services],
    controllers: [...controllers],
    exports: [...services],
})
export class SharedModule implements NestModule {
    configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
        consumer.apply().forRoutes(...controllers);
    }
}
