import { Controller, Inject, Injectable } from '@nestjs/common';
import { PostService } from './post.service';
import {
    Ctx,
    MessagePattern,
    Payload,
    RmqContext,
} from '@nestjs/microservices';
import { CreatePostDto } from './post.dto';
import { IQuery } from '../../utils/query.interface';

@Controller('/posts')
@Injectable()
export class PostController {
    constructor(
        @Inject(PostService) private readonly postService: PostService,
    ) {}

    @MessagePattern({ cmd: 'create-post' })
    async createPost(
        @Payload() postData: CreatePostDto,
        @Ctx() context: RmqContext,
    ) {
        const newPost = await this.postService.createPost(postData);
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();
        channel.ack(originalMsg);
        return newPost;
    }

    @MessagePattern({ cmd: 'find-all-posts' })
    async findAllPosts(@Payload() { page, limit }: IQuery) {
        return await this.postService.findAllPosts({
            page,
            limit,
        });
    }
}
