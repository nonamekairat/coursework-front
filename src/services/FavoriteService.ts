import {IFavorite, IFavoriteRequest} from "../models/ILaptop";
import {baseAPI} from "./BaseAPI";


export const favoriteAPI = baseAPI.injectEndpoints({

    endpoints: (build) => ({

        fetchFavorites: build.query<IFavorite[], null>({
            query: () => ({
                url: `/favorites`,
                method: 'GET'
            }),
            providesTags: result => ['Favorite']
        }),
        // fetchBrandById: build.query<IBrand, number>({
        //     query: (id) => ({
        //         url: `/brands/${id}`,
        //         method: 'GET'
        //     }),
        //     providesTags: result => ['Favorite']
        // }),
        addFavorite: build.mutation<IFavorite, IFavoriteRequest>({
            query: (favorite) => ({
                url: `/favorites`,
                method: 'POST',
                body: favorite
            }),
            invalidatesTags: ['Favorite']
        }),
        deleteFavorite: build.mutation<IFavorite, number>({
            query: (id) => ({
                url: `/favorites/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Favorite']
        }),
    })
})