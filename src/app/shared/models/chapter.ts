export interface Chapter{
    id: number;
    chapterNumber: number;
    chapterName: string;
    chapterContent: string;
    uploadedTimes: Date;
    updatedTime: Date;
    bookId: number;
    userId: string;
}

export interface ViewChapter{
    id: number;
    chapterNumber: number;
    chapterName: string;
    chapterContent: string;
    uploadedTimes: string;
    updatedTime: string;
    bookId: number;
    userName: string;
}