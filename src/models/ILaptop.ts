import {IUser} from "./user/IUser";

export interface ILaptop {
    id: number;
    name: string;
    description: string;
    price: number;
    amount: number;
    discount: number;
    brand: string;
    category: string;
    guarantee: number;
    imageUrl: string;
    averageScore: number;
    hardwareList: IHardware[];
}
export interface ICartLaptop{
    laptop: ILaptop,
    count: number,
}



export interface IPageLaptop {
    content: ILaptop[];
    totalElements: number;
    totalPages: number;
}


export interface ICreateLaptop {
    name: string;
    description: string;
    price: number;
    amount: number;
    discount: number;
    brandId: number;
    category: string;
    guarantee: number;
    hardwareIds: number[];
}

export interface IBrand {
    id: number;
    name: string;
}

export interface IBrandRequest {
    name: string;
}

export interface IHardware {
    id: number;
    name: string;
    hardwareType: string;
}

export interface IHardwareRequest {
    name: string;
    hardwareType: string;
}

export interface IFavorite {
    id: number;
    laptop: ILaptop;
}
export interface IFavoriteRequest {
    laptopId: number;
}

export interface IReview {
    id: number;
    text: string;
    score: number;
    updatedAt: Date;
    userDto: IUser;
}

export interface IReviewRequest {
    text: string;
    score: number;
    laptopId: number;
}
