import {IReview, IReviewRequest} from "../models/ILaptop";
import {baseAPI} from "./BaseAPI";


export const reviewAPI = baseAPI.injectEndpoints({

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