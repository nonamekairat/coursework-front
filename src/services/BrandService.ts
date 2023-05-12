import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_URL} from "../util/Constants";
import {RootState} from "../store/store";
import {IBrand, IBrandRequest} from "../models/ILaptop";
import {baseApi} from "./BaseApi";


export const brandAPI = baseApi.injectEndpoints({

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