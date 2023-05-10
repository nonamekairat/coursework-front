import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_URL} from "../util/Constants";
import {RootState} from "../store/store";
import {IOrder, IOrderChangeStatusRequest, IOrderRequest} from "../models/IOrder";


export const passwordAPI = createApi({
    reducerPath: "passwordAPI",
    baseQuery: fetchBaseQuery(
        {
            baseUrl: API_URL + "/api",
            prepareHeaders: (headers, {getState}) => {
                const token = (getState() as RootState).tokenReducer.accessToken;
                if (token) {
                    headers.set('Authorization', `Bearer ${token}`)
                }
                return headers
            },
        }),
    tagTypes: ['Password'],


    endpoints: (build) => ({

        confirmPassword: build.mutation<IOrder, string>({
            query: (token) => ({
                url: `auth/activate/${token}`,
                method: 'GET',
            }),
            invalidatesTags: ['Password']
        }),

    })
})