export interface User{
    id: string;
    userName: string;
    hashPassword: string;
    saltPassword: string;
    fullName: string;
    email: string;
    isTokenValid: boolean;
    userLevelId: number;
}

export interface ViewUser{
    userName: string;
    fullName: string;
    email: string;
    userLevelId: number;
}