import { Controller, Get, Inject, Query, Render } from '@nestjs/common';
import { PostService } from './shared/models/posts/post.service';

@Controller()
export class AppController {
    constructor(
        @Inject(PostService) private readonly postService: PostService,
    ) {}

    @Get()
    @Render('index')
    async index(@Query('page') page: number, @Query('limit') limit: number) {
        const { data: tweets } = await this.postService.findAllPosts({
            page: Number(!page || page <= 0 ? 1 : page),
            limit: Number(!limit || limit <= 0 || limit > 100 ? 100 : limit),
        });
        return { tweets };
    }
}
