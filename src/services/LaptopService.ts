import {ICreateLaptop, ILaptop, IPageLaptop} from "../models/ILaptop";
import {IPageable} from "../models/IPageable";
import {baseAPI} from "./BaseAPI";


export const laptopAPI = baseAPI.injectEndpoints({

    endpoints: (build) => ({

        fetchAllLaptops: build.query<ILaptop[], null>({
            query: () => ({
                url: `/laptops`,
                method: 'GET'
            }),
            providesTags: result => ['Laptop']
        }),
        fetchAllLaptopsWithFilter: build.query<IPageLaptop,
            {brand: string, category: string, hardwareList: string[], pageable: IPageable}>({
            query: (args) => ({
                url: `/laptops/filter`,
                method: 'GET',
                params: args
            }),
            providesTags: result => ['Laptop']
        }),
        fetchAllLaptopsFilterByCategoryAndBrand: build.query<IPageLaptop,
            {brandName: string, category: string, pageable: IPageable}>({
            query: ({brandName, category, pageable}) => ({
                url: `/laptops/filter`,
                method: 'GET',
                params: {
                    brandName: brandName,
                    category: category,
                    page: pageable.page,
                    size: pageable.size,
                    sort: pageable.sort
                }

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
        fetchLaptopRecommendationsById: build.query<IPageLaptop, {id: number, pageable: IPageable}>({
            query: ({id, pageable}) => ({
                url: `/laptops/recommendations/${id}`,
                method: 'GET',
                params: pageable
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
            invalidatesTags: ['Laptop', 'Notification']
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
            invalidatesTags: ['Laptop', 'Notification']
        }),


    })
})