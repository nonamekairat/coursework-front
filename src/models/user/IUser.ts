export interface IUser extends IBaseUser{

    imageUrl: string;
    role: Role;
}

export enum Role {
    ROLE_USER = "ROLE_USER",
    ROLE_ADMIN = "ROLE_ADMIN"
}

export interface IBaseUser {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
}

export interface IUpdateUser extends IBaseUser {

}