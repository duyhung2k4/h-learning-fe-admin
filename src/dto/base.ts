export type MetaData = {
    page: number
    pageSize: number
    total: number
}

export type QueryReturnType<T = unknown, E = unknown> = {
    data?: undefined;
    error: E;
    success: boolean
    metaData: MetaData;
} | {
    data: T;
    error?: undefined;
    success: boolean
    metaData: MetaData;
};