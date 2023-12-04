
export interface Book {
    id: number;
    bookTitle: string;
    bookSummary: string;
    imageUrl: string;
    timeUpload: Uint8Array;
    timeUpdate: Uint8Array;
    isApproved: boolean;
    isCompleted: boolean;
    authorId: number;
    userId: string;
}
export interface BookCard {
    bookTitle: string;
    bookTitleNormalize: string;
    bookSummary: string;
    imageUrl: string;
    isCompleted: boolean;
    authorId: number;
    authorName: string;
}
export interface BookDetail {
    id: number;
    bookTitle: string;
    bookTitleNormalize: string;
    bookSummary: string;
    imageUrl: string;
    timeUpload: Uint8Array;
    timeUpdate: Uint8Array;
    isCompleted: boolean;
    authorId: number;
    authorName: string;
}
export interface ApiResponse<T>{
    message: string;
    data: T;
}