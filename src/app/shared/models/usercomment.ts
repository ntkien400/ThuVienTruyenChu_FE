import { ViewUser } from "./user";
import { ViewReply } from "./usercommentreply";

export interface UserComment{
    id: number;
    commentContent: string;
    commentedTime: Date;
    userId: string;
    bookId: number;
}

export interface ViewComment{
    commentContent: string;
    commentedTime: Date;
    user: ViewUser;
    bookId: number;
    replies: ViewReply[];
}