import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

    public async findAllPosts(query: IQuery) {
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
            return paginateResponse(posts, page, limit);
        } catch (err) {
            throw new BadRequestException(err);
        }
    }
}
