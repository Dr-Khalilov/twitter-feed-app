import {
    BaseEntity,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

export abstract class AbstractEntity extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @CreateDateColumn({
        type: 'timestamp without time zone',
        name: 'created_at',
    })
    public createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp without time zone',
        name: 'updated_at',
    })
    public updatedAt: Date;
}
