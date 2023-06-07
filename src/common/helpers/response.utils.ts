// import { isArray, isString, upperFirst } from 'lodash';
// import { HttpStatus } from '@nestjs/common';

// interface MessageInterface {
//     field: string;
//     message: string;
// }
// interface PaginationParamsInterface {
//     readonly page: number;
//     readonly limit?: number;
// }

// export class ResponseUtils {
//     public success(data: any, options?: { totalCount: number; paginationParams: PaginationParamsInterface }) {
//         return { status: HttpStatus.OK, data, options };
//     }

//     public error(status: number, error?: string, message?: any, error_code?: string) {
//         return {
//             status,
//             error: error || null,
//             message: message ? this.getMessage(message) : null,
//             timestamp: new Date().toISOString(),
//             error_code,
//         };
//     }

//     public getMessage(message: string | MessageInterface | MessageInterface[]) {
//         if (isString(message)) return upperFirst(message);
//         if (isArray(message))
//             return message.map((msg) => {
//                 msg.message = upperFirst(msg.message);

//                 return msg;
//             });
//         if (message?.field)
//             return [
//                 {
//                     message: upperFirst(message.message),
//                     field: message.field,
//                 },
//             ];

//         return [{ message: upperFirst(message.message), field: message.field }];
//     }
// }
