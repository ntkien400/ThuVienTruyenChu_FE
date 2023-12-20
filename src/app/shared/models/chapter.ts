export interface Chapter{
    id: number;
    chapterNumber: number;
    chapterName: string;
    chapterContent: string;
    uploadTime: Uint8Array;
    updateTime: Uint8Array;
    bookId: number;
    userId: string;
}

export interface ViewChapter{
    id: number;
    chapterNumber: number;
    chapterName: string;
    chapterContent: string;
    uploadTime: string;
    updateTime: string;
    bookId: number;
    userName: string;
}