import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_URL} from "../util/Constants";
import {RootState} from "../store/store";
import {IOrder, IOrderRequest} from "../models/IOrder";
import {INotification} from "../models/INotification";


export const notificationAPI = createApi({
    reducerPath: "notificationAPI",
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
    tagTypes: ['Notification'],


    endpoints: (build) => ({

        fetchAllNotifications: build.query<INotification[], null>({
            query: () => ({
                url: `/notifications`,
                method: 'GET'
            }),
            providesTags: result => ['Notification']
        }),
        clearNotifications: build.mutation<INotification[], null>({
            query: () => ({
                url: `/notifications`,
                method: 'PUT',
            }),
            invalidatesTags: ['Notification']
        }),
        deleteNotifications: build.mutation<INotification[], null>({
            query: () => ({
                url: `/notifications`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Notification']
        }),
        markNotificationById: build.mutation<INotification, number>({
            query: (id: number) => ({
                url: `/notifications/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Notification']
        }),
        deleteNotificationById: build.mutation<INotification, number>({
            query: (id: number) => ({
                url: `/notifications/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Notification']
        }),
    })
})