
export interface Book {
    id: number;
    bookTitle: string;
    bookSummary: string;
    imageUrl: string;
    uploadedTime: Date;
    updatedTime: Date;
    isApproved: boolean;
    isCompleted: boolean;
    numberOfChapters: number;
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
    uploadedTime: Date;
    updatedTime: Date;
    isCompleted: boolean;
    numberOfChapters: number;
    authorId: number;
    authorName: string;
}