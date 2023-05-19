import {IToken} from "../models/IToken";
import {IRegister} from "../models/user/IRegister";
import {IAuthenticate} from "../models/user/IAuthenticate";
import {IUpdateUser, IUser} from "../models/user/IUser";
import {baseAPI} from "./BaseAPI";


export const userAPI = baseAPI.injectEndpoints({

    endpoints: (build) => ({

        registerUser: build.mutation<IToken, IRegister>({
            query: (user) => ({
                url: `/auth/register`,
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['User']
        }),
        authenticateUser: build.mutation<IToken, IAuthenticate>({
            query: (user) => ({
                url: `/auth/login`,
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['User']
        }),
        activatePassword: build.mutation<string, string>({
            query: (token) => ({
                url: `auth/activate/${token}`,
                method: 'GET',
            }),
            invalidatesTags: ['User']
        }),

        fetchUser: build.query<IUser, null>({
            query: () => ({
                url: `/users/myInfo`,
                method: 'GET'
            }),
            providesTags: result => ['User']
        }),
        changeInfo: build.mutation<IUser, IUpdateUser>({
            query: (user) => ({
                url: `/users/changeInfo`,
                method: 'PUT',
                body: user
            }),
            invalidatesTags: ['User']
        }),
        registerAdmin: build.mutation<string, IRegister>({
            query: (user) => ({
                url: `/users/addAdmin`,
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['User']
        }),
    })
})