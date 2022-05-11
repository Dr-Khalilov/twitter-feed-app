import { BadRequestException, Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { PostRepository } from './post.repository';
import { CreatePostDto } from './post.dto';
import { PostEntity } from './post.entity';
import { paginateResponse } from '../utils/paginate.util';
import { IQuery } from './query.interface';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostRepository)
        private readonly postRepository: PostRepository,
    ) {}

    public async createPost(data: CreatePostDto): Promise<PostEntity> {
        try {
            return await this.postRepository.save(data);
        } catch (err) {
            throw new BadRequestException(err);
        }
    }

    public async findAllPosts(query: IQuery, @Req() request: Request) {
        try {
            const { page, limit = 10 } = query;
            const skip = (page - 1) * limit;
            const posts = await this.postRepository.findAndCount({
                take: limit,
                skip: skip,
                order: {
                    ['createdAt']: 'DESC',
                },
            });
            const { data: tweets } = paginateResponse(posts, page, limit);
            const headers = {
                'Content-Type': 'text/event-stream',
                Connection: 'keep-alive',
                'Cache-Control': 'no-cache',
                retry: 100000,
            };
            request.res.writeHead(200, headers);
            const data = `data: ${JSON.stringify(tweets)}\n\n`;
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
        } catch (err) {
            throw new BadRequestException(err);
        }
    }
}
