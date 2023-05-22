import {IOrder} from "../models/IOrder";
import {baseAPI} from "./BaseAPI";
import {IResetPasswordWithToken} from "../models/IResetPassword";


export const passwordAPI = baseAPI.injectEndpoints({

    endpoints: (build) => ({

        confirmPassword: build.mutation<IOrder, string>({
            query: (token) => ({
                url: `auth/activate/${token}`,
                method: 'GET',
            }),
            invalidatesTags: ['Password']
        }),
        forgotPassword: build.query<string, string>({
            query: (email) => ({
                url: `password/forgot`,
                method: 'GET',
                params: {email: email}
            }),
            providesTags: (_) => ['Password']
        }),
        resetPassword: build.mutation<string, IResetPasswordWithToken>({
            query: (dto: IResetPasswordWithToken) => ({
                url: `password/reset/${dto.token}`,
                method: 'POST',
                body: dto.resetPasswordDto,
            }),
            invalidatesTags: ['Password']
        }),

    })
})