export interface IPaginate {
    readonly statusCode: string;
    readonly data: Array<object>;
    readonly count: number;
    readonly currentPage: number;
    readonly nextPage: number;
    readonly prevPage: number;
    readonly lastPage: number;
}
