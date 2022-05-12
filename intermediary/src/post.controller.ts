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
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
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
        const data = await this.postCreatorsService.send(
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

        const headers = {
            'Content-Type': 'text/event-stream',
            Connection: 'keep-alive',
            'Cache-Control': 'no-cache',
        };
        await data.forEach(item => {
            request.res.writeHead(200, headers);
            const data = `data: ${JSON.stringify(item.data)}\n\n`;
            request.res.write(data);
            const clientId = Date.now();
            let clients = [];
            const newClient = {
                id: clientId,
                request,
            };
            clients.push(newClient);

            request.on('close', () => {
                console.log(`${clientId} Connection closed`);
                clients = clients.filter(client => client.id !== clientId);
                request.res.end();
            });
        });
    }
}
