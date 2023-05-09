import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_URL} from "../util/Constants";
import {RootState} from "../store/store";
import {IHardware, IHardwareRequest} from "../models/ILaptop";


export const hardwareAPI = createApi({
    reducerPath: "hardwareAPI",
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
    tagTypes: ['Hardware'],


    endpoints: (build) => ({

        fetchAllHardware: build.query<IHardware[], null>({
            query: () => ({
                url: `/hardware`,
                method: 'GET'
            }),
            providesTags: result => ['Hardware']
        }),
        addHardware: build.mutation<IHardware, IHardwareRequest>({
            query: (hardware) => ({
                url: `/hardware`,
                method: 'POST',
                body: hardware
            }),
            invalidatesTags: ['Hardware']
        }),
    })
})