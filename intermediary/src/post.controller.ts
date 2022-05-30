import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Inject,
    Injectable,
    Post,
    Query,
    Req,
} from '@nestjs/common';
import { Request } from 'express';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePostDto } from './post.dto';

@Injectable()
@Controller('/posts')
export class PostController {
    constructor(
        @Inject('POST_CREATORS_SERVICE')
        private readonly postCreatorsService: ClientProxy,
    ) {}

    @HttpCode(HttpStatus.CREATED)
    @Post()
    async createPost(@Body() data: CreatePostDto) {
        return this.postCreatorsService.send(
            {
                cmd: 'create-post',
            },
            data,
        );
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    async findAll(
        @Query('page') page: number,
        @Query('limit') limit: number,
        @Req() request: Request,
    ) {
        const data = this.postCreatorsService.send(
            {
                cmd: 'find-all-posts',
            },
            {
                page: Number(!page || page <= 0 ? 1 : page),
                limit: Number(
                    !limit || limit <= 0 || limit > 100 ? 100 : limit,
                ),
            },
        );

        await data.forEach(elem => {
            request.res.writeHead(200, {
                'Content-Type': 'text/plain',
                'Transfer-Encoding': 'chunked',
                'X-Content-Type-Options': 'nosniff',
            });
            request.res.write(`${JSON.stringify(elem.data)}\n`);
        });
    }
}
