export interface PaginationQuery {
    pageSize: number;
    pageIndex: number;
}

export interface IPageInfo {
    totalItemCount: number;
    pageCount: number;
    pageSize: number;
    pageIndex: number;
}

export interface IPaginatedResponse<T> {
    items: T[];
    pageInfo: IPageInfo;
}
