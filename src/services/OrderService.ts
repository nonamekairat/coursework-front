import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_URL} from "../util/Constants";
import {RootState} from "../store/store";
import {IOrder, IOrderRequest} from "../models/IOrder";


export const orderAPI = createApi({
    reducerPath: "orderAPI",
    baseQuery: fetchBaseQuery(
        {
            baseUrl: API_URL + "/api",
            prepareHeaders: (headers, {getState}) => {
                const token = (getState() as RootState).tokenReducer.accessToken;
                // const {token} = useAppSelector(state => state.tokenReducer)
                // If we have a token set in state, let's assume that we should be passing it.
                if (token) {
                    headers.set('Authorization', `Bearer ${token}`)
                }
                return headers
            },
        }),
    tagTypes: ['Order'],


    endpoints: (build) => ({

        fetchAllOrders: build.query<IOrder[], null>({
            query: () => ({
                url: `/orders`,
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
            invalidatesTags: ['Order']
        }),
        deleteOrder: build.mutation<string, number>({
            query: (id) => ({
                url: `/orders/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Order']
        }),
        cancelOrder: build.mutation<string, number>({
            query: (id) => ({
                url: `/orders/cancelOrder/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Order']
        }),
    })
})