import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Inject,
    Post,
    Query,
    Req,
} from '@nestjs/common';
import { Request } from 'express';
import { PostService } from './post.service';
import { CreatePostDto } from './post.dto';

@Controller('/posts')
export class PostController {
    constructor(
        @Inject(PostService) private readonly postService: PostService,
    ) {}

    @HttpCode(HttpStatus.CREATED)
    @Post()
    async createOne(@Body() data: CreatePostDto, @Req() request: Request) {
        await this.postService.createPost(data);
        return request.res.redirect('/');
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    async findAll(
        @Query('page') page: number,
        @Query('limit') limit: number,
        @Req() request: Request,
    ) {
        return await this.postService.findAllPosts(
            {
                page: Number(!page || page <= 0 ? 1 : page),
                limit: Number(
                    !limit || limit <= 0 || limit > 100 ? 100 : limit,
                ),
            },
            request,
        );
    }
}
