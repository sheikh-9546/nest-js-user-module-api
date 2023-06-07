import {
    AfterLoad,
    BaseEntity,
    CreateDateColumn,
    DeepPartial,
    DeleteDateColumn,
    FindManyOptions,
    ObjectLiteral,
    Repository,
    UpdateDateColumn,
} from 'typeorm';
import { Exclude, instanceToPlain } from 'class-transformer';

export type PaginationResult<I> = {
    results: I[];
    options: {
        page: number;
        limit: number;
        page_count: number;
        total_count: number;
    };
};

export type PaginationOptions = { page?: number; limit?: number } & FindManyOptions;

export class EntityHelper extends BaseEntity {
    static async paginate<T extends typeof EntityHelper, I = InstanceType<T>>(
        this: T,
        { page = 1, limit = 25, ...params }: PaginationOptions = {
            page: 1,
            limit: 25,
        },
    ): Promise<PaginationResult<I>> {
        const [results, total_count] = await this.findAndCount({
            ...params,
            skip: (page - 1) * limit,
            take: limit,
        });
        const page_count = Math.ceil(total_count / limit);

        return {
            results,
            options: {
                page,
                limit,
                page_count,
                total_count,
            },
        };
    }
}

export class EntityClass extends EntityHelper {
    @Exclude()
    entity?: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Exclude({ toPlainOnly: true })
    @DeleteDateColumn()
    deletedAt: Date;

    @AfterLoad()
    setEntityName() {
        this.entity = this.constructor.name;
    }

    toJSON() {
        return instanceToPlain(this);
    }
}

// TODO
export class Repo<Entity extends ObjectLiteral> extends Repository<Entity> {
    async _create(R: DeepPartial<Entity>) {
        return this.save(this.create(R));
    }

    async _update(id: number, R: DeepPartial<Entity>) {
        return this.save(
            this.create({
                id,
                ...R,
            }),
        );
    }
}
