import { ViewUser } from "./user";

export interface UserCommentReply{
    id: number;
    replyContent: string;
    repliedTime: Date;
    userId: string;
    userCommentId: number;
}

export interface ViewReply{
    id: number;
    replyContent: string;
    repliedTime: Date;
    user: ViewUser;
    userCommentId: number;
}