import {IBrand, IBrandRequest} from "../models/ILaptop";
import {baseAPI} from "./BaseAPI";


export const brandAPI = baseAPI.injectEndpoints({

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