import {ILaptop} from "./ILaptop";
import {IUser} from "./user/IUser";

export interface IOrder {
    id: number;
    laptops: ILaptop[];
    deliveryType: string;
    paymentType: string;
    orderStatus: string;
    createdAt: Date;
    updatedAt: Date;
    user: IUser;
}

export interface IOrderRequest {
    laptops: number[];
    deliveryType: string;
    paymentType: string;
}

export interface IOrderChangeStatusRequest {
    params: IOrderStatusMessage;
    id: number;
}

export interface IOrderStatusMessage {
    message: string;
    orderStatus: string;
}
