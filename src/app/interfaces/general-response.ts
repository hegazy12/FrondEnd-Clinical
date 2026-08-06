export interface GeneralResponse<T> {
    success: boolean;
    data: T;
    message: string;
    errors: Record<string, string[]> | Record<string, any> | null;
}
