import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_URL} from "../util/Constants";
import {RootState} from "../store/store";


export const imageAPI = createApi({
    reducerPath: "imageAPI",
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

    endpoints: (build) => ({

        saveLaptopImage: build.mutation<string, any>({
            query: (laptopImage: any) => ({
                url: `/image/upload/laptop/${laptopImage.id}`,
                method: 'POST',
                body: laptopImage.data,
            }),
        }),
        saveMyAvatar: build.mutation<string, any>({
            query: (laptopImage: any) => ({
                url: `/image/upload/myAvatar`,
                method: 'POST',
                body: laptopImage.data,
            }),
        }),
    })
})