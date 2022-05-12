import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../abstract/abstract.entity';

@Entity('posts')
export class PostEntity extends AbstractEntity {
    @Column({ type: 'varchar', length: 255, nullable: false })
    public text: string;
}
