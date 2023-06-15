// import { PaginationOptions, PaginationResult } from '@app/entities/entity.interface';
// import { Logger } from '@nestjs/common';

// export class EntityPagination extends Model {
//     static async paginate<T extends typeof EntityPagination, I = InstanceType<T>>(
//         this: T,
//         { page = 1, pageSize = 25, scope, ...params }: PaginationOptions = {
//             page: 1,
//             pageSize: 25,
//         },
//     ): Promise<PaginationResult<I>> {
//         const options = { ...params };

//         const countOptions = Object.keys(options).reduce((acc, key) => {
//             if (!['order', 'attributes', 'include'].includes(key)) {
//                 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//                 // @ts-ignore
//                 acc[key] = options[key];
//             }

//             return acc;
//         }, {});

//         options.limit = pageSize;
//         options.offset = pageSize * (page - 1);

//         if (params.limit) {
//             Logger.warn('(sequelize-pagination) Warning: limit option is ignored.');
//         }

//         if (params.offset) {
//             Logger.warn('(sequelize-pagination) Warning: offset option is ignored.');
//         }

//         if (params.order) options.order = params.order;

//         const [count, rows] = await Promise.all([
//             this.count(countOptions),
//             scope ? this.scope(scope).findAll(options) : this.findAll(options),
//         ]);
//         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//         // @ts-ignore
//         const total = options.group !== undefined ? count.length : count;
//         // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
//         const typedRows = rows as unknown as I[];
//         const pages = Math.ceil(total / pageSize);

//         return {
//             results: typedRows,
//             options: {
//                 page,
//                 per_page: pageSize,
//                 page_count: pages,
//                 total_count: total,
//             },
//         };
//     }
// }
