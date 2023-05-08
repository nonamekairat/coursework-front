import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_URL} from "../util/Constants";
import {RootState} from "../store/store";
import {IBrand, IBrandRequest, ICreateLaptop, ILaptop, IPageLaptop, IReview} from "../models/ILaptop";
import {IPageable} from "../models/IPageable";


export const laptopAPI = createApi({
    reducerPath: "laptopAPI",
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
    tagTypes: ['Laptop'],

    endpoints: (build) => ({

        fetchAllLaptops: build.query<ILaptop[], null>({
            query: () => ({
                url: `/laptops`,
                method: 'GET'
            }),
            providesTags: result => ['Laptop']
        }),
        fetchLaptopById: build.query<ILaptop, number>({
            query: (id) => ({
                url: `/laptops/${id}`,
                method: 'GET'
            }),
            providesTags: result => ['Laptop']
        }),
        fetchAllPaginationLaptops: build.query<IPageLaptop, IPageable>({
            query: (pageable: IPageable) => ({
                url: `/laptops/byPages`,
                method: 'GET',
                params: pageable
            }),
            providesTags: result => ['Laptop']
        }),

        createLaptop: build.mutation<ILaptop, ICreateLaptop>({
            query: (brand) => ({
                url: `/laptops/create`,
                method: 'POST',
                body: brand
            }),
            invalidatesTags: ['Laptop']
        }),


    })
})