import {IOrder} from "../models/IOrder";
import {baseAPI} from "./BaseAPI";


export const passwordAPI = baseAPI.injectEndpoints({

    endpoints: (build) => ({

        confirmPassword: build.mutation<IOrder, string>({
            query: (token) => ({
                url: `auth/activate/${token}`,
                method: 'GET',
            }),
            invalidatesTags: ['Password']
        }),

    })
})