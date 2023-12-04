export interface UserComment{
    id: number;
    commentContent: string;
    timeComment: Uint8Array;
    userId: string;
    bookId: number;
}