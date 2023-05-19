import {INotification} from "../models/INotification";
import {baseAPI} from "./BaseAPI";


export const notificationAPI = baseAPI.injectEndpoints({

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