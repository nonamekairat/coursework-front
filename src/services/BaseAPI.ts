import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_URL} from "../util/Constants";
import {RootState} from "../store/store";


export const baseAPI = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}/api`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).tokenReducer.accessToken
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["Brand", 'Laptop', 'User', 'Review', 'Password', 'Order', 'Notification', 'Hardware', 'Favorite'],
    endpoints: () => ({}), //todo: later inject all endpoints
});