export interface IUser {

    email: string;
    username: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    imageUrl: string;
    role: Role;
}

export enum Role {
    ROLE_USER = "ROLE_USER",
    ROLE_ADMIN = "ROLE_ADMIN"
}