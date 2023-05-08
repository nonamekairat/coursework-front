import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_URL} from "../util/Constants";
import {RootState} from "../store/store";
import {IFavorite, IFavoriteRequest, IReview, IReviewRequest} from "../models/ILaptop";


export const reviewAPI = createApi({
    reducerPath: "reviewAPI",
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
    tagTypes: ['Review'],

    endpoints: (build) => ({

        postReview: build.mutation<string, IReviewRequest>({
            query: (review) => ({
                url: `/reviews/add`,
                method: 'POST',
                body: review,
            }),
            invalidatesTags: ['Review']
        }),
        updateReview: build.mutation<string, {id: number, review: IReviewRequest}>({
            query: ({id, review}) => ({
                url: `/reviews/${id}`,
                method: 'PUT',
                body: review,
            }),
            invalidatesTags: ['Review']
        }),
        deleteReview: build.mutation<string, number>({
            query: (id) => ({
                url: `/reviews/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Review']
        }),
        fetchLaptopReviews: build.query<IReview[], number>({
            query: (id) => ({
                url: `/laptops/${id}/reviews`,
                method: 'GET'
            }),
            providesTags: result => ['Review']
        }),

    })
})