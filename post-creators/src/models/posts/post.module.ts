import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';

@Module({
    imports: [TypeOrmModule.forFeature([PostRepository])],
    providers: [PostService],
    exports: [],
    controllers: [PostController],
})
export class PostModule {}
