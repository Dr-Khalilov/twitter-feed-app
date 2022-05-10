import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../abstract/abstract.entity';

@Entity('posts')
export class PostEntity extends AbstractEntity {
    constructor(subscriptionData: Partial<PostEntity>) {
        super();
        Object.assign(this, subscriptionData);
    }

    @Column({ type: 'varchar', length: 255, nullable: true })
    public text: string;
}
