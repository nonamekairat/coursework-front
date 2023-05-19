import {IOrder, IOrderChangeStatusRequest, IOrderRequest} from "../models/IOrder";
import {baseAPI} from "./BaseAPI";


export const orderAPI = baseAPI.injectEndpoints({

    endpoints: (build) => ({

        fetchAllOrders: build.query<IOrder[], null>({
            query: () => ({
                url: `/orders`,
                method: 'GET'
            }),
            providesTags: result => ['Order']
        }),
        fetchAllMyOrders: build.query<IOrder[], null>({
            query: () => ({
                url: `/orders/myOrders`,
                method: 'GET'
            }),
            providesTags: result => ['Order']
        }),
        makeOrder: build.mutation<IOrder, IOrderRequest>({
            query: (order) => ({
                url: `/orders`,
                method: 'POST',
                body: order
            }),
            invalidatesTags: ['Order', 'Notification']
        }),
        deleteOrder: build.mutation<string, number>({
            query: (id) => ({
                url: `/orders/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Order', 'Notification']
        }),
        cancelOrder: build.mutation<string, number>({
            query: (id) => ({
                url: `/orders/cancelOrder/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Order', 'Notification']
        }),
        changeStatus: build.mutation<string, IOrderChangeStatusRequest>({
            query: (request) => ({
                url: `/orders/changeStatus/${request.id}`,
                method: 'PUT',
                params: request.params
            }),
            invalidatesTags: ['Order', 'Notification']
        }),
    })
})