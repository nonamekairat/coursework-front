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

enum Role {
    ROLE_USER,
    ROLE_ADMIN
}