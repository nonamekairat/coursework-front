import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_URL} from "../util/Constants";
import {RootState} from "../store/store";
import {ICreateLaptop, ILaptop, IPageLaptop} from "../models/ILaptop";
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
        fetchAllBySearch: build.query<ILaptop[], string>({
            query: (query) => ({
                url: `/laptops/search`,
                method: 'GET',
                params: {
                    query: query
                }
            }),
        }),
        createLaptop: build.mutation<ILaptop, ICreateLaptop>({
            query: (laptop) => ({
                url: `/laptops/create`,
                method: 'POST',
                body: laptop
            }),
            invalidatesTags: ['Laptop']
        }),
        deleteLaptop: build.mutation<string, number>({
            query: (id) => ({
                url: `/laptops/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Laptop']
        }),
        updateLaptop: build.mutation<ILaptop, { laptop: ICreateLaptop, id: number }>({
            query: ({laptop, id}) => ({
                url: `/laptops/${id}`,
                method: 'PUT',
                body: laptop
            }),
            invalidatesTags: ['Laptop']
        }),


    })
})