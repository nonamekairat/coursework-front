import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_URL} from "../util/Constants";
import {RootState} from "../store/store";
import {IFavorite, IFavoriteRequest} from "../models/ILaptop";


export const favoriteAPI = createApi({
    reducerPath: "favoriteAPI",
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
    tagTypes: ['Favorite'],

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