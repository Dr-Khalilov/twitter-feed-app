import { IPaginate } from './paginate.interface';

export const paginateResponse = (
    [result, total],
    page: number,
    limit: number,
): IPaginate => {
    const lastPage: number = Math.ceil(total / limit);
    const nextPage: number = page + 1 > lastPage ? null : page + 1;
    const prevPage: number = page - 1 < 1 ? null : page - 1;
    return {
        statusCode: 'success',
        data: [...result],
        count: total,
        currentPage: page,
        nextPage,
        prevPage,
        lastPage,
    };
};
