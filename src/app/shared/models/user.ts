export interface User{
    id: string;
    userName: string;
    hashPassword: string;
    saltPassword: string;
    fullName: string;
    email: string;
    userLevelId: number;
}

export interface ViewUser{
    userName: string;
    fullName: string;
    email: string;
    userLevelName: string;
}