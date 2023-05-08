import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_URL} from "../util/Constants";
import {RootState} from "../store/store";
import {IBrand, IBrandRequest} from "../models/ILaptop";


export const brandAPI = createApi({
    reducerPath: "brandAPI",
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
    tagTypes: ['Brand'],

    endpoints: (build) => ({

        fetchBrands: build.query<IBrand[], null>({
            query: () => ({
                url: `/brands`,
                method: 'GET'
            }),
            providesTags: result => ['Brand']
        }),
        fetchBrandById: build.query<IBrand, number>({
            query: (id) => ({
                url: `/brands/${id}`,
                method: 'GET'
            }),
            providesTags: result => ['Brand']
        }),
        addBrand: build.mutation<IBrand, IBrandRequest>({
            query: (brand) => ({
                url: `/brands/create`,
                method: 'POST',
                body: brand
            }),
            invalidatesTags: ['Brand']
        }),
    })
})