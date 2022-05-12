import { Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { CreatePostDto } from './post.dto';
import { IQuery } from './query.interface';
import { paginateResponse } from '../../utils/paginate.util';
import { PostRepository } from './post.repository';
import { IPaginate } from '../../utils/paginate.interface';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostRepository)
        private readonly postRepository: Repository<PostEntity>,
    ) {}

    public async createPost(data: CreatePostDto): Promise<PostEntity> {
        try {
            return await this.postRepository.save(data);
        } catch (err) {
            throw new BadRequestException(err);
        }
    }

    public async findAllPosts(query: IQuery): Promise<IPaginate> {
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
